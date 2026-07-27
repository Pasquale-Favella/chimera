import { LRUCache } from "lru-cache";

import {
	APICallError,
	type LanguageModelUsage,
	NoObjectGeneratedError,
	NoOutputGeneratedError,
	RetryError,
} from "ai";
import { Cause, Data, Effect, pipe, Schedule, TSemaphore } from "effect";
import type { DurationInput } from "effect/Duration";
import type { LlmProvider } from "../../../../generated/prisma/client";

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_BASE_DELAY = "400 millis";
const DEFAULT_RATE_LIMIT_PER_SCOPE = 2;

const rateLimitSemaphores = new LRUCache<
	string,
	ReturnType<typeof TSemaphore.unsafeMake>
>({
	max: 10_000,
	ttl: 30 * 60 * 1_000,
	updateAgeOnGet: true,
});

export class AiTransientError extends Data.TaggedError("AiTransientError")<{
	readonly operation: string;
	readonly provider: LlmProvider;
	readonly model: string;
	readonly message: string;
	readonly cause?: unknown;
	readonly statusCode?: number;
}> {}

export class AiNonRetryableError extends Data.TaggedError(
	"AiNonRetryableError",
)<{
	readonly operation: string;
	readonly provider: LlmProvider;
	readonly model: string;
	readonly message: string;
	readonly cause?: unknown;
	readonly statusCode?: number;
}> {}

export type AiReliabilityError = AiTransientError | AiNonRetryableError;

export type AiReliabilityContext = {
	readonly operation: string;
	readonly provider: LlmProvider;
	readonly model: string;
	readonly scopeKey: string;
	readonly timeout: DurationInput;
	readonly maxRetries?: number;
};

export type AiOperationResult<A> = {
	readonly result: A;
	readonly usage?: LanguageModelUsage;
};

export function getAiRateLimitSemaphore(scopeKey: string) {
	const existing = rateLimitSemaphores.get(scopeKey);
	if (existing) {
		return existing;
	}

	const semaphore = TSemaphore.unsafeMake(DEFAULT_RATE_LIMIT_PER_SCOPE);
	rateLimitSemaphores.set(scopeKey, semaphore);
	return semaphore;
}

export function classifyAiError(
	error: unknown,
	context: Omit<AiReliabilityContext, "scopeKey" | "timeout" | "maxRetries">,
): AiReliabilityError {
	if (
		error instanceof AiTransientError ||
		error instanceof AiNonRetryableError
	) {
		return error;
	}

	if (Cause.isTimeoutException(error)) {
		return new AiTransientError({
			...context,
			message: `AI request timed out for ${context.operation}.`,
			cause: error,
		});
	}

	if (RetryError.isInstance(error)) {
		return classifyAiError(error.lastError, context);
	}

	if (APICallError.isInstance(error)) {
		const retryableStatusCodes = new Set([
			408, 409, 425, 429, 500, 502, 503, 504,
		]);
		const isRetryable =
			error.isRetryable ||
			(error.statusCode !== undefined &&
				retryableStatusCodes.has(error.statusCode));

		if (isRetryable) {
			return new AiTransientError({
				...context,
				message: error.message,
				cause: error,
				statusCode: error.statusCode,
			});
		}

		return new AiNonRetryableError({
			...context,
			message: error.message,
			cause: error,
			statusCode: error.statusCode,
		});
	}

	if (
		NoObjectGeneratedError.isInstance(error) ||
		NoOutputGeneratedError.isInstance(error)
	) {
		return new AiNonRetryableError({
			...context,
			message: error.message,
			cause: error,
		});
	}

	if (error instanceof TypeError) {
		return new AiTransientError({
			...context,
			message: error.message,
			cause: error,
		});
	}

	if (error instanceof Error) {
		return new AiNonRetryableError({
			...context,
			message: error.message,
			cause: error,
		});
	}

	return new AiNonRetryableError({
		...context,
		message: "Unknown AI service failure.",
		cause: error,
	});
}

function createRetrySchedule(maxRetries: number) {
	return pipe(
		Schedule.exponential(DEFAULT_RETRY_BASE_DELAY),
		Schedule.jittered,
		Schedule.intersect(Schedule.recurs(maxRetries)),
		Schedule.whileInput(
			(error: AiReliabilityError) => error._tag === "AiTransientError",
		),
	);
}

export function executeAiOperation<A>(
	context: AiReliabilityContext,
	run: () => Promise<AiOperationResult<A>>,
) {
	const semaphore = getAiRateLimitSemaphore(context.scopeKey);
	const retrySchedule = createRetrySchedule(
		context.maxRetries ?? DEFAULT_MAX_RETRIES,
	);
	const classifyContext = {
		operation: context.operation,
		provider: context.provider,
		model: context.model,
	};

	const attempt = pipe(
		Effect.tryPromise({
			try: run,
			catch: (error) => classifyAiError(error, classifyContext),
		}),
		Effect.timeout(context.timeout),
		Effect.mapError((error) => classifyAiError(error, classifyContext)),
		(effect) => TSemaphore.withPermit(effect, semaphore),
	);

	return pipe(attempt, Effect.retry(retrySchedule));
}
