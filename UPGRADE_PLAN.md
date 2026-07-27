# Chimera Competitive Upgrade Plan

## Execution model: waves, tracks, and the standard QA loop

**Waves = sequential gates. Tracks within a wave = run in parallel.** Full graph tracked in SQL (`todos` + `todo_deps` + `track_waves`) in the working session; this file is the human-readable mirror.

| Wave | Tracks running in parallel | Gate to next wave |
|---|---|---|
| 1 | A-hygiene (bug fixes, sanitization, safe/misc deps), D-mcp (mutation tools), E-editing-ux (dnd-kit audit only) | All wave-1 items pass their QA loop |
| 2 | B-ai-core (ai SDK v7, zod v4, prisma v7 — parallel to each other), C-mastra (install + scaffold shells only, no live AI wiring) | AI SDK + zod major bumps merged and green |
| 3 | B-ai-core sequential: ai-reliability → structured-ui-schema (inherently linear); C-mastra (`mastra-integration-live`) runs parallel to `structured-ui-schema` once `ai-reliability` merges, since it only needs the reliability layer | structured-ui-schema + mastra-integration-live merged and pass full regression |
| 4 | E-editing-ux (props panel), C-mastra (patch-based refinement, now depends on mastra-integration-live) — both only need the schema/live-Mastra layer, independent of each other | all green |
| 5 | deps-next-major (Next 15→16, done last since it touches everything) | — |
| 6 | G-effect-rpc: full tRPC → @effect/rpc migration + full Jotai → @effect-atom/atom-react migration (foundation → auth layer → per-router ports in parallel → client migration → Jotai migration → cutover). Deliberately the very last core-transport wave — bigger blast radius than the Next.js major bump, so it only starts once everything else is stable | full regression + streaming verified + canvas interaction regression verified |
| 7 | F-collab: real-time collaboration + branching versioning (`collab-versioning-v2`), rebuilt natively on the Wave 6 stack. Deliberately deferred until after Wave 6 so its sync layer is built once — on `Rpc.StreamRequest` + Effect Atom — instead of twice (first on tRPC/Jotai, then migrated) | full regression + multi-user concurrent-edit test |

**Standard per-task QA loop (applied to every todo, not just described once):**
1. **Implement** — either do it directly, or delegate mechanical/boilerplate work to `opencode run "<prompt>"` so architecture-level work stays with the primary agent in the same wave.
2. **Control/revision pass** — launch a `code-review` (or `security-review` for the sanitization task, `rubber-duck` for the structured-schema and collab tasks given their size) sub-agent against the diff. This is a second independent model pass, not self-review.
3. **Test** — run the smallest targeted command that covers the change (typecheck/build/lint, or a scoped smoke test); for `structured-ui-schema` and `collab-versioning-v2` this means a fuller regression pass since they're cross-cutting.
4. **Loop** — if review flags issues or tests fail, revise and repeat steps 2–3. Bounded to 3 iterations; if still failing, stop and escalate to the user rather than looping indefinitely.
5. Mark the todo `done`, unblocking dependents.

**Delegation policy:** `opencode run "<prompt>"` is used for simple, mechanical, low-ambiguity subtasks (dependency bumps, dead-code removal, boilerplate scaffolding) so they can run as background workers while architecturally sensitive tasks (structured schema, AI reliability, collab) are done directly, with sub-agents doing the review/test pass rather than the implementation.

## Git Flow model

`develop` (pushed to `origin/develop`) is the long-lived integration branch for this whole upgrade initiative and the **only** branch ever pushed to `origin`. `main` is never merged into, pushed to, or force-pushed — under any circumstances, for any wave, ever.

- **Feature branch per todo**: `feature/<todo-id>` (e.g. `feature/fix-openrouter-bug`), always branched from `develop`, worked in its own `git worktree` to avoid ever mixing in unrelated working-directory state.
- **Per-task flow** (extends the standard QA loop with git steps):
  1. `git worktree add ../chimera-wt-<name> -b feature/<todo-id> develop`
  2. Implement (self or `opencode run`)
  3. Control/revision sub-agent pass on the diff
  4. Test
  5. Loop (revise → re-review → re-test) until green, bounded to 3 iterations
  6. `git merge --no-ff feature/<todo-id>` into `develop` (merge commit kept for traceability), delete the feature branch and worktree
- **Wave = parallel feature branches, all merged into `develop` before the wave is considered closed.**
- **Release per wave**: once a wave's branches are all merged to `develop` and green, run the wave-level regression pass directly on `develop`, then tag `develop` itself (`v0.1.0` … `v1.0.0`). **`main` is never touched — no merges, no pushes, ever.** `develop` is the only branch pushed to `origin`.
- No hotfix branches off `main` — `main` is permanently out of scope for this initiative.

| Wave | Tag (on `develop`) |
|---|---|
| 1 | v0.1.0 |
| 2 | v0.2.0 |
| 3 | v0.3.0 |
| 4 | v0.4.0 |
| 5 | v1.0.0 |
| 6 | v2.0.0 (major, breaking internal transport change) |

## Checklist

Each task's sub-boxes are: Branch → Implement → Review → Test → Merged.

### Wave 1 — fully parallel, no dependencies ✅ ALL MERGED TO `develop`
- [x] **A-hygiene: Fix OpenRouterProvider apiKey bug** (`fix-openrouter-bug`)
  - [x] Investigated — confirmed **false positive** (tool-output redaction of the Bearer-token string made correct code look broken). No code change needed.
- [x] **A-hygiene: Remove dead code** (`remove-dead-code`)
  - [x] Branch, opencode-delegated implementation (removed dead `modifySingleDesign`, unused `designSystem` destructure)
  - [x] code-review pass
  - [x] typecheck green
  - [x] Merged to `develop` (`feature/remove-dead-code-v2`)
- [x] **A-hygiene: Add HTML sanitization** (`add-html-sanitization`)
  - [x] Branch, implemented `sanitizeGeneratedHtml()` (isomorphic-dompurify), wired into all 5 `ai.service.ts` HTML return points
  - [x] security-review pass — found and fixed a second gap: `design.router.ts`/`component.router.ts` accepted raw client HTML with zero sanitization at the persistence boundary; fixed
  - [x] tested with malicious payload sample (script/onerror/javascript:/iframe stripped, form preserved)
  - [x] Merged to `develop`
- [x] **A-hygiene: Upgrade safe minor/patch deps** (`deps-safe-minor`)
  - [x] Branch, opencode-delegated bump (Radix UI, tRPC, react-query, react/react-dom, xyflow, tailwindcss, better-auth, date-fns, jotai, superjson, tailwind-merge, react-hook-form, hookform-resolvers) — all bumps confirmed to stay within existing major versions
  - [x] code-review pass — no issues
  - [x] `npm install` + `tsc --noEmit` green
  - [x] Merged to `develop`
- [x] **A-hygiene: Upgrade misc major deps** (`deps-misc-major`)
  - [x] Branch, opencode-delegated bump (lucide-react 0→1, recharts 2→3, react-day-picker 9→10, uuid 13→14, react-resizable-panels 3→4) + fixed renamed APIs (chart.tsx, calendar.tsx, resizable.tsx)
  - [x] code-review pass — found and fixed a real regression: v4's `react-resizable-panels` dropped the `data-panel-group-direction` attribute the UI relied on for vertical-orientation styling; replaced with the correct `aria-orientation` selector
  - [x] `tsc --noEmit` green
  - [x] Merged to `develop`
- [x] **D-mcp: Add MCP mutation tools** (`mcp-mutation-tools`)
  - [x] Branch, implemented `chimera_generate_design` / `chimera_modify_design` / `chimera_create_flow` MCP tools + matching `McpService` methods, mirroring the tRPC `aiGenerate`/`aiModify`/`aiGenerateFlow` mutations with MCP-userId-based authorization (`assertMcpProjectAccess`) and sanitization
  - [x] code-review pass — found and fixed one divergence (`count` max should be 4, matching the tRPC schema, not 5)
  - [x] integration smoke test (authorization enforced before any AI call/DB write, verified against a real dev DB)
  - [x] Merged to `develop`
- [x] **E-editing-ux: Audit unused dnd-kit** (`dnd-kit-audit`)
  - [x] explore agent confirmed zero usage of `@dnd-kit/*` anywhere in `src/`
  - [x] Decision: remove (unused, no near-term plan requires it before Wave 4's props panel)
  - [x] `npm uninstall` the 4 packages, typecheck green
  - [x] Merged to `develop`

**Wave 1 release gate:**
- [x] Wave-level regression pass on `develop`
- [x] Tag `develop` as `v0.1.0` (no merge/push to `main`)
- [x] Tag `v0.1.0` pushed to `origin`

### Wave 2 — parallel, gated on Wave 1 completing ✅ ALL MERGED TO `develop`
- [x] **B-ai-core: Upgrade AI SDK to v7** (`deps-ai-sdk-major`)
  - [x] Branch, bumped `ai` 6→7 + `@ai-sdk/google` 3→4
  - [x] code-review sub-agent breaking-change scan
  - [x] full `ai.service.ts` test pass
  - [x] Merged to `develop`
- [x] **B-ai-core: Upgrade zod 3→4** (`deps-zod-major`)
  - [x] Branch, bumped zod, fixed breakages
  - [x] code-review sub-agent pass
  - [x] zod schema unit checks pass
  - [x] Merged to `develop`
- [x] **B-ai-core: Upgrade Prisma 6→7** (`deps-prisma-major`)
  - [x] Branch, bumped Prisma, reviewed migration guide for SQLite
  - [x] code-review sub-agent pass
  - [x] `db:push` + query smoke test
  - [x] Merged to `develop`
- [x] **C-mastra: Install + scaffold Mastra workflow shells** (`mastra-scaffold-wiring`)
  - [x] Branch, installed `mastra`, scaffolded design-quality / memory / product-flow workflow shells, wired config and project structure only
  - [x] code-review sub-agent pass
  - [x] verified scaffold compiles and workflows are registered
  - [x] Merged to `develop`

**Wave 2 release gate:**
- [x] Wave-level regression pass on `develop`
- [x] Tag `develop` as `v0.2.0` (no merge/push to `main`)
- [x] Tag `v0.2.0` pushed to `origin`

### Wave 3 — mostly sequential, one parallel branch ✅ ALL MERGED TO `develop`
- [x] **B-ai-core: AI reliability layer** (`ai-reliability`) — depends on AI SDK v7
  - [x] Branch `feature/ai-reliability` off `develop`
  - [x] Implement retry/backoff/timeout, rate limiting, `AiUsageLog`, `streamObject` conversion — **built on the `effect` core library** (`Effect.retry` + `Schedule` for backoff, `Effect.timeout`, `Effect.Stream` for the streaming conversion)
  - [x] code-review sub-agent pass
  - [x] load + failure-injection test
  - [x] Merged to `develop`
- ~~[x] **B-ai-core: Structured UI schema** (`structured-ui-schema`) — depends on zod v4 + ai-reliability~~ **ROLLED BACK — see Wave 8**
  - ~~[x] Branch `feature/structured-ui-schema` off `develop` (separate worktree)~~
  - ~~[x] Implement recursive `UINode` Zod schema (`ui-node.schema.ts`), `Design.schema` column (Prisma `Json?`), tree→HTML renderer (`render-ui-node.ts` — maps layout/style tokens to Tailwind classes), patch-based modification (`patch-ui-node.ts` — update/insertChild/removeChild patches), structured generation with HTML fallback in `ai.service.ts`~~
  - ~~[x] code-review sub-agent pass — found and fixed SQLite incompatibility (`JSONB` → `TEXT` in migration)~~
  - ~~[x] `tsc --noEmit` green~~
  - ~~[x] Merged to `develop` (commit `5ece5a8`)
- [x] **C-mastra: Wire Mastra workflows into live AI calls** (`mastra-integration-live`) — depends on `ai-reliability` (and the already-satisfied `deps-ai-sdk-major`/`mastra-scaffold-wiring`); ran **in parallel with `structured-ui-schema`** once `ai-reliability` merged
  - [x] Branch `feature/mastra-integration-live` off `develop` (separate worktree)
  - [x] Wired `design-quality.workflow.ts`: AI critique via `runStructuredAiCall` + AI auto-fix step with graceful fallback; `memory.workflow.ts`: AI signal analysis + AI style directive synthesis; `product-flow.workflow.ts`: AI screen planning + AI connection mapping + AI enrichment with fallback to deterministic defaults
  - [x] Exported `runStructuredAiCall`/`logAiUsage` from `ai.service.ts` for workflow reuse; migrated `generateObject` → `generateText` + `Output.object()` (AI SDK v7); added `critiqueDesignQuality`, `synthesizeProjectStyleMemory`, `planProductFlow` functions
  - [x] code-review sub-agent pass
  - [x] `tsc --noEmit` green
  - [x] Merged to `develop` (commit `b347fa0`)

**Wave 3 release gate:**
- [x] Wave-level regression pass on `develop` (typecheck + build)
- [x] Tag `develop` as `v0.3.0` (no merge/push to `main`)
- [x] Push tag to `origin`

### Wave 4 — parallel, gated on mastra-integration-live (structured-ui-schema removed from active code — see Wave 8)
- [ ] **C-mastra: Patch-based auto-fix refinement** (`mastra-integration-refine`) — depends on `mastra-integration-live`
  - [ ] Branch, implement tree-node patch auto-fix, review, regression test, merge
- [ ] **E-editing-ux: Visual props panel** (`editing-ux-props-panel`)
  - [ ] Branch, implement props panel bound to UI schema, review, UI interaction test, merge

**Wave 4 release gate:**
- [ ] Wave-level regression pass on `develop`
- [ ] Tag `develop` as `v0.4.0` (no merge/push to `main`)
- [ ] Push tag to `origin`

### Wave 5 — after everything else is stable
- [ ] **A-hygiene: Upgrade Next.js 15→16** (`deps-next-major`)
  - [ ] Branch, bump Next major, code-review, full e2e smoke test (canvas, auth, tRPC, MCP routes), merge

**Wave 5 release gate:**
- [ ] Full regression pass on `develop`
- [ ] Tag `develop` as `v1.0.0` (no merge/push to `main`)
- [ ] Push tag to `origin`

### Wave 6 — full tRPC → @effect/rpc migration + Jotai → Effect Atom (mostly sequential)
Deliberately the last *core-transport* wave (Wave 7, real-time collaboration, follows it). Full replacement of tRPC (`@trpc/client`/`@trpc/server`/`@trpc/react-query`) with `effect` + `@effect/rpc` across the entire app, **and** full replacement of Jotai with `@effect-atom/atom-react` across the entire app — bigger blast radius than the Next.js major bump (Wave 5), since it touches every router, every client call site, every local UI-state atom, and the auth middleware, not just the framework version. Only starts once Waves 1–5 are stable so this migration isn't fighting a moving target.

**Why @effect/rpc**: gives first-class streaming RPC endpoints (`Rpc.StreamRequest`) that tRPC lacks, so AI design generation can stream partial HTML/tokens into the canvas incrementally instead of blocking on a single `generateText` round-trip — a meaningful UX differentiator against Stitch/OpenDesign's non-streaming generation. It also unifies error handling (tagged Effect errors replacing ad hoc `TRPCError`s) and composes cleanly with the `Effect`-native reliability/streaming layer built in Wave 3's `ai-reliability` task, so this wave is primarily a *transport* swap around already-Effectful business logic rather than a rewrite of both at once. This streaming foundation is also why real-time collaboration (Wave 7) was pulled out of Wave 4 and deferred until after this wave: presence/live-cursor sync is itself a streaming problem, so it is built once directly on `Rpc.StreamRequest` instead of once on a tRPC/websocket shim now and again on Effect RPC later.

**Why @effect-atom/atom-react (full Jotai replacement, by decision)**: purpose-built by the Effect core team for exactly this shape of problem — atoms whose lifecycle is wired directly to Effect computations/RPC calls (auto fetch-on-mount, cancellation, retry, SSR/hydration), which a hand-rolled React-Query-compatible wrapper around `@effect/rpc` would have to reinvent. Once the client is committed to Effect Atom for RPC-bound state, keeping Jotai around for local UI state (canvas node/selection/viewport atoms in `src/features/project-canvas/stores`) would mean maintaining two atom-shaped state libraries side by side for no architectural benefit — Effect Atom's local (non-RPC) atoms are a drop-in equivalent to Jotai's `atom`/`atomFamily`. Full replacement keeps one consistent state model app-wide instead of a split-brain Jotai/Effect Atom boundary. It's also why Wave 7's collaboration state (presence, version-branch history) is modeled as Effect Atom atoms from day one rather than Jotai atoms that would need re-migrating right after this wave finishes.

**Zod vs. Effect Schema (important constraint)**: `@effect/rpc` requires Effect `Schema` for its request/response contracts — it cannot consume Zod schemas directly, because Effect `Schema` is bidirectional (encode *and* decode) while Zod is decode-only, and `@effect/rpc`'s serialization/streaming machinery depends on that bidirectionality. There is no drop-in Zod adapter, so every existing Zod input schema in `src/server/api/routers/**` must be **manually converted** to an equivalent Effect `Schema` definition as part of the router it belongs to (not deferred to the client-migration step). To keep this from being reinvented per-router:
  - [ ] Foundation establishes a shared `src/server/effect/schema/` module with Effect `Schema` equivalents for common cross-router primitives (IDs, pagination, enums like project/component visibility, the `count` 1–4 constraint used by design generation, etc.) so router-port tasks reuse these instead of redefining them independently
  - [ ] Each router-port task converts only that router's own request/response Zod schemas to Effect `Schema`, reusing the shared primitives module
  - [ ] Zod itself is **not removed** from the project by this wave — it stays for any non-RPC validation (e.g. env var validation via `@t3-oss/env-nextjs`, form validation via `react-hook-form`/`hookform-resolvers` on the client) where Effect Schema has no established replacement in this codebase; only RPC-boundary schemas move to Effect Schema

- [ ] **G-effect-rpc: Foundation** (`effect-rpc-foundation`) — sequential, blocks the rest of this wave
  - [ ] Branch `feature/effect-rpc-foundation` off `develop`
  - [ ] Install `effect`, `@effect/rpc`, `@effect/platform` (+ Next.js-appropriate platform adapter); scaffold an `RpcRouter` and a single `app/api/rpc/route.ts` handler analogous to today's `app/api/trpc/[trpc]/route.ts`
  - [ ] Build the shared `src/server/effect/schema/` primitives module (Zod→Effect Schema conversions for cross-router primitives, see above) so downstream router ports have a common, consistent base to build on
  - [ ] code-review sub-agent pass
  - [ ] smoke test: one trivial round-trip RPC call end-to-end, verifying Effect Schema decode/encode against the same payload shapes the old Zod schemas accepted
  - [ ] Merged to `develop`
- [ ] **G-effect-rpc: Auth layer** (`effect-rpc-auth-layer`) — sequential, depends on foundation
  - [ ] Branch, port Better Auth session resolution into an Effect `Layer`/`Context.Tag` providing `CurrentUser` (replacing `protectedProcedure`); model `Unauthorized`/`Forbidden` as tagged Effect errors (replacing `TRPCError`)
  - [ ] code-review sub-agent pass
  - [ ] auth-rejection + happy-path test
  - [ ] Merged to `develop`
- [ ] **G-effect-rpc: Router ports** — parallel, all depend only on the auth layer, independent of each other
  - [ ] `effect-rpc-projects` (opencode-delegated: projects + permissions router; convert its Zod input schemas to Effect Schema using the shared primitives module)
  - [ ] `effect-rpc-designs` (self: designs router — the largest port, converts `aiGenerate`/`aiModify`/`aiGenerateFlow` to `Rpc.StreamRequest`-based streaming; convert its Zod input schemas, including the `count` 1–4 constraint, to Effect Schema)
  - [ ] `effect-rpc-components` (opencode-delegated: components router; convert its Zod input schemas to Effect Schema)
  - [ ] `effect-rpc-settings-misc` (opencode-delegated: user settings, LLM API keys, API key management; convert its Zod input schemas to Effect Schema)
  - [ ] Each: branch, implement, convert that router's Zod schemas to Effect Schema, code-review pass, run both old tRPC route and new Effect RPC route side-by-side and diff outputs (including schema validation edge cases — required/optional fields, enums, refinements) before removing the old path, merge to `develop`
- [ ] **G-effect-rpc: Client migration** (`effect-rpc-client-migration`) — sequential, depends on all router ports; highest blast radius on the RPC side (touches every component)
  - [ ] Branch, replace every `api.<router>.<procedure>.useQuery/useMutation` call site across `src/features/**` and `src/app/**` with `@effect-atom/atom-react` atoms wired to the new `@effect/rpc` client (`useAtomValue`/`useAtomSet`/`useAtomSuspense`), including dedicated streaming atoms for `aiGenerate`/`aiModify`/`aiGenerateFlow` that consume `Rpc.StreamRequest` for incremental canvas updates
  - [ ] rubber-duck + code-review sub-agent pass (large diff, high risk of missed call sites)
  - [ ] full UI regression pass across every feature area
  - [ ] Merged to `develop`
- [ ] **G-effect-rpc: Jotai → Effect Atom migration** (`effect-atom-jotai-migration`) — sequential, depends on client migration; full app-wide state-library replacement
  - [ ] Branch `feature/effect-atom-jotai-migration` off `develop`
  - [ ] Port every Jotai `atom`/`atomFamily` in `src/features/*/stores` (project-canvas node/selection/viewport state, and any other feature stores) to `@effect-atom/atom-react` local atoms; update all consuming custom hooks to the Effect Atom API
  - [ ] rubber-duck + code-review sub-agent pass (behavioral risk: canvas drag/select/undo-redo must be pixel-identical to pre-migration behavior)
  - [ ] full canvas interaction regression test (drag, multi-select, undo/redo, viewport zoom/pan)
  - [ ] Merged to `develop`
- [ ] **G-effect-rpc: Cutover + cleanup** (`effect-rpc-cutover-cleanup`) — final task of the whole plan
  - [ ] Branch, remove `@trpc/client`/`@trpc/server`/`@trpc/react-query` and `jotai`, delete `src/server/api/trpc.ts` + old routers + `app/api/trpc/[trpc]/route.ts` + any remaining Jotai store scaffolding
  - [ ] code-review sub-agent pass
  - [ ] full regression + explicit verification that AI generation now streams incrementally into the canvas, and that all local UI state behaves identically post-Jotai
  - [ ] Merged to `develop`

**Wave 6 release gate:**
- [ ] Full regression pass on `develop`
- [ ] Tag `develop` as `v2.0.0` (major — breaking internal transport change; no merge/push to `main`)
- [ ] Push tag to `origin`

### Wave 7 — real-time collaboration + branching versioning, built natively on the Wave 6 stack
Deliberately deferred until after Wave 6 completes (`effect-rpc-cutover-cleanup` done). The original Wave 4 plan would have built collaboration on tRPC + Jotai, only for it to need re-migrating in Wave 6 — building it once, directly on the final `@effect/rpc` + `@effect-atom/atom-react` stack, avoids doing this sync-layer work twice.

- [ ] **F-collab: Real-time collaboration + branching versioning (Effect-native rebuild)** (`collab-versioning-v2`) — sequential, depends on `effect-rpc-cutover-cleanup`
  - [ ] Branch `feature/collab-versioning-v2` off `develop`
  - [ ] Implement presence + live cursors as `Rpc.StreamRequest` endpoints from the start — no bolted-on websocket/SSE layer to migrate later
  - [ ] Model version-branch history (replacing the flat history array with version nodes: branching, diff view) and live presence state as `@effect-atom/atom-react` atoms, not Jotai
  - [ ] Reuse the shared `src/server/effect/schema/` primitives module from Wave 6's foundation task for any new request/response schemas rather than introducing fresh Zod schemas that would need later conversion
  - [ ] code-review + rubber-duck sub-agent pass (concurrency correctness is high-risk)
  - [ ] multi-user concurrent-edit test over the live `Rpc.StreamRequest` presence channel
  - [ ] Merged to `develop`

**Wave 7 release gate:**
- [ ] Full regression pass on `develop`
- [ ] Multi-user concurrent-edit test pass
- [ ] Tag `develop` as `v2.1.0` (minor — additive collab functionality on an already-migrated transport, not another breaking transport change; no merge/push to `main`)
- [ ] Push tag to `origin`

### Wave 8 — structured UI schema (re-implementation, deferred from Wave 3)
The original `structured-ui-schema` implementation (Wave 3) produced recursive `UINode` trees that the AI model (`gemini-3.5-flash-lite`) could not reliably generate — it consistently emitted string values where the Zod schema expected objects (`layout`, `style`, `children` fields). The code was removed from the active codebase in favor of direct HTML generation, which is more reliable with current models.

**When to revisit:** Once a model version or provider is available that can reliably emit deep nested JSON matching the `UINode` schema, or if the product need for structured editing (props panel, drag-to-reorder, node-level patching) outweighs the reliability tax.

- [ ] **B-ai-core: Structured UI schema v2** (`structured-ui-schema-v2`)
  - [ ] Redesign `UINode` schema with simpler/smaller surface area to improve model compliance
  - [ ] Add `Design.schema` column back to Prisma schema (removed in earlier cleanup)
  - [ ] Rebuild tree→HTML renderer and patch-based modification
  - [ ] Wire structured generation with HTML fallback (same pattern as before, but with stricter schema)
  - [ ] Validate against target model before enabling by default

**Wave 8 release gate:**
- [ ] Wave-level regression pass on `develop`
- [ ] Tag `develop` as `v2.2.0` (minor — additive structured editing capability)
- [ ] Push tag to `origin`

## Verdict: evolve, don't rewrite
Core architecture is sound and worth keeping: iframe `srcDoc` + `sandbox="allow-scripts"` sandboxing, React Flow canvas, Prisma + Better Auth, provider-agnostic LlmManager, MCP server exposing designs to external agents. No reason to throw this away — problems are additive gaps and a few real bugs, not systemic flaws. The one deliberate exception is the RPC transport itself (Wave 6): tRPC's lack of first-class streaming is a real limitation once AI generation needs to stream incrementally, so `@effect/rpc` replaces it — but only after everything built on top of it (Waves 1–5) is stable, and only as a transport swap around business logic that Wave 3 already made Effect-native internally. Real-time collaboration (Wave 7) was deliberately pulled out of Wave 4 and deferred until after Wave 6 for the same reason: building its sync layer once on the final streaming/state stack is strictly better than building it on tRPC/Jotai in Wave 4 and migrating it again in Wave 6.

## Sequencing rationale
Bugs/deps (Wave 1, done) → AI-core majors + Mastra scaffold shells (Wave 2, scaffold-only) → AI reliability + Mastra live wiring (Wave 3, structured UI schema attempted but rolled back — see Wave 8) → Mastra refinement + editing UX (Wave 4) → Next.js major (Wave 5) → full tRPC → Effect RPC transport migration + full Jotai → Effect Atom state migration (Wave 6) → real-time collaboration + branching versioning (Wave 7) → structured UI schema v2 (Wave 8, deferred until a model can reliably emit the UINode tree).

