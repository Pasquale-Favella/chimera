
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model LlmApiKey
 * 
 */
export type LlmApiKey = $Result.DefaultSelection<Prisma.$LlmApiKeyPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectMembership
 * 
 */
export type ProjectMembership = $Result.DefaultSelection<Prisma.$ProjectMembershipPayload>
/**
 * Model Design
 * 
 */
export type Design = $Result.DefaultSelection<Prisma.$DesignPayload>
/**
 * Model Component
 * 
 */
export type Component = $Result.DefaultSelection<Prisma.$ComponentPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model DesignConnection
 * 
 */
export type DesignConnection = $Result.DefaultSelection<Prisma.$DesignConnectionPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model DesignSystem
 * 
 */
export type DesignSystem = $Result.DefaultSelection<Prisma.$DesignSystemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LlmProvider: {
  GOOGLE: 'GOOGLE',
  OPENROUTER: 'OPENROUTER'
};

export type LlmProvider = (typeof LlmProvider)[keyof typeof LlmProvider]


export const ProjectRole: {
  OWNER: 'OWNER',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER'
};

export type ProjectRole = (typeof ProjectRole)[keyof typeof ProjectRole]


export const DesignViewMode: {
  DESKTOP: 'DESKTOP',
  TABLET: 'TABLET',
  MOBILE: 'MOBILE'
};

export type DesignViewMode = (typeof DesignViewMode)[keyof typeof DesignViewMode]


export const ConnectionPosition: {
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT'
};

export type ConnectionPosition = (typeof ConnectionPosition)[keyof typeof ConnectionPosition]

}

export type LlmProvider = $Enums.LlmProvider

export const LlmProvider: typeof $Enums.LlmProvider

export type ProjectRole = $Enums.ProjectRole

export const ProjectRole: typeof $Enums.ProjectRole

export type DesignViewMode = $Enums.DesignViewMode

export const DesignViewMode: typeof $Enums.DesignViewMode

export type ConnectionPosition = $Enums.ConnectionPosition

export const ConnectionPosition: typeof $Enums.ConnectionPosition

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.llmApiKey`: Exposes CRUD operations for the **LlmApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LlmApiKeys
    * const llmApiKeys = await prisma.llmApiKey.findMany()
    * ```
    */
  get llmApiKey(): Prisma.LlmApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectMembership`: Exposes CRUD operations for the **ProjectMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectMemberships
    * const projectMemberships = await prisma.projectMembership.findMany()
    * ```
    */
  get projectMembership(): Prisma.ProjectMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.design`: Exposes CRUD operations for the **Design** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Designs
    * const designs = await prisma.design.findMany()
    * ```
    */
  get design(): Prisma.DesignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.component`: Exposes CRUD operations for the **Component** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Components
    * const components = await prisma.component.findMany()
    * ```
    */
  get component(): Prisma.ComponentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.designConnection`: Exposes CRUD operations for the **DesignConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DesignConnections
    * const designConnections = await prisma.designConnection.findMany()
    * ```
    */
  get designConnection(): Prisma.DesignConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.designSystem`: Exposes CRUD operations for the **DesignSystem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DesignSystems
    * const designSystems = await prisma.designSystem.findMany()
    * ```
    */
  get designSystem(): Prisma.DesignSystemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ApiKey: 'ApiKey',
    LlmApiKey: 'LlmApiKey',
    Project: 'Project',
    ProjectMembership: 'ProjectMembership',
    Design: 'Design',
    Component: 'Component',
    Session: 'Session',
    Account: 'Account',
    DesignConnection: 'DesignConnection',
    Verification: 'Verification',
    DesignSystem: 'DesignSystem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "apiKey" | "llmApiKey" | "project" | "projectMembership" | "design" | "component" | "session" | "account" | "designConnection" | "verification" | "designSystem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      LlmApiKey: {
        payload: Prisma.$LlmApiKeyPayload<ExtArgs>
        fields: Prisma.LlmApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LlmApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LlmApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>
          }
          findFirst: {
            args: Prisma.LlmApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LlmApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>
          }
          findMany: {
            args: Prisma.LlmApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>[]
          }
          create: {
            args: Prisma.LlmApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>
          }
          createMany: {
            args: Prisma.LlmApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LlmApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>[]
          }
          delete: {
            args: Prisma.LlmApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>
          }
          update: {
            args: Prisma.LlmApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.LlmApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LlmApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LlmApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.LlmApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LlmApiKeyPayload>
          }
          aggregate: {
            args: Prisma.LlmApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLlmApiKey>
          }
          groupBy: {
            args: Prisma.LlmApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<LlmApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.LlmApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<LlmApiKeyCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectMembership: {
        payload: Prisma.$ProjectMembershipPayload<ExtArgs>
        fields: Prisma.ProjectMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>
          }
          findFirst: {
            args: Prisma.ProjectMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>
          }
          findMany: {
            args: Prisma.ProjectMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>[]
          }
          create: {
            args: Prisma.ProjectMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>
          }
          createMany: {
            args: Prisma.ProjectMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>[]
          }
          delete: {
            args: Prisma.ProjectMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>
          }
          update: {
            args: Prisma.ProjectMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>
          }
          deleteMany: {
            args: Prisma.ProjectMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>[]
          }
          upsert: {
            args: Prisma.ProjectMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMembershipPayload>
          }
          aggregate: {
            args: Prisma.ProjectMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectMembership>
          }
          groupBy: {
            args: Prisma.ProjectMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectMembershipCountAggregateOutputType> | number
          }
        }
      }
      Design: {
        payload: Prisma.$DesignPayload<ExtArgs>
        fields: Prisma.DesignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>
          }
          findFirst: {
            args: Prisma.DesignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>
          }
          findMany: {
            args: Prisma.DesignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>[]
          }
          create: {
            args: Prisma.DesignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>
          }
          createMany: {
            args: Prisma.DesignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>[]
          }
          delete: {
            args: Prisma.DesignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>
          }
          update: {
            args: Prisma.DesignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>
          }
          deleteMany: {
            args: Prisma.DesignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>[]
          }
          upsert: {
            args: Prisma.DesignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignPayload>
          }
          aggregate: {
            args: Prisma.DesignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesign>
          }
          groupBy: {
            args: Prisma.DesignGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignCountArgs<ExtArgs>
            result: $Utils.Optional<DesignCountAggregateOutputType> | number
          }
        }
      }
      Component: {
        payload: Prisma.$ComponentPayload<ExtArgs>
        fields: Prisma.ComponentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComponentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComponentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          findFirst: {
            args: Prisma.ComponentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComponentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          findMany: {
            args: Prisma.ComponentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>[]
          }
          create: {
            args: Prisma.ComponentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          createMany: {
            args: Prisma.ComponentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComponentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>[]
          }
          delete: {
            args: Prisma.ComponentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          update: {
            args: Prisma.ComponentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          deleteMany: {
            args: Prisma.ComponentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComponentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComponentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>[]
          }
          upsert: {
            args: Prisma.ComponentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComponentPayload>
          }
          aggregate: {
            args: Prisma.ComponentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComponent>
          }
          groupBy: {
            args: Prisma.ComponentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComponentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComponentCountArgs<ExtArgs>
            result: $Utils.Optional<ComponentCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      DesignConnection: {
        payload: Prisma.$DesignConnectionPayload<ExtArgs>
        fields: Prisma.DesignConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>
          }
          findFirst: {
            args: Prisma.DesignConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>
          }
          findMany: {
            args: Prisma.DesignConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>[]
          }
          create: {
            args: Prisma.DesignConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>
          }
          createMany: {
            args: Prisma.DesignConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>[]
          }
          delete: {
            args: Prisma.DesignConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>
          }
          update: {
            args: Prisma.DesignConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>
          }
          deleteMany: {
            args: Prisma.DesignConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>[]
          }
          upsert: {
            args: Prisma.DesignConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignConnectionPayload>
          }
          aggregate: {
            args: Prisma.DesignConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesignConnection>
          }
          groupBy: {
            args: Prisma.DesignConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<DesignConnectionCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      DesignSystem: {
        payload: Prisma.$DesignSystemPayload<ExtArgs>
        fields: Prisma.DesignSystemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DesignSystemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DesignSystemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>
          }
          findFirst: {
            args: Prisma.DesignSystemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DesignSystemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>
          }
          findMany: {
            args: Prisma.DesignSystemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>[]
          }
          create: {
            args: Prisma.DesignSystemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>
          }
          createMany: {
            args: Prisma.DesignSystemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DesignSystemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>[]
          }
          delete: {
            args: Prisma.DesignSystemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>
          }
          update: {
            args: Prisma.DesignSystemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>
          }
          deleteMany: {
            args: Prisma.DesignSystemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DesignSystemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DesignSystemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>[]
          }
          upsert: {
            args: Prisma.DesignSystemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DesignSystemPayload>
          }
          aggregate: {
            args: Prisma.DesignSystemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDesignSystem>
          }
          groupBy: {
            args: Prisma.DesignSystemGroupByArgs<ExtArgs>
            result: $Utils.Optional<DesignSystemGroupByOutputType>[]
          }
          count: {
            args: Prisma.DesignSystemCountArgs<ExtArgs>
            result: $Utils.Optional<DesignSystemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    apiKey?: ApiKeyOmit
    llmApiKey?: LlmApiKeyOmit
    project?: ProjectOmit
    projectMembership?: ProjectMembershipOmit
    design?: DesignOmit
    component?: ComponentOmit
    session?: SessionOmit
    account?: AccountOmit
    designConnection?: DesignConnectionOmit
    verification?: VerificationOmit
    designSystem?: DesignSystemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    projectsOwned: number
    memberships: number
    designs: number
    components: number
    membershipInvites: number
    llmApiKeys: number
    apiKeys: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    projectsOwned?: boolean | UserCountOutputTypeCountProjectsOwnedArgs
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    designs?: boolean | UserCountOutputTypeCountDesignsArgs
    components?: boolean | UserCountOutputTypeCountComponentsArgs
    membershipInvites?: boolean | UserCountOutputTypeCountMembershipInvitesArgs
    llmApiKeys?: boolean | UserCountOutputTypeCountLlmApiKeysArgs
    apiKeys?: boolean | UserCountOutputTypeCountApiKeysArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsOwnedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDesignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountComponentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComponentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLlmApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LlmApiKeyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    memberships: number
    designs: number
    components: number
    connections: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | ProjectCountOutputTypeCountMembershipsArgs
    designs?: boolean | ProjectCountOutputTypeCountDesignsArgs
    components?: boolean | ProjectCountOutputTypeCountComponentsArgs
    connections?: boolean | ProjectCountOutputTypeCountConnectionsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMembershipWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountDesignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountComponentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComponentWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignConnectionWhereInput
  }


  /**
   * Count Type DesignCountOutputType
   */

  export type DesignCountOutputType = {
    connectionsFrom: number
    connectionsTo: number
  }

  export type DesignCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connectionsFrom?: boolean | DesignCountOutputTypeCountConnectionsFromArgs
    connectionsTo?: boolean | DesignCountOutputTypeCountConnectionsToArgs
  }

  // Custom InputTypes
  /**
   * DesignCountOutputType without action
   */
  export type DesignCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignCountOutputType
     */
    select?: DesignCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DesignCountOutputType without action
   */
  export type DesignCountOutputTypeCountConnectionsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignConnectionWhereInput
  }

  /**
   * DesignCountOutputType without action
   */
  export type DesignCountOutputTypeCountConnectionsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignConnectionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    llmPreferences: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    llmPreferences?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    llmPreferences: JsonValue | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    llmPreferences?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projectsOwned?: boolean | User$projectsOwnedArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    designs?: boolean | User$designsArgs<ExtArgs>
    components?: boolean | User$componentsArgs<ExtArgs>
    membershipInvites?: boolean | User$membershipInvitesArgs<ExtArgs>
    llmApiKeys?: boolean | User$llmApiKeysArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    llmPreferences?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    llmPreferences?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    llmPreferences?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "llmPreferences", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projectsOwned?: boolean | User$projectsOwnedArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    designs?: boolean | User$designsArgs<ExtArgs>
    components?: boolean | User$componentsArgs<ExtArgs>
    membershipInvites?: boolean | User$membershipInvitesArgs<ExtArgs>
    llmApiKeys?: boolean | User$llmApiKeysArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      projectsOwned: Prisma.$ProjectPayload<ExtArgs>[]
      memberships: Prisma.$ProjectMembershipPayload<ExtArgs>[]
      designs: Prisma.$DesignPayload<ExtArgs>[]
      components: Prisma.$ComponentPayload<ExtArgs>[]
      membershipInvites: Prisma.$ProjectMembershipPayload<ExtArgs>[]
      llmApiKeys: Prisma.$LlmApiKeyPayload<ExtArgs>[]
      apiKeys: Prisma.$ApiKeyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      llmPreferences: Prisma.JsonValue | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projectsOwned<T extends User$projectsOwnedArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsOwnedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    designs<T extends User$designsArgs<ExtArgs> = {}>(args?: Subset<T, User$designsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    components<T extends User$componentsArgs<ExtArgs> = {}>(args?: Subset<T, User$componentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    membershipInvites<T extends User$membershipInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    llmApiKeys<T extends User$llmApiKeysArgs<ExtArgs> = {}>(args?: Subset<T, User$llmApiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiKeys<T extends User$apiKeysArgs<ExtArgs> = {}>(args?: Subset<T, User$apiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly llmPreferences: FieldRef<"User", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.projectsOwned
   */
  export type User$projectsOwnedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    where?: ProjectMembershipWhereInput
    orderBy?: ProjectMembershipOrderByWithRelationInput | ProjectMembershipOrderByWithRelationInput[]
    cursor?: ProjectMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMembershipScalarFieldEnum | ProjectMembershipScalarFieldEnum[]
  }

  /**
   * User.designs
   */
  export type User$designsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    where?: DesignWhereInput
    orderBy?: DesignOrderByWithRelationInput | DesignOrderByWithRelationInput[]
    cursor?: DesignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignScalarFieldEnum | DesignScalarFieldEnum[]
  }

  /**
   * User.components
   */
  export type User$componentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    where?: ComponentWhereInput
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    cursor?: ComponentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * User.membershipInvites
   */
  export type User$membershipInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    where?: ProjectMembershipWhereInput
    orderBy?: ProjectMembershipOrderByWithRelationInput | ProjectMembershipOrderByWithRelationInput[]
    cursor?: ProjectMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMembershipScalarFieldEnum | ProjectMembershipScalarFieldEnum[]
  }

  /**
   * User.llmApiKeys
   */
  export type User$llmApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    where?: LlmApiKeyWhereInput
    orderBy?: LlmApiKeyOrderByWithRelationInput | LlmApiKeyOrderByWithRelationInput[]
    cursor?: LlmApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LlmApiKeyScalarFieldEnum | LlmApiKeyScalarFieldEnum[]
  }

  /**
   * User.apiKeys
   */
  export type User$apiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    name: string | null
    key: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    key: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    name: number
    key: number
    lastUsedAt: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    name?: true
    key?: true
    lastUsedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    name?: true
    key?: true
    lastUsedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    name?: true
    key?: true
    lastUsedAt?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    name: string | null
    key: string
    lastUsedAt: Date | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    name?: boolean
    key?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "key" | "lastUsedAt" | "expiresAt" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      key: string
      lastUsedAt: Date | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly key: FieldRef<"ApiKey", 'String'>
    readonly lastUsedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly expiresAt: FieldRef<"ApiKey", 'DateTime'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly userId: FieldRef<"ApiKey", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model LlmApiKey
   */

  export type AggregateLlmApiKey = {
    _count: LlmApiKeyCountAggregateOutputType | null
    _min: LlmApiKeyMinAggregateOutputType | null
    _max: LlmApiKeyMaxAggregateOutputType | null
  }

  export type LlmApiKeyMinAggregateOutputType = {
    id: string | null
    provider: $Enums.LlmProvider | null
    apiKey: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LlmApiKeyMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.LlmProvider | null
    apiKey: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LlmApiKeyCountAggregateOutputType = {
    id: number
    provider: number
    apiKey: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LlmApiKeyMinAggregateInputType = {
    id?: true
    provider?: true
    apiKey?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LlmApiKeyMaxAggregateInputType = {
    id?: true
    provider?: true
    apiKey?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LlmApiKeyCountAggregateInputType = {
    id?: true
    provider?: true
    apiKey?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LlmApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LlmApiKey to aggregate.
     */
    where?: LlmApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LlmApiKeys to fetch.
     */
    orderBy?: LlmApiKeyOrderByWithRelationInput | LlmApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LlmApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LlmApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LlmApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LlmApiKeys
    **/
    _count?: true | LlmApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LlmApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LlmApiKeyMaxAggregateInputType
  }

  export type GetLlmApiKeyAggregateType<T extends LlmApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateLlmApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLlmApiKey[P]>
      : GetScalarType<T[P], AggregateLlmApiKey[P]>
  }




  export type LlmApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LlmApiKeyWhereInput
    orderBy?: LlmApiKeyOrderByWithAggregationInput | LlmApiKeyOrderByWithAggregationInput[]
    by: LlmApiKeyScalarFieldEnum[] | LlmApiKeyScalarFieldEnum
    having?: LlmApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LlmApiKeyCountAggregateInputType | true
    _min?: LlmApiKeyMinAggregateInputType
    _max?: LlmApiKeyMaxAggregateInputType
  }

  export type LlmApiKeyGroupByOutputType = {
    id: string
    provider: $Enums.LlmProvider
    apiKey: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: LlmApiKeyCountAggregateOutputType | null
    _min: LlmApiKeyMinAggregateOutputType | null
    _max: LlmApiKeyMaxAggregateOutputType | null
  }

  type GetLlmApiKeyGroupByPayload<T extends LlmApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LlmApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LlmApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LlmApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], LlmApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type LlmApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    apiKey?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["llmApiKey"]>

  export type LlmApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    apiKey?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["llmApiKey"]>

  export type LlmApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    apiKey?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["llmApiKey"]>

  export type LlmApiKeySelectScalar = {
    id?: boolean
    provider?: boolean
    apiKey?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LlmApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "apiKey" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["llmApiKey"]>
  export type LlmApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LlmApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LlmApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LlmApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LlmApiKey"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.LlmProvider
      apiKey: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["llmApiKey"]>
    composites: {}
  }

  type LlmApiKeyGetPayload<S extends boolean | null | undefined | LlmApiKeyDefaultArgs> = $Result.GetResult<Prisma.$LlmApiKeyPayload, S>

  type LlmApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LlmApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LlmApiKeyCountAggregateInputType | true
    }

  export interface LlmApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LlmApiKey'], meta: { name: 'LlmApiKey' } }
    /**
     * Find zero or one LlmApiKey that matches the filter.
     * @param {LlmApiKeyFindUniqueArgs} args - Arguments to find a LlmApiKey
     * @example
     * // Get one LlmApiKey
     * const llmApiKey = await prisma.llmApiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LlmApiKeyFindUniqueArgs>(args: SelectSubset<T, LlmApiKeyFindUniqueArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LlmApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LlmApiKeyFindUniqueOrThrowArgs} args - Arguments to find a LlmApiKey
     * @example
     * // Get one LlmApiKey
     * const llmApiKey = await prisma.llmApiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LlmApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, LlmApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LlmApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LlmApiKeyFindFirstArgs} args - Arguments to find a LlmApiKey
     * @example
     * // Get one LlmApiKey
     * const llmApiKey = await prisma.llmApiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LlmApiKeyFindFirstArgs>(args?: SelectSubset<T, LlmApiKeyFindFirstArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LlmApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LlmApiKeyFindFirstOrThrowArgs} args - Arguments to find a LlmApiKey
     * @example
     * // Get one LlmApiKey
     * const llmApiKey = await prisma.llmApiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LlmApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, LlmApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LlmApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LlmApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LlmApiKeys
     * const llmApiKeys = await prisma.llmApiKey.findMany()
     * 
     * // Get first 10 LlmApiKeys
     * const llmApiKeys = await prisma.llmApiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const llmApiKeyWithIdOnly = await prisma.llmApiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LlmApiKeyFindManyArgs>(args?: SelectSubset<T, LlmApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LlmApiKey.
     * @param {LlmApiKeyCreateArgs} args - Arguments to create a LlmApiKey.
     * @example
     * // Create one LlmApiKey
     * const LlmApiKey = await prisma.llmApiKey.create({
     *   data: {
     *     // ... data to create a LlmApiKey
     *   }
     * })
     * 
     */
    create<T extends LlmApiKeyCreateArgs>(args: SelectSubset<T, LlmApiKeyCreateArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LlmApiKeys.
     * @param {LlmApiKeyCreateManyArgs} args - Arguments to create many LlmApiKeys.
     * @example
     * // Create many LlmApiKeys
     * const llmApiKey = await prisma.llmApiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LlmApiKeyCreateManyArgs>(args?: SelectSubset<T, LlmApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LlmApiKeys and returns the data saved in the database.
     * @param {LlmApiKeyCreateManyAndReturnArgs} args - Arguments to create many LlmApiKeys.
     * @example
     * // Create many LlmApiKeys
     * const llmApiKey = await prisma.llmApiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LlmApiKeys and only return the `id`
     * const llmApiKeyWithIdOnly = await prisma.llmApiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LlmApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, LlmApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LlmApiKey.
     * @param {LlmApiKeyDeleteArgs} args - Arguments to delete one LlmApiKey.
     * @example
     * // Delete one LlmApiKey
     * const LlmApiKey = await prisma.llmApiKey.delete({
     *   where: {
     *     // ... filter to delete one LlmApiKey
     *   }
     * })
     * 
     */
    delete<T extends LlmApiKeyDeleteArgs>(args: SelectSubset<T, LlmApiKeyDeleteArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LlmApiKey.
     * @param {LlmApiKeyUpdateArgs} args - Arguments to update one LlmApiKey.
     * @example
     * // Update one LlmApiKey
     * const llmApiKey = await prisma.llmApiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LlmApiKeyUpdateArgs>(args: SelectSubset<T, LlmApiKeyUpdateArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LlmApiKeys.
     * @param {LlmApiKeyDeleteManyArgs} args - Arguments to filter LlmApiKeys to delete.
     * @example
     * // Delete a few LlmApiKeys
     * const { count } = await prisma.llmApiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LlmApiKeyDeleteManyArgs>(args?: SelectSubset<T, LlmApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LlmApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LlmApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LlmApiKeys
     * const llmApiKey = await prisma.llmApiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LlmApiKeyUpdateManyArgs>(args: SelectSubset<T, LlmApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LlmApiKeys and returns the data updated in the database.
     * @param {LlmApiKeyUpdateManyAndReturnArgs} args - Arguments to update many LlmApiKeys.
     * @example
     * // Update many LlmApiKeys
     * const llmApiKey = await prisma.llmApiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LlmApiKeys and only return the `id`
     * const llmApiKeyWithIdOnly = await prisma.llmApiKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LlmApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, LlmApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LlmApiKey.
     * @param {LlmApiKeyUpsertArgs} args - Arguments to update or create a LlmApiKey.
     * @example
     * // Update or create a LlmApiKey
     * const llmApiKey = await prisma.llmApiKey.upsert({
     *   create: {
     *     // ... data to create a LlmApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LlmApiKey we want to update
     *   }
     * })
     */
    upsert<T extends LlmApiKeyUpsertArgs>(args: SelectSubset<T, LlmApiKeyUpsertArgs<ExtArgs>>): Prisma__LlmApiKeyClient<$Result.GetResult<Prisma.$LlmApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LlmApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LlmApiKeyCountArgs} args - Arguments to filter LlmApiKeys to count.
     * @example
     * // Count the number of LlmApiKeys
     * const count = await prisma.llmApiKey.count({
     *   where: {
     *     // ... the filter for the LlmApiKeys we want to count
     *   }
     * })
    **/
    count<T extends LlmApiKeyCountArgs>(
      args?: Subset<T, LlmApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LlmApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LlmApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LlmApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LlmApiKeyAggregateArgs>(args: Subset<T, LlmApiKeyAggregateArgs>): Prisma.PrismaPromise<GetLlmApiKeyAggregateType<T>>

    /**
     * Group by LlmApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LlmApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LlmApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LlmApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: LlmApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LlmApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLlmApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LlmApiKey model
   */
  readonly fields: LlmApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LlmApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LlmApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LlmApiKey model
   */
  interface LlmApiKeyFieldRefs {
    readonly id: FieldRef<"LlmApiKey", 'String'>
    readonly provider: FieldRef<"LlmApiKey", 'LlmProvider'>
    readonly apiKey: FieldRef<"LlmApiKey", 'String'>
    readonly userId: FieldRef<"LlmApiKey", 'String'>
    readonly createdAt: FieldRef<"LlmApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"LlmApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LlmApiKey findUnique
   */
  export type LlmApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which LlmApiKey to fetch.
     */
    where: LlmApiKeyWhereUniqueInput
  }

  /**
   * LlmApiKey findUniqueOrThrow
   */
  export type LlmApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which LlmApiKey to fetch.
     */
    where: LlmApiKeyWhereUniqueInput
  }

  /**
   * LlmApiKey findFirst
   */
  export type LlmApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which LlmApiKey to fetch.
     */
    where?: LlmApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LlmApiKeys to fetch.
     */
    orderBy?: LlmApiKeyOrderByWithRelationInput | LlmApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LlmApiKeys.
     */
    cursor?: LlmApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LlmApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LlmApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LlmApiKeys.
     */
    distinct?: LlmApiKeyScalarFieldEnum | LlmApiKeyScalarFieldEnum[]
  }

  /**
   * LlmApiKey findFirstOrThrow
   */
  export type LlmApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which LlmApiKey to fetch.
     */
    where?: LlmApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LlmApiKeys to fetch.
     */
    orderBy?: LlmApiKeyOrderByWithRelationInput | LlmApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LlmApiKeys.
     */
    cursor?: LlmApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LlmApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LlmApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LlmApiKeys.
     */
    distinct?: LlmApiKeyScalarFieldEnum | LlmApiKeyScalarFieldEnum[]
  }

  /**
   * LlmApiKey findMany
   */
  export type LlmApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which LlmApiKeys to fetch.
     */
    where?: LlmApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LlmApiKeys to fetch.
     */
    orderBy?: LlmApiKeyOrderByWithRelationInput | LlmApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LlmApiKeys.
     */
    cursor?: LlmApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LlmApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LlmApiKeys.
     */
    skip?: number
    distinct?: LlmApiKeyScalarFieldEnum | LlmApiKeyScalarFieldEnum[]
  }

  /**
   * LlmApiKey create
   */
  export type LlmApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a LlmApiKey.
     */
    data: XOR<LlmApiKeyCreateInput, LlmApiKeyUncheckedCreateInput>
  }

  /**
   * LlmApiKey createMany
   */
  export type LlmApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LlmApiKeys.
     */
    data: LlmApiKeyCreateManyInput | LlmApiKeyCreateManyInput[]
  }

  /**
   * LlmApiKey createManyAndReturn
   */
  export type LlmApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many LlmApiKeys.
     */
    data: LlmApiKeyCreateManyInput | LlmApiKeyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LlmApiKey update
   */
  export type LlmApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a LlmApiKey.
     */
    data: XOR<LlmApiKeyUpdateInput, LlmApiKeyUncheckedUpdateInput>
    /**
     * Choose, which LlmApiKey to update.
     */
    where: LlmApiKeyWhereUniqueInput
  }

  /**
   * LlmApiKey updateMany
   */
  export type LlmApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LlmApiKeys.
     */
    data: XOR<LlmApiKeyUpdateManyMutationInput, LlmApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which LlmApiKeys to update
     */
    where?: LlmApiKeyWhereInput
    /**
     * Limit how many LlmApiKeys to update.
     */
    limit?: number
  }

  /**
   * LlmApiKey updateManyAndReturn
   */
  export type LlmApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update LlmApiKeys.
     */
    data: XOR<LlmApiKeyUpdateManyMutationInput, LlmApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which LlmApiKeys to update
     */
    where?: LlmApiKeyWhereInput
    /**
     * Limit how many LlmApiKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LlmApiKey upsert
   */
  export type LlmApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the LlmApiKey to update in case it exists.
     */
    where: LlmApiKeyWhereUniqueInput
    /**
     * In case the LlmApiKey found by the `where` argument doesn't exist, create a new LlmApiKey with this data.
     */
    create: XOR<LlmApiKeyCreateInput, LlmApiKeyUncheckedCreateInput>
    /**
     * In case the LlmApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LlmApiKeyUpdateInput, LlmApiKeyUncheckedUpdateInput>
  }

  /**
   * LlmApiKey delete
   */
  export type LlmApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
    /**
     * Filter which LlmApiKey to delete.
     */
    where: LlmApiKeyWhereUniqueInput
  }

  /**
   * LlmApiKey deleteMany
   */
  export type LlmApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LlmApiKeys to delete
     */
    where?: LlmApiKeyWhereInput
    /**
     * Limit how many LlmApiKeys to delete.
     */
    limit?: number
  }

  /**
   * LlmApiKey without action
   */
  export type LlmApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LlmApiKey
     */
    select?: LlmApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LlmApiKey
     */
    omit?: LlmApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LlmApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    createdById: string
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | Project$membershipsArgs<ExtArgs>
    designs?: boolean | Project$designsArgs<ExtArgs>
    components?: boolean | Project$componentsArgs<ExtArgs>
    connections?: boolean | Project$connectionsArgs<ExtArgs>
    designSystem?: boolean | Project$designSystemArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    memberships?: boolean | Project$membershipsArgs<ExtArgs>
    designs?: boolean | Project$designsArgs<ExtArgs>
    components?: boolean | Project$componentsArgs<ExtArgs>
    connections?: boolean | Project$connectionsArgs<ExtArgs>
    designSystem?: boolean | Project$designSystemArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      memberships: Prisma.$ProjectMembershipPayload<ExtArgs>[]
      designs: Prisma.$DesignPayload<ExtArgs>[]
      components: Prisma.$ComponentPayload<ExtArgs>[]
      connections: Prisma.$DesignConnectionPayload<ExtArgs>[]
      designSystem: Prisma.$DesignSystemPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      createdById: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    memberships<T extends Project$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Project$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    designs<T extends Project$designsArgs<ExtArgs> = {}>(args?: Subset<T, Project$designsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    components<T extends Project$componentsArgs<ExtArgs> = {}>(args?: Subset<T, Project$componentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    connections<T extends Project$connectionsArgs<ExtArgs> = {}>(args?: Subset<T, Project$connectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    designSystem<T extends Project$designSystemArgs<ExtArgs> = {}>(args?: Subset<T, Project$designSystemArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly createdById: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.memberships
   */
  export type Project$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    where?: ProjectMembershipWhereInput
    orderBy?: ProjectMembershipOrderByWithRelationInput | ProjectMembershipOrderByWithRelationInput[]
    cursor?: ProjectMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMembershipScalarFieldEnum | ProjectMembershipScalarFieldEnum[]
  }

  /**
   * Project.designs
   */
  export type Project$designsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    where?: DesignWhereInput
    orderBy?: DesignOrderByWithRelationInput | DesignOrderByWithRelationInput[]
    cursor?: DesignWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignScalarFieldEnum | DesignScalarFieldEnum[]
  }

  /**
   * Project.components
   */
  export type Project$componentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    where?: ComponentWhereInput
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    cursor?: ComponentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * Project.connections
   */
  export type Project$connectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    where?: DesignConnectionWhereInput
    orderBy?: DesignConnectionOrderByWithRelationInput | DesignConnectionOrderByWithRelationInput[]
    cursor?: DesignConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignConnectionScalarFieldEnum | DesignConnectionScalarFieldEnum[]
  }

  /**
   * Project.designSystem
   */
  export type Project$designSystemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    where?: DesignSystemWhereInput
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectMembership
   */

  export type AggregateProjectMembership = {
    _count: ProjectMembershipCountAggregateOutputType | null
    _min: ProjectMembershipMinAggregateOutputType | null
    _max: ProjectMembershipMaxAggregateOutputType | null
  }

  export type ProjectMembershipMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    userId: string | null
    role: $Enums.ProjectRole | null
    invitedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMembershipMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    userId: string | null
    role: $Enums.ProjectRole | null
    invitedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMembershipCountAggregateOutputType = {
    id: number
    projectId: number
    userId: number
    role: number
    invitedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMembershipMinAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    role?: true
    invitedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMembershipMaxAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    role?: true
    invitedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMembershipCountAggregateInputType = {
    id?: true
    projectId?: true
    userId?: true
    role?: true
    invitedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMembership to aggregate.
     */
    where?: ProjectMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemberships to fetch.
     */
    orderBy?: ProjectMembershipOrderByWithRelationInput | ProjectMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectMemberships
    **/
    _count?: true | ProjectMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMembershipMaxAggregateInputType
  }

  export type GetProjectMembershipAggregateType<T extends ProjectMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectMembership[P]>
      : GetScalarType<T[P], AggregateProjectMembership[P]>
  }




  export type ProjectMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMembershipWhereInput
    orderBy?: ProjectMembershipOrderByWithAggregationInput | ProjectMembershipOrderByWithAggregationInput[]
    by: ProjectMembershipScalarFieldEnum[] | ProjectMembershipScalarFieldEnum
    having?: ProjectMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectMembershipCountAggregateInputType | true
    _min?: ProjectMembershipMinAggregateInputType
    _max?: ProjectMembershipMaxAggregateInputType
  }

  export type ProjectMembershipGroupByOutputType = {
    id: string
    projectId: string
    userId: string
    role: $Enums.ProjectRole
    invitedById: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectMembershipCountAggregateOutputType | null
    _min: ProjectMembershipMinAggregateOutputType | null
    _max: ProjectMembershipMaxAggregateOutputType | null
  }

  type GetProjectMembershipGroupByPayload<T extends ProjectMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectMembershipGroupByOutputType[P]>
        }
      >
    >


  export type ProjectMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    role?: boolean
    invitedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | ProjectMembership$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["projectMembership"]>

  export type ProjectMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    role?: boolean
    invitedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | ProjectMembership$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["projectMembership"]>

  export type ProjectMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    userId?: boolean
    role?: boolean
    invitedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | ProjectMembership$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["projectMembership"]>

  export type ProjectMembershipSelectScalar = {
    id?: boolean
    projectId?: boolean
    userId?: boolean
    role?: boolean
    invitedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "userId" | "role" | "invitedById" | "createdAt" | "updatedAt", ExtArgs["result"]["projectMembership"]>
  export type ProjectMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | ProjectMembership$invitedByArgs<ExtArgs>
  }
  export type ProjectMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | ProjectMembership$invitedByArgs<ExtArgs>
  }
  export type ProjectMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | ProjectMembership$invitedByArgs<ExtArgs>
  }

  export type $ProjectMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectMembership"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      invitedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      userId: string
      role: $Enums.ProjectRole
      invitedById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectMembership"]>
    composites: {}
  }

  type ProjectMembershipGetPayload<S extends boolean | null | undefined | ProjectMembershipDefaultArgs> = $Result.GetResult<Prisma.$ProjectMembershipPayload, S>

  type ProjectMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectMembershipCountAggregateInputType | true
    }

  export interface ProjectMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectMembership'], meta: { name: 'ProjectMembership' } }
    /**
     * Find zero or one ProjectMembership that matches the filter.
     * @param {ProjectMembershipFindUniqueArgs} args - Arguments to find a ProjectMembership
     * @example
     * // Get one ProjectMembership
     * const projectMembership = await prisma.projectMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectMembershipFindUniqueArgs>(args: SelectSubset<T, ProjectMembershipFindUniqueArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectMembershipFindUniqueOrThrowArgs} args - Arguments to find a ProjectMembership
     * @example
     * // Get one ProjectMembership
     * const projectMembership = await prisma.projectMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMembershipFindFirstArgs} args - Arguments to find a ProjectMembership
     * @example
     * // Get one ProjectMembership
     * const projectMembership = await prisma.projectMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectMembershipFindFirstArgs>(args?: SelectSubset<T, ProjectMembershipFindFirstArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMembershipFindFirstOrThrowArgs} args - Arguments to find a ProjectMembership
     * @example
     * // Get one ProjectMembership
     * const projectMembership = await prisma.projectMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectMemberships
     * const projectMemberships = await prisma.projectMembership.findMany()
     * 
     * // Get first 10 ProjectMemberships
     * const projectMemberships = await prisma.projectMembership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectMembershipWithIdOnly = await prisma.projectMembership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectMembershipFindManyArgs>(args?: SelectSubset<T, ProjectMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectMembership.
     * @param {ProjectMembershipCreateArgs} args - Arguments to create a ProjectMembership.
     * @example
     * // Create one ProjectMembership
     * const ProjectMembership = await prisma.projectMembership.create({
     *   data: {
     *     // ... data to create a ProjectMembership
     *   }
     * })
     * 
     */
    create<T extends ProjectMembershipCreateArgs>(args: SelectSubset<T, ProjectMembershipCreateArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectMemberships.
     * @param {ProjectMembershipCreateManyArgs} args - Arguments to create many ProjectMemberships.
     * @example
     * // Create many ProjectMemberships
     * const projectMembership = await prisma.projectMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectMembershipCreateManyArgs>(args?: SelectSubset<T, ProjectMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectMemberships and returns the data saved in the database.
     * @param {ProjectMembershipCreateManyAndReturnArgs} args - Arguments to create many ProjectMemberships.
     * @example
     * // Create many ProjectMemberships
     * const projectMembership = await prisma.projectMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectMemberships and only return the `id`
     * const projectMembershipWithIdOnly = await prisma.projectMembership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectMembership.
     * @param {ProjectMembershipDeleteArgs} args - Arguments to delete one ProjectMembership.
     * @example
     * // Delete one ProjectMembership
     * const ProjectMembership = await prisma.projectMembership.delete({
     *   where: {
     *     // ... filter to delete one ProjectMembership
     *   }
     * })
     * 
     */
    delete<T extends ProjectMembershipDeleteArgs>(args: SelectSubset<T, ProjectMembershipDeleteArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectMembership.
     * @param {ProjectMembershipUpdateArgs} args - Arguments to update one ProjectMembership.
     * @example
     * // Update one ProjectMembership
     * const projectMembership = await prisma.projectMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectMembershipUpdateArgs>(args: SelectSubset<T, ProjectMembershipUpdateArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectMemberships.
     * @param {ProjectMembershipDeleteManyArgs} args - Arguments to filter ProjectMemberships to delete.
     * @example
     * // Delete a few ProjectMemberships
     * const { count } = await prisma.projectMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectMembershipDeleteManyArgs>(args?: SelectSubset<T, ProjectMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectMemberships
     * const projectMembership = await prisma.projectMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectMembershipUpdateManyArgs>(args: SelectSubset<T, ProjectMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMemberships and returns the data updated in the database.
     * @param {ProjectMembershipUpdateManyAndReturnArgs} args - Arguments to update many ProjectMemberships.
     * @example
     * // Update many ProjectMemberships
     * const projectMembership = await prisma.projectMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectMemberships and only return the `id`
     * const projectMembershipWithIdOnly = await prisma.projectMembership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectMembership.
     * @param {ProjectMembershipUpsertArgs} args - Arguments to update or create a ProjectMembership.
     * @example
     * // Update or create a ProjectMembership
     * const projectMembership = await prisma.projectMembership.upsert({
     *   create: {
     *     // ... data to create a ProjectMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectMembership we want to update
     *   }
     * })
     */
    upsert<T extends ProjectMembershipUpsertArgs>(args: SelectSubset<T, ProjectMembershipUpsertArgs<ExtArgs>>): Prisma__ProjectMembershipClient<$Result.GetResult<Prisma.$ProjectMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMembershipCountArgs} args - Arguments to filter ProjectMemberships to count.
     * @example
     * // Count the number of ProjectMemberships
     * const count = await prisma.projectMembership.count({
     *   where: {
     *     // ... the filter for the ProjectMemberships we want to count
     *   }
     * })
    **/
    count<T extends ProjectMembershipCountArgs>(
      args?: Subset<T, ProjectMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectMembershipAggregateArgs>(args: Subset<T, ProjectMembershipAggregateArgs>): Prisma.PrismaPromise<GetProjectMembershipAggregateType<T>>

    /**
     * Group by ProjectMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectMembershipGroupByArgs['orderBy'] }
        : { orderBy?: ProjectMembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectMembership model
   */
  readonly fields: ProjectMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitedBy<T extends ProjectMembership$invitedByArgs<ExtArgs> = {}>(args?: Subset<T, ProjectMembership$invitedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectMembership model
   */
  interface ProjectMembershipFieldRefs {
    readonly id: FieldRef<"ProjectMembership", 'String'>
    readonly projectId: FieldRef<"ProjectMembership", 'String'>
    readonly userId: FieldRef<"ProjectMembership", 'String'>
    readonly role: FieldRef<"ProjectMembership", 'ProjectRole'>
    readonly invitedById: FieldRef<"ProjectMembership", 'String'>
    readonly createdAt: FieldRef<"ProjectMembership", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectMembership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectMembership findUnique
   */
  export type ProjectMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMembership to fetch.
     */
    where: ProjectMembershipWhereUniqueInput
  }

  /**
   * ProjectMembership findUniqueOrThrow
   */
  export type ProjectMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMembership to fetch.
     */
    where: ProjectMembershipWhereUniqueInput
  }

  /**
   * ProjectMembership findFirst
   */
  export type ProjectMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMembership to fetch.
     */
    where?: ProjectMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemberships to fetch.
     */
    orderBy?: ProjectMembershipOrderByWithRelationInput | ProjectMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMemberships.
     */
    cursor?: ProjectMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMemberships.
     */
    distinct?: ProjectMembershipScalarFieldEnum | ProjectMembershipScalarFieldEnum[]
  }

  /**
   * ProjectMembership findFirstOrThrow
   */
  export type ProjectMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMembership to fetch.
     */
    where?: ProjectMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemberships to fetch.
     */
    orderBy?: ProjectMembershipOrderByWithRelationInput | ProjectMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMemberships.
     */
    cursor?: ProjectMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMemberships.
     */
    distinct?: ProjectMembershipScalarFieldEnum | ProjectMembershipScalarFieldEnum[]
  }

  /**
   * ProjectMembership findMany
   */
  export type ProjectMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMemberships to fetch.
     */
    where?: ProjectMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMemberships to fetch.
     */
    orderBy?: ProjectMembershipOrderByWithRelationInput | ProjectMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectMemberships.
     */
    cursor?: ProjectMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMemberships.
     */
    skip?: number
    distinct?: ProjectMembershipScalarFieldEnum | ProjectMembershipScalarFieldEnum[]
  }

  /**
   * ProjectMembership create
   */
  export type ProjectMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectMembership.
     */
    data: XOR<ProjectMembershipCreateInput, ProjectMembershipUncheckedCreateInput>
  }

  /**
   * ProjectMembership createMany
   */
  export type ProjectMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectMemberships.
     */
    data: ProjectMembershipCreateManyInput | ProjectMembershipCreateManyInput[]
  }

  /**
   * ProjectMembership createManyAndReturn
   */
  export type ProjectMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectMemberships.
     */
    data: ProjectMembershipCreateManyInput | ProjectMembershipCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMembership update
   */
  export type ProjectMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectMembership.
     */
    data: XOR<ProjectMembershipUpdateInput, ProjectMembershipUncheckedUpdateInput>
    /**
     * Choose, which ProjectMembership to update.
     */
    where: ProjectMembershipWhereUniqueInput
  }

  /**
   * ProjectMembership updateMany
   */
  export type ProjectMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectMemberships.
     */
    data: XOR<ProjectMembershipUpdateManyMutationInput, ProjectMembershipUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMemberships to update
     */
    where?: ProjectMembershipWhereInput
    /**
     * Limit how many ProjectMemberships to update.
     */
    limit?: number
  }

  /**
   * ProjectMembership updateManyAndReturn
   */
  export type ProjectMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * The data used to update ProjectMemberships.
     */
    data: XOR<ProjectMembershipUpdateManyMutationInput, ProjectMembershipUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMemberships to update
     */
    where?: ProjectMembershipWhereInput
    /**
     * Limit how many ProjectMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMembership upsert
   */
  export type ProjectMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectMembership to update in case it exists.
     */
    where: ProjectMembershipWhereUniqueInput
    /**
     * In case the ProjectMembership found by the `where` argument doesn't exist, create a new ProjectMembership with this data.
     */
    create: XOR<ProjectMembershipCreateInput, ProjectMembershipUncheckedCreateInput>
    /**
     * In case the ProjectMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectMembershipUpdateInput, ProjectMembershipUncheckedUpdateInput>
  }

  /**
   * ProjectMembership delete
   */
  export type ProjectMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
    /**
     * Filter which ProjectMembership to delete.
     */
    where: ProjectMembershipWhereUniqueInput
  }

  /**
   * ProjectMembership deleteMany
   */
  export type ProjectMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMemberships to delete
     */
    where?: ProjectMembershipWhereInput
    /**
     * Limit how many ProjectMemberships to delete.
     */
    limit?: number
  }

  /**
   * ProjectMembership.invitedBy
   */
  export type ProjectMembership$invitedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ProjectMembership without action
   */
  export type ProjectMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMembership
     */
    select?: ProjectMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMembership
     */
    omit?: ProjectMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMembershipInclude<ExtArgs> | null
  }


  /**
   * Model Design
   */

  export type AggregateDesign = {
    _count: DesignCountAggregateOutputType | null
    _avg: DesignAvgAggregateOutputType | null
    _sum: DesignSumAggregateOutputType | null
    _min: DesignMinAggregateOutputType | null
    _max: DesignMaxAggregateOutputType | null
  }

  export type DesignAvgAggregateOutputType = {
    version: number | null
  }

  export type DesignSumAggregateOutputType = {
    version: number | null
  }

  export type DesignMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    createdById: string | null
    name: string | null
    description: string | null
    html: string | null
    viewMode: $Enums.DesignViewMode | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DesignMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    createdById: string | null
    name: string | null
    description: string | null
    html: string | null
    viewMode: $Enums.DesignViewMode | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DesignCountAggregateOutputType = {
    id: number
    projectId: number
    createdById: number
    name: number
    description: number
    html: number
    position: number
    size: number
    viewMode: number
    history: number
    tokens: number
    data: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DesignAvgAggregateInputType = {
    version?: true
  }

  export type DesignSumAggregateInputType = {
    version?: true
  }

  export type DesignMinAggregateInputType = {
    id?: true
    projectId?: true
    createdById?: true
    name?: true
    description?: true
    html?: true
    viewMode?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DesignMaxAggregateInputType = {
    id?: true
    projectId?: true
    createdById?: true
    name?: true
    description?: true
    html?: true
    viewMode?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DesignCountAggregateInputType = {
    id?: true
    projectId?: true
    createdById?: true
    name?: true
    description?: true
    html?: true
    position?: true
    size?: true
    viewMode?: true
    history?: true
    tokens?: true
    data?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DesignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Design to aggregate.
     */
    where?: DesignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designs to fetch.
     */
    orderBy?: DesignOrderByWithRelationInput | DesignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Designs
    **/
    _count?: true | DesignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DesignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DesignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignMaxAggregateInputType
  }

  export type GetDesignAggregateType<T extends DesignAggregateArgs> = {
        [P in keyof T & keyof AggregateDesign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesign[P]>
      : GetScalarType<T[P], AggregateDesign[P]>
  }




  export type DesignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignWhereInput
    orderBy?: DesignOrderByWithAggregationInput | DesignOrderByWithAggregationInput[]
    by: DesignScalarFieldEnum[] | DesignScalarFieldEnum
    having?: DesignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignCountAggregateInputType | true
    _avg?: DesignAvgAggregateInputType
    _sum?: DesignSumAggregateInputType
    _min?: DesignMinAggregateInputType
    _max?: DesignMaxAggregateInputType
  }

  export type DesignGroupByOutputType = {
    id: string
    projectId: string
    createdById: string
    name: string
    description: string | null
    html: string
    position: JsonValue | null
    size: JsonValue | null
    viewMode: $Enums.DesignViewMode
    history: JsonValue | null
    tokens: JsonValue | null
    data: JsonValue | null
    version: number
    createdAt: Date
    updatedAt: Date
    _count: DesignCountAggregateOutputType | null
    _avg: DesignAvgAggregateOutputType | null
    _sum: DesignSumAggregateOutputType | null
    _min: DesignMinAggregateOutputType | null
    _max: DesignMaxAggregateOutputType | null
  }

  type GetDesignGroupByPayload<T extends DesignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignGroupByOutputType[P]>
            : GetScalarType<T[P], DesignGroupByOutputType[P]>
        }
      >
    >


  export type DesignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    description?: boolean
    html?: boolean
    position?: boolean
    size?: boolean
    viewMode?: boolean
    history?: boolean
    tokens?: boolean
    data?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    connectionsFrom?: boolean | Design$connectionsFromArgs<ExtArgs>
    connectionsTo?: boolean | Design$connectionsToArgs<ExtArgs>
    _count?: boolean | DesignCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["design"]>

  export type DesignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    description?: boolean
    html?: boolean
    position?: boolean
    size?: boolean
    viewMode?: boolean
    history?: boolean
    tokens?: boolean
    data?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["design"]>

  export type DesignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    description?: boolean
    html?: boolean
    position?: boolean
    size?: boolean
    viewMode?: boolean
    history?: boolean
    tokens?: boolean
    data?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["design"]>

  export type DesignSelectScalar = {
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    description?: boolean
    html?: boolean
    position?: boolean
    size?: boolean
    viewMode?: boolean
    history?: boolean
    tokens?: boolean
    data?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DesignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "createdById" | "name" | "description" | "html" | "position" | "size" | "viewMode" | "history" | "tokens" | "data" | "version" | "createdAt" | "updatedAt", ExtArgs["result"]["design"]>
  export type DesignInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    connectionsFrom?: boolean | Design$connectionsFromArgs<ExtArgs>
    connectionsTo?: boolean | Design$connectionsToArgs<ExtArgs>
    _count?: boolean | DesignCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DesignIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DesignIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DesignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Design"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
      connectionsFrom: Prisma.$DesignConnectionPayload<ExtArgs>[]
      connectionsTo: Prisma.$DesignConnectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      createdById: string
      name: string
      description: string | null
      html: string
      position: Prisma.JsonValue | null
      size: Prisma.JsonValue | null
      viewMode: $Enums.DesignViewMode
      history: Prisma.JsonValue | null
      tokens: Prisma.JsonValue | null
      data: Prisma.JsonValue | null
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["design"]>
    composites: {}
  }

  type DesignGetPayload<S extends boolean | null | undefined | DesignDefaultArgs> = $Result.GetResult<Prisma.$DesignPayload, S>

  type DesignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignCountAggregateInputType | true
    }

  export interface DesignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Design'], meta: { name: 'Design' } }
    /**
     * Find zero or one Design that matches the filter.
     * @param {DesignFindUniqueArgs} args - Arguments to find a Design
     * @example
     * // Get one Design
     * const design = await prisma.design.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignFindUniqueArgs>(args: SelectSubset<T, DesignFindUniqueArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Design that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignFindUniqueOrThrowArgs} args - Arguments to find a Design
     * @example
     * // Get one Design
     * const design = await prisma.design.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Design that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignFindFirstArgs} args - Arguments to find a Design
     * @example
     * // Get one Design
     * const design = await prisma.design.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignFindFirstArgs>(args?: SelectSubset<T, DesignFindFirstArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Design that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignFindFirstOrThrowArgs} args - Arguments to find a Design
     * @example
     * // Get one Design
     * const design = await prisma.design.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Designs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Designs
     * const designs = await prisma.design.findMany()
     * 
     * // Get first 10 Designs
     * const designs = await prisma.design.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designWithIdOnly = await prisma.design.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignFindManyArgs>(args?: SelectSubset<T, DesignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Design.
     * @param {DesignCreateArgs} args - Arguments to create a Design.
     * @example
     * // Create one Design
     * const Design = await prisma.design.create({
     *   data: {
     *     // ... data to create a Design
     *   }
     * })
     * 
     */
    create<T extends DesignCreateArgs>(args: SelectSubset<T, DesignCreateArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Designs.
     * @param {DesignCreateManyArgs} args - Arguments to create many Designs.
     * @example
     * // Create many Designs
     * const design = await prisma.design.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignCreateManyArgs>(args?: SelectSubset<T, DesignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Designs and returns the data saved in the database.
     * @param {DesignCreateManyAndReturnArgs} args - Arguments to create many Designs.
     * @example
     * // Create many Designs
     * const design = await prisma.design.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Designs and only return the `id`
     * const designWithIdOnly = await prisma.design.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Design.
     * @param {DesignDeleteArgs} args - Arguments to delete one Design.
     * @example
     * // Delete one Design
     * const Design = await prisma.design.delete({
     *   where: {
     *     // ... filter to delete one Design
     *   }
     * })
     * 
     */
    delete<T extends DesignDeleteArgs>(args: SelectSubset<T, DesignDeleteArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Design.
     * @param {DesignUpdateArgs} args - Arguments to update one Design.
     * @example
     * // Update one Design
     * const design = await prisma.design.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignUpdateArgs>(args: SelectSubset<T, DesignUpdateArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Designs.
     * @param {DesignDeleteManyArgs} args - Arguments to filter Designs to delete.
     * @example
     * // Delete a few Designs
     * const { count } = await prisma.design.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignDeleteManyArgs>(args?: SelectSubset<T, DesignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Designs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Designs
     * const design = await prisma.design.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignUpdateManyArgs>(args: SelectSubset<T, DesignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Designs and returns the data updated in the database.
     * @param {DesignUpdateManyAndReturnArgs} args - Arguments to update many Designs.
     * @example
     * // Update many Designs
     * const design = await prisma.design.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Designs and only return the `id`
     * const designWithIdOnly = await prisma.design.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DesignUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Design.
     * @param {DesignUpsertArgs} args - Arguments to update or create a Design.
     * @example
     * // Update or create a Design
     * const design = await prisma.design.upsert({
     *   create: {
     *     // ... data to create a Design
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Design we want to update
     *   }
     * })
     */
    upsert<T extends DesignUpsertArgs>(args: SelectSubset<T, DesignUpsertArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Designs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignCountArgs} args - Arguments to filter Designs to count.
     * @example
     * // Count the number of Designs
     * const count = await prisma.design.count({
     *   where: {
     *     // ... the filter for the Designs we want to count
     *   }
     * })
    **/
    count<T extends DesignCountArgs>(
      args?: Subset<T, DesignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Design.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DesignAggregateArgs>(args: Subset<T, DesignAggregateArgs>): Prisma.PrismaPromise<GetDesignAggregateType<T>>

    /**
     * Group by Design.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DesignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignGroupByArgs['orderBy'] }
        : { orderBy?: DesignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DesignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Design model
   */
  readonly fields: DesignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Design.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    connectionsFrom<T extends Design$connectionsFromArgs<ExtArgs> = {}>(args?: Subset<T, Design$connectionsFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    connectionsTo<T extends Design$connectionsToArgs<ExtArgs> = {}>(args?: Subset<T, Design$connectionsToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Design model
   */
  interface DesignFieldRefs {
    readonly id: FieldRef<"Design", 'String'>
    readonly projectId: FieldRef<"Design", 'String'>
    readonly createdById: FieldRef<"Design", 'String'>
    readonly name: FieldRef<"Design", 'String'>
    readonly description: FieldRef<"Design", 'String'>
    readonly html: FieldRef<"Design", 'String'>
    readonly position: FieldRef<"Design", 'Json'>
    readonly size: FieldRef<"Design", 'Json'>
    readonly viewMode: FieldRef<"Design", 'DesignViewMode'>
    readonly history: FieldRef<"Design", 'Json'>
    readonly tokens: FieldRef<"Design", 'Json'>
    readonly data: FieldRef<"Design", 'Json'>
    readonly version: FieldRef<"Design", 'Int'>
    readonly createdAt: FieldRef<"Design", 'DateTime'>
    readonly updatedAt: FieldRef<"Design", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Design findUnique
   */
  export type DesignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * Filter, which Design to fetch.
     */
    where: DesignWhereUniqueInput
  }

  /**
   * Design findUniqueOrThrow
   */
  export type DesignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * Filter, which Design to fetch.
     */
    where: DesignWhereUniqueInput
  }

  /**
   * Design findFirst
   */
  export type DesignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * Filter, which Design to fetch.
     */
    where?: DesignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designs to fetch.
     */
    orderBy?: DesignOrderByWithRelationInput | DesignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Designs.
     */
    cursor?: DesignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Designs.
     */
    distinct?: DesignScalarFieldEnum | DesignScalarFieldEnum[]
  }

  /**
   * Design findFirstOrThrow
   */
  export type DesignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * Filter, which Design to fetch.
     */
    where?: DesignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designs to fetch.
     */
    orderBy?: DesignOrderByWithRelationInput | DesignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Designs.
     */
    cursor?: DesignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Designs.
     */
    distinct?: DesignScalarFieldEnum | DesignScalarFieldEnum[]
  }

  /**
   * Design findMany
   */
  export type DesignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * Filter, which Designs to fetch.
     */
    where?: DesignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Designs to fetch.
     */
    orderBy?: DesignOrderByWithRelationInput | DesignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Designs.
     */
    cursor?: DesignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Designs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Designs.
     */
    skip?: number
    distinct?: DesignScalarFieldEnum | DesignScalarFieldEnum[]
  }

  /**
   * Design create
   */
  export type DesignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * The data needed to create a Design.
     */
    data: XOR<DesignCreateInput, DesignUncheckedCreateInput>
  }

  /**
   * Design createMany
   */
  export type DesignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Designs.
     */
    data: DesignCreateManyInput | DesignCreateManyInput[]
  }

  /**
   * Design createManyAndReturn
   */
  export type DesignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * The data used to create many Designs.
     */
    data: DesignCreateManyInput | DesignCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Design update
   */
  export type DesignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * The data needed to update a Design.
     */
    data: XOR<DesignUpdateInput, DesignUncheckedUpdateInput>
    /**
     * Choose, which Design to update.
     */
    where: DesignWhereUniqueInput
  }

  /**
   * Design updateMany
   */
  export type DesignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Designs.
     */
    data: XOR<DesignUpdateManyMutationInput, DesignUncheckedUpdateManyInput>
    /**
     * Filter which Designs to update
     */
    where?: DesignWhereInput
    /**
     * Limit how many Designs to update.
     */
    limit?: number
  }

  /**
   * Design updateManyAndReturn
   */
  export type DesignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * The data used to update Designs.
     */
    data: XOR<DesignUpdateManyMutationInput, DesignUncheckedUpdateManyInput>
    /**
     * Filter which Designs to update
     */
    where?: DesignWhereInput
    /**
     * Limit how many Designs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Design upsert
   */
  export type DesignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * The filter to search for the Design to update in case it exists.
     */
    where: DesignWhereUniqueInput
    /**
     * In case the Design found by the `where` argument doesn't exist, create a new Design with this data.
     */
    create: XOR<DesignCreateInput, DesignUncheckedCreateInput>
    /**
     * In case the Design was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignUpdateInput, DesignUncheckedUpdateInput>
  }

  /**
   * Design delete
   */
  export type DesignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
    /**
     * Filter which Design to delete.
     */
    where: DesignWhereUniqueInput
  }

  /**
   * Design deleteMany
   */
  export type DesignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Designs to delete
     */
    where?: DesignWhereInput
    /**
     * Limit how many Designs to delete.
     */
    limit?: number
  }

  /**
   * Design.connectionsFrom
   */
  export type Design$connectionsFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    where?: DesignConnectionWhereInput
    orderBy?: DesignConnectionOrderByWithRelationInput | DesignConnectionOrderByWithRelationInput[]
    cursor?: DesignConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignConnectionScalarFieldEnum | DesignConnectionScalarFieldEnum[]
  }

  /**
   * Design.connectionsTo
   */
  export type Design$connectionsToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    where?: DesignConnectionWhereInput
    orderBy?: DesignConnectionOrderByWithRelationInput | DesignConnectionOrderByWithRelationInput[]
    cursor?: DesignConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DesignConnectionScalarFieldEnum | DesignConnectionScalarFieldEnum[]
  }

  /**
   * Design without action
   */
  export type DesignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Design
     */
    select?: DesignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Design
     */
    omit?: DesignOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignInclude<ExtArgs> | null
  }


  /**
   * Model Component
   */

  export type AggregateComponent = {
    _count: ComponentCountAggregateOutputType | null
    _min: ComponentMinAggregateOutputType | null
    _max: ComponentMaxAggregateOutputType | null
  }

  export type ComponentMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    createdById: string | null
    name: string | null
    html: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComponentMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    createdById: string | null
    name: string | null
    html: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComponentCountAggregateOutputType = {
    id: number
    projectId: number
    createdById: number
    name: number
    html: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ComponentMinAggregateInputType = {
    id?: true
    projectId?: true
    createdById?: true
    name?: true
    html?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComponentMaxAggregateInputType = {
    id?: true
    projectId?: true
    createdById?: true
    name?: true
    html?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComponentCountAggregateInputType = {
    id?: true
    projectId?: true
    createdById?: true
    name?: true
    html?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ComponentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Component to aggregate.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Components
    **/
    _count?: true | ComponentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComponentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComponentMaxAggregateInputType
  }

  export type GetComponentAggregateType<T extends ComponentAggregateArgs> = {
        [P in keyof T & keyof AggregateComponent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComponent[P]>
      : GetScalarType<T[P], AggregateComponent[P]>
  }




  export type ComponentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComponentWhereInput
    orderBy?: ComponentOrderByWithAggregationInput | ComponentOrderByWithAggregationInput[]
    by: ComponentScalarFieldEnum[] | ComponentScalarFieldEnum
    having?: ComponentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComponentCountAggregateInputType | true
    _min?: ComponentMinAggregateInputType
    _max?: ComponentMaxAggregateInputType
  }

  export type ComponentGroupByOutputType = {
    id: string
    projectId: string
    createdById: string
    name: string
    html: string
    createdAt: Date
    updatedAt: Date
    _count: ComponentCountAggregateOutputType | null
    _min: ComponentMinAggregateOutputType | null
    _max: ComponentMaxAggregateOutputType | null
  }

  type GetComponentGroupByPayload<T extends ComponentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComponentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComponentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComponentGroupByOutputType[P]>
            : GetScalarType<T[P], ComponentGroupByOutputType[P]>
        }
      >
    >


  export type ComponentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    html?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["component"]>

  export type ComponentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    html?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["component"]>

  export type ComponentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    html?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["component"]>

  export type ComponentSelectScalar = {
    id?: boolean
    projectId?: boolean
    createdById?: boolean
    name?: boolean
    html?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ComponentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "createdById" | "name" | "html" | "createdAt" | "updatedAt", ExtArgs["result"]["component"]>
  export type ComponentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ComponentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ComponentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ComponentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Component"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      createdById: string
      name: string
      html: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["component"]>
    composites: {}
  }

  type ComponentGetPayload<S extends boolean | null | undefined | ComponentDefaultArgs> = $Result.GetResult<Prisma.$ComponentPayload, S>

  type ComponentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComponentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComponentCountAggregateInputType | true
    }

  export interface ComponentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Component'], meta: { name: 'Component' } }
    /**
     * Find zero or one Component that matches the filter.
     * @param {ComponentFindUniqueArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComponentFindUniqueArgs>(args: SelectSubset<T, ComponentFindUniqueArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Component that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComponentFindUniqueOrThrowArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComponentFindUniqueOrThrowArgs>(args: SelectSubset<T, ComponentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Component that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentFindFirstArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComponentFindFirstArgs>(args?: SelectSubset<T, ComponentFindFirstArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Component that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentFindFirstOrThrowArgs} args - Arguments to find a Component
     * @example
     * // Get one Component
     * const component = await prisma.component.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComponentFindFirstOrThrowArgs>(args?: SelectSubset<T, ComponentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Components that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Components
     * const components = await prisma.component.findMany()
     * 
     * // Get first 10 Components
     * const components = await prisma.component.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const componentWithIdOnly = await prisma.component.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComponentFindManyArgs>(args?: SelectSubset<T, ComponentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Component.
     * @param {ComponentCreateArgs} args - Arguments to create a Component.
     * @example
     * // Create one Component
     * const Component = await prisma.component.create({
     *   data: {
     *     // ... data to create a Component
     *   }
     * })
     * 
     */
    create<T extends ComponentCreateArgs>(args: SelectSubset<T, ComponentCreateArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Components.
     * @param {ComponentCreateManyArgs} args - Arguments to create many Components.
     * @example
     * // Create many Components
     * const component = await prisma.component.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComponentCreateManyArgs>(args?: SelectSubset<T, ComponentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Components and returns the data saved in the database.
     * @param {ComponentCreateManyAndReturnArgs} args - Arguments to create many Components.
     * @example
     * // Create many Components
     * const component = await prisma.component.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Components and only return the `id`
     * const componentWithIdOnly = await prisma.component.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComponentCreateManyAndReturnArgs>(args?: SelectSubset<T, ComponentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Component.
     * @param {ComponentDeleteArgs} args - Arguments to delete one Component.
     * @example
     * // Delete one Component
     * const Component = await prisma.component.delete({
     *   where: {
     *     // ... filter to delete one Component
     *   }
     * })
     * 
     */
    delete<T extends ComponentDeleteArgs>(args: SelectSubset<T, ComponentDeleteArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Component.
     * @param {ComponentUpdateArgs} args - Arguments to update one Component.
     * @example
     * // Update one Component
     * const component = await prisma.component.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComponentUpdateArgs>(args: SelectSubset<T, ComponentUpdateArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Components.
     * @param {ComponentDeleteManyArgs} args - Arguments to filter Components to delete.
     * @example
     * // Delete a few Components
     * const { count } = await prisma.component.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComponentDeleteManyArgs>(args?: SelectSubset<T, ComponentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Components
     * const component = await prisma.component.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComponentUpdateManyArgs>(args: SelectSubset<T, ComponentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Components and returns the data updated in the database.
     * @param {ComponentUpdateManyAndReturnArgs} args - Arguments to update many Components.
     * @example
     * // Update many Components
     * const component = await prisma.component.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Components and only return the `id`
     * const componentWithIdOnly = await prisma.component.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComponentUpdateManyAndReturnArgs>(args: SelectSubset<T, ComponentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Component.
     * @param {ComponentUpsertArgs} args - Arguments to update or create a Component.
     * @example
     * // Update or create a Component
     * const component = await prisma.component.upsert({
     *   create: {
     *     // ... data to create a Component
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Component we want to update
     *   }
     * })
     */
    upsert<T extends ComponentUpsertArgs>(args: SelectSubset<T, ComponentUpsertArgs<ExtArgs>>): Prisma__ComponentClient<$Result.GetResult<Prisma.$ComponentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Components.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentCountArgs} args - Arguments to filter Components to count.
     * @example
     * // Count the number of Components
     * const count = await prisma.component.count({
     *   where: {
     *     // ... the filter for the Components we want to count
     *   }
     * })
    **/
    count<T extends ComponentCountArgs>(
      args?: Subset<T, ComponentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComponentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Component.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComponentAggregateArgs>(args: Subset<T, ComponentAggregateArgs>): Prisma.PrismaPromise<GetComponentAggregateType<T>>

    /**
     * Group by Component.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComponentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComponentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComponentGroupByArgs['orderBy'] }
        : { orderBy?: ComponentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComponentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComponentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Component model
   */
  readonly fields: ComponentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Component.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComponentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Component model
   */
  interface ComponentFieldRefs {
    readonly id: FieldRef<"Component", 'String'>
    readonly projectId: FieldRef<"Component", 'String'>
    readonly createdById: FieldRef<"Component", 'String'>
    readonly name: FieldRef<"Component", 'String'>
    readonly html: FieldRef<"Component", 'String'>
    readonly createdAt: FieldRef<"Component", 'DateTime'>
    readonly updatedAt: FieldRef<"Component", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Component findUnique
   */
  export type ComponentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component findUniqueOrThrow
   */
  export type ComponentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component findFirst
   */
  export type ComponentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Components.
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Components.
     */
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * Component findFirstOrThrow
   */
  export type ComponentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * Filter, which Component to fetch.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Components.
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Components.
     */
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * Component findMany
   */
  export type ComponentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * Filter, which Components to fetch.
     */
    where?: ComponentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Components to fetch.
     */
    orderBy?: ComponentOrderByWithRelationInput | ComponentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Components.
     */
    cursor?: ComponentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Components from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Components.
     */
    skip?: number
    distinct?: ComponentScalarFieldEnum | ComponentScalarFieldEnum[]
  }

  /**
   * Component create
   */
  export type ComponentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * The data needed to create a Component.
     */
    data: XOR<ComponentCreateInput, ComponentUncheckedCreateInput>
  }

  /**
   * Component createMany
   */
  export type ComponentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Components.
     */
    data: ComponentCreateManyInput | ComponentCreateManyInput[]
  }

  /**
   * Component createManyAndReturn
   */
  export type ComponentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * The data used to create many Components.
     */
    data: ComponentCreateManyInput | ComponentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Component update
   */
  export type ComponentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * The data needed to update a Component.
     */
    data: XOR<ComponentUpdateInput, ComponentUncheckedUpdateInput>
    /**
     * Choose, which Component to update.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component updateMany
   */
  export type ComponentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Components.
     */
    data: XOR<ComponentUpdateManyMutationInput, ComponentUncheckedUpdateManyInput>
    /**
     * Filter which Components to update
     */
    where?: ComponentWhereInput
    /**
     * Limit how many Components to update.
     */
    limit?: number
  }

  /**
   * Component updateManyAndReturn
   */
  export type ComponentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * The data used to update Components.
     */
    data: XOR<ComponentUpdateManyMutationInput, ComponentUncheckedUpdateManyInput>
    /**
     * Filter which Components to update
     */
    where?: ComponentWhereInput
    /**
     * Limit how many Components to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Component upsert
   */
  export type ComponentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * The filter to search for the Component to update in case it exists.
     */
    where: ComponentWhereUniqueInput
    /**
     * In case the Component found by the `where` argument doesn't exist, create a new Component with this data.
     */
    create: XOR<ComponentCreateInput, ComponentUncheckedCreateInput>
    /**
     * In case the Component was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComponentUpdateInput, ComponentUncheckedUpdateInput>
  }

  /**
   * Component delete
   */
  export type ComponentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
    /**
     * Filter which Component to delete.
     */
    where: ComponentWhereUniqueInput
  }

  /**
   * Component deleteMany
   */
  export type ComponentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Components to delete
     */
    where?: ComponentWhereInput
    /**
     * Limit how many Components to delete.
     */
    limit?: number
  }

  /**
   * Component without action
   */
  export type ComponentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Component
     */
    select?: ComponentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Component
     */
    omit?: ComponentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComponentInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model DesignConnection
   */

  export type AggregateDesignConnection = {
    _count: DesignConnectionCountAggregateOutputType | null
    _min: DesignConnectionMinAggregateOutputType | null
    _max: DesignConnectionMaxAggregateOutputType | null
  }

  export type DesignConnectionMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    fromDesignId: string | null
    toDesignId: string | null
    fromPosition: $Enums.ConnectionPosition | null
    toPosition: $Enums.ConnectionPosition | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DesignConnectionMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    fromDesignId: string | null
    toDesignId: string | null
    fromPosition: $Enums.ConnectionPosition | null
    toPosition: $Enums.ConnectionPosition | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DesignConnectionCountAggregateOutputType = {
    id: number
    projectId: number
    fromDesignId: number
    toDesignId: number
    fromPosition: number
    toPosition: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DesignConnectionMinAggregateInputType = {
    id?: true
    projectId?: true
    fromDesignId?: true
    toDesignId?: true
    fromPosition?: true
    toPosition?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DesignConnectionMaxAggregateInputType = {
    id?: true
    projectId?: true
    fromDesignId?: true
    toDesignId?: true
    fromPosition?: true
    toPosition?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DesignConnectionCountAggregateInputType = {
    id?: true
    projectId?: true
    fromDesignId?: true
    toDesignId?: true
    fromPosition?: true
    toPosition?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DesignConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignConnection to aggregate.
     */
    where?: DesignConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignConnections to fetch.
     */
    orderBy?: DesignConnectionOrderByWithRelationInput | DesignConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DesignConnections
    **/
    _count?: true | DesignConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignConnectionMaxAggregateInputType
  }

  export type GetDesignConnectionAggregateType<T extends DesignConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateDesignConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesignConnection[P]>
      : GetScalarType<T[P], AggregateDesignConnection[P]>
  }




  export type DesignConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignConnectionWhereInput
    orderBy?: DesignConnectionOrderByWithAggregationInput | DesignConnectionOrderByWithAggregationInput[]
    by: DesignConnectionScalarFieldEnum[] | DesignConnectionScalarFieldEnum
    having?: DesignConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignConnectionCountAggregateInputType | true
    _min?: DesignConnectionMinAggregateInputType
    _max?: DesignConnectionMaxAggregateInputType
  }

  export type DesignConnectionGroupByOutputType = {
    id: string
    projectId: string
    fromDesignId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt: Date
    updatedAt: Date
    _count: DesignConnectionCountAggregateOutputType | null
    _min: DesignConnectionMinAggregateOutputType | null
    _max: DesignConnectionMaxAggregateOutputType | null
  }

  type GetDesignConnectionGroupByPayload<T extends DesignConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], DesignConnectionGroupByOutputType[P]>
        }
      >
    >


  export type DesignConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fromDesignId?: boolean
    toDesignId?: boolean
    fromPosition?: boolean
    toPosition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromDesign?: boolean | DesignDefaultArgs<ExtArgs>
    toDesign?: boolean | DesignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designConnection"]>

  export type DesignConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fromDesignId?: boolean
    toDesignId?: boolean
    fromPosition?: boolean
    toPosition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromDesign?: boolean | DesignDefaultArgs<ExtArgs>
    toDesign?: boolean | DesignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designConnection"]>

  export type DesignConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fromDesignId?: boolean
    toDesignId?: boolean
    fromPosition?: boolean
    toPosition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromDesign?: boolean | DesignDefaultArgs<ExtArgs>
    toDesign?: boolean | DesignDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designConnection"]>

  export type DesignConnectionSelectScalar = {
    id?: boolean
    projectId?: boolean
    fromDesignId?: boolean
    toDesignId?: boolean
    fromPosition?: boolean
    toPosition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DesignConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "fromDesignId" | "toDesignId" | "fromPosition" | "toPosition" | "createdAt" | "updatedAt", ExtArgs["result"]["designConnection"]>
  export type DesignConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromDesign?: boolean | DesignDefaultArgs<ExtArgs>
    toDesign?: boolean | DesignDefaultArgs<ExtArgs>
  }
  export type DesignConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromDesign?: boolean | DesignDefaultArgs<ExtArgs>
    toDesign?: boolean | DesignDefaultArgs<ExtArgs>
  }
  export type DesignConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    fromDesign?: boolean | DesignDefaultArgs<ExtArgs>
    toDesign?: boolean | DesignDefaultArgs<ExtArgs>
  }

  export type $DesignConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DesignConnection"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      fromDesign: Prisma.$DesignPayload<ExtArgs>
      toDesign: Prisma.$DesignPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      fromDesignId: string
      toDesignId: string
      fromPosition: $Enums.ConnectionPosition
      toPosition: $Enums.ConnectionPosition
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["designConnection"]>
    composites: {}
  }

  type DesignConnectionGetPayload<S extends boolean | null | undefined | DesignConnectionDefaultArgs> = $Result.GetResult<Prisma.$DesignConnectionPayload, S>

  type DesignConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignConnectionCountAggregateInputType | true
    }

  export interface DesignConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DesignConnection'], meta: { name: 'DesignConnection' } }
    /**
     * Find zero or one DesignConnection that matches the filter.
     * @param {DesignConnectionFindUniqueArgs} args - Arguments to find a DesignConnection
     * @example
     * // Get one DesignConnection
     * const designConnection = await prisma.designConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignConnectionFindUniqueArgs>(args: SelectSubset<T, DesignConnectionFindUniqueArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DesignConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignConnectionFindUniqueOrThrowArgs} args - Arguments to find a DesignConnection
     * @example
     * // Get one DesignConnection
     * const designConnection = await prisma.designConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignConnectionFindFirstArgs} args - Arguments to find a DesignConnection
     * @example
     * // Get one DesignConnection
     * const designConnection = await prisma.designConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignConnectionFindFirstArgs>(args?: SelectSubset<T, DesignConnectionFindFirstArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignConnectionFindFirstOrThrowArgs} args - Arguments to find a DesignConnection
     * @example
     * // Get one DesignConnection
     * const designConnection = await prisma.designConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DesignConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DesignConnections
     * const designConnections = await prisma.designConnection.findMany()
     * 
     * // Get first 10 DesignConnections
     * const designConnections = await prisma.designConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designConnectionWithIdOnly = await prisma.designConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignConnectionFindManyArgs>(args?: SelectSubset<T, DesignConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DesignConnection.
     * @param {DesignConnectionCreateArgs} args - Arguments to create a DesignConnection.
     * @example
     * // Create one DesignConnection
     * const DesignConnection = await prisma.designConnection.create({
     *   data: {
     *     // ... data to create a DesignConnection
     *   }
     * })
     * 
     */
    create<T extends DesignConnectionCreateArgs>(args: SelectSubset<T, DesignConnectionCreateArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DesignConnections.
     * @param {DesignConnectionCreateManyArgs} args - Arguments to create many DesignConnections.
     * @example
     * // Create many DesignConnections
     * const designConnection = await prisma.designConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignConnectionCreateManyArgs>(args?: SelectSubset<T, DesignConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DesignConnections and returns the data saved in the database.
     * @param {DesignConnectionCreateManyAndReturnArgs} args - Arguments to create many DesignConnections.
     * @example
     * // Create many DesignConnections
     * const designConnection = await prisma.designConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DesignConnections and only return the `id`
     * const designConnectionWithIdOnly = await prisma.designConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DesignConnection.
     * @param {DesignConnectionDeleteArgs} args - Arguments to delete one DesignConnection.
     * @example
     * // Delete one DesignConnection
     * const DesignConnection = await prisma.designConnection.delete({
     *   where: {
     *     // ... filter to delete one DesignConnection
     *   }
     * })
     * 
     */
    delete<T extends DesignConnectionDeleteArgs>(args: SelectSubset<T, DesignConnectionDeleteArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DesignConnection.
     * @param {DesignConnectionUpdateArgs} args - Arguments to update one DesignConnection.
     * @example
     * // Update one DesignConnection
     * const designConnection = await prisma.designConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignConnectionUpdateArgs>(args: SelectSubset<T, DesignConnectionUpdateArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DesignConnections.
     * @param {DesignConnectionDeleteManyArgs} args - Arguments to filter DesignConnections to delete.
     * @example
     * // Delete a few DesignConnections
     * const { count } = await prisma.designConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignConnectionDeleteManyArgs>(args?: SelectSubset<T, DesignConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DesignConnections
     * const designConnection = await prisma.designConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignConnectionUpdateManyArgs>(args: SelectSubset<T, DesignConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignConnections and returns the data updated in the database.
     * @param {DesignConnectionUpdateManyAndReturnArgs} args - Arguments to update many DesignConnections.
     * @example
     * // Update many DesignConnections
     * const designConnection = await prisma.designConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DesignConnections and only return the `id`
     * const designConnectionWithIdOnly = await prisma.designConnection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DesignConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DesignConnection.
     * @param {DesignConnectionUpsertArgs} args - Arguments to update or create a DesignConnection.
     * @example
     * // Update or create a DesignConnection
     * const designConnection = await prisma.designConnection.upsert({
     *   create: {
     *     // ... data to create a DesignConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DesignConnection we want to update
     *   }
     * })
     */
    upsert<T extends DesignConnectionUpsertArgs>(args: SelectSubset<T, DesignConnectionUpsertArgs<ExtArgs>>): Prisma__DesignConnectionClient<$Result.GetResult<Prisma.$DesignConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DesignConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignConnectionCountArgs} args - Arguments to filter DesignConnections to count.
     * @example
     * // Count the number of DesignConnections
     * const count = await prisma.designConnection.count({
     *   where: {
     *     // ... the filter for the DesignConnections we want to count
     *   }
     * })
    **/
    count<T extends DesignConnectionCountArgs>(
      args?: Subset<T, DesignConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DesignConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DesignConnectionAggregateArgs>(args: Subset<T, DesignConnectionAggregateArgs>): Prisma.PrismaPromise<GetDesignConnectionAggregateType<T>>

    /**
     * Group by DesignConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DesignConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignConnectionGroupByArgs['orderBy'] }
        : { orderBy?: DesignConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DesignConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DesignConnection model
   */
  readonly fields: DesignConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DesignConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fromDesign<T extends DesignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DesignDefaultArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toDesign<T extends DesignDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DesignDefaultArgs<ExtArgs>>): Prisma__DesignClient<$Result.GetResult<Prisma.$DesignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DesignConnection model
   */
  interface DesignConnectionFieldRefs {
    readonly id: FieldRef<"DesignConnection", 'String'>
    readonly projectId: FieldRef<"DesignConnection", 'String'>
    readonly fromDesignId: FieldRef<"DesignConnection", 'String'>
    readonly toDesignId: FieldRef<"DesignConnection", 'String'>
    readonly fromPosition: FieldRef<"DesignConnection", 'ConnectionPosition'>
    readonly toPosition: FieldRef<"DesignConnection", 'ConnectionPosition'>
    readonly createdAt: FieldRef<"DesignConnection", 'DateTime'>
    readonly updatedAt: FieldRef<"DesignConnection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DesignConnection findUnique
   */
  export type DesignConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DesignConnection to fetch.
     */
    where: DesignConnectionWhereUniqueInput
  }

  /**
   * DesignConnection findUniqueOrThrow
   */
  export type DesignConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DesignConnection to fetch.
     */
    where: DesignConnectionWhereUniqueInput
  }

  /**
   * DesignConnection findFirst
   */
  export type DesignConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DesignConnection to fetch.
     */
    where?: DesignConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignConnections to fetch.
     */
    orderBy?: DesignConnectionOrderByWithRelationInput | DesignConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignConnections.
     */
    cursor?: DesignConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignConnections.
     */
    distinct?: DesignConnectionScalarFieldEnum | DesignConnectionScalarFieldEnum[]
  }

  /**
   * DesignConnection findFirstOrThrow
   */
  export type DesignConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DesignConnection to fetch.
     */
    where?: DesignConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignConnections to fetch.
     */
    orderBy?: DesignConnectionOrderByWithRelationInput | DesignConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignConnections.
     */
    cursor?: DesignConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignConnections.
     */
    distinct?: DesignConnectionScalarFieldEnum | DesignConnectionScalarFieldEnum[]
  }

  /**
   * DesignConnection findMany
   */
  export type DesignConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DesignConnections to fetch.
     */
    where?: DesignConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignConnections to fetch.
     */
    orderBy?: DesignConnectionOrderByWithRelationInput | DesignConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DesignConnections.
     */
    cursor?: DesignConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignConnections.
     */
    skip?: number
    distinct?: DesignConnectionScalarFieldEnum | DesignConnectionScalarFieldEnum[]
  }

  /**
   * DesignConnection create
   */
  export type DesignConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a DesignConnection.
     */
    data: XOR<DesignConnectionCreateInput, DesignConnectionUncheckedCreateInput>
  }

  /**
   * DesignConnection createMany
   */
  export type DesignConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DesignConnections.
     */
    data: DesignConnectionCreateManyInput | DesignConnectionCreateManyInput[]
  }

  /**
   * DesignConnection createManyAndReturn
   */
  export type DesignConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many DesignConnections.
     */
    data: DesignConnectionCreateManyInput | DesignConnectionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignConnection update
   */
  export type DesignConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a DesignConnection.
     */
    data: XOR<DesignConnectionUpdateInput, DesignConnectionUncheckedUpdateInput>
    /**
     * Choose, which DesignConnection to update.
     */
    where: DesignConnectionWhereUniqueInput
  }

  /**
   * DesignConnection updateMany
   */
  export type DesignConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DesignConnections.
     */
    data: XOR<DesignConnectionUpdateManyMutationInput, DesignConnectionUncheckedUpdateManyInput>
    /**
     * Filter which DesignConnections to update
     */
    where?: DesignConnectionWhereInput
    /**
     * Limit how many DesignConnections to update.
     */
    limit?: number
  }

  /**
   * DesignConnection updateManyAndReturn
   */
  export type DesignConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * The data used to update DesignConnections.
     */
    data: XOR<DesignConnectionUpdateManyMutationInput, DesignConnectionUncheckedUpdateManyInput>
    /**
     * Filter which DesignConnections to update
     */
    where?: DesignConnectionWhereInput
    /**
     * Limit how many DesignConnections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignConnection upsert
   */
  export type DesignConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the DesignConnection to update in case it exists.
     */
    where: DesignConnectionWhereUniqueInput
    /**
     * In case the DesignConnection found by the `where` argument doesn't exist, create a new DesignConnection with this data.
     */
    create: XOR<DesignConnectionCreateInput, DesignConnectionUncheckedCreateInput>
    /**
     * In case the DesignConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignConnectionUpdateInput, DesignConnectionUncheckedUpdateInput>
  }

  /**
   * DesignConnection delete
   */
  export type DesignConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
    /**
     * Filter which DesignConnection to delete.
     */
    where: DesignConnectionWhereUniqueInput
  }

  /**
   * DesignConnection deleteMany
   */
  export type DesignConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignConnections to delete
     */
    where?: DesignConnectionWhereInput
    /**
     * Limit how many DesignConnections to delete.
     */
    limit?: number
  }

  /**
   * DesignConnection without action
   */
  export type DesignConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignConnection
     */
    select?: DesignConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignConnection
     */
    omit?: DesignConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignConnectionInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model DesignSystem
   */

  export type AggregateDesignSystem = {
    _count: DesignSystemCountAggregateOutputType | null
    _min: DesignSystemMinAggregateOutputType | null
    _max: DesignSystemMaxAggregateOutputType | null
  }

  export type DesignSystemMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    description: string | null
    type: string | null
    presetName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DesignSystemMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    description: string | null
    type: string | null
    presetName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DesignSystemCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    description: number
    colors: number
    typography: number
    spacing: number
    radius: number
    type: number
    presetName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DesignSystemMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    description?: true
    type?: true
    presetName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DesignSystemMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    description?: true
    type?: true
    presetName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DesignSystemCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    description?: true
    colors?: true
    typography?: true
    spacing?: true
    radius?: true
    type?: true
    presetName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DesignSystemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignSystem to aggregate.
     */
    where?: DesignSystemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSystems to fetch.
     */
    orderBy?: DesignSystemOrderByWithRelationInput | DesignSystemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DesignSystemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSystems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSystems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DesignSystems
    **/
    _count?: true | DesignSystemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DesignSystemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DesignSystemMaxAggregateInputType
  }

  export type GetDesignSystemAggregateType<T extends DesignSystemAggregateArgs> = {
        [P in keyof T & keyof AggregateDesignSystem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDesignSystem[P]>
      : GetScalarType<T[P], AggregateDesignSystem[P]>
  }




  export type DesignSystemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DesignSystemWhereInput
    orderBy?: DesignSystemOrderByWithAggregationInput | DesignSystemOrderByWithAggregationInput[]
    by: DesignSystemScalarFieldEnum[] | DesignSystemScalarFieldEnum
    having?: DesignSystemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DesignSystemCountAggregateInputType | true
    _min?: DesignSystemMinAggregateInputType
    _max?: DesignSystemMaxAggregateInputType
  }

  export type DesignSystemGroupByOutputType = {
    id: string
    projectId: string
    name: string
    description: string | null
    colors: JsonValue
    typography: JsonValue
    spacing: JsonValue
    radius: JsonValue
    type: string
    presetName: string | null
    createdAt: Date
    updatedAt: Date
    _count: DesignSystemCountAggregateOutputType | null
    _min: DesignSystemMinAggregateOutputType | null
    _max: DesignSystemMaxAggregateOutputType | null
  }

  type GetDesignSystemGroupByPayload<T extends DesignSystemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DesignSystemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DesignSystemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DesignSystemGroupByOutputType[P]>
            : GetScalarType<T[P], DesignSystemGroupByOutputType[P]>
        }
      >
    >


  export type DesignSystemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    typography?: boolean
    spacing?: boolean
    radius?: boolean
    type?: boolean
    presetName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designSystem"]>

  export type DesignSystemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    typography?: boolean
    spacing?: boolean
    radius?: boolean
    type?: boolean
    presetName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designSystem"]>

  export type DesignSystemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    typography?: boolean
    spacing?: boolean
    radius?: boolean
    type?: boolean
    presetName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["designSystem"]>

  export type DesignSystemSelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    description?: boolean
    colors?: boolean
    typography?: boolean
    spacing?: boolean
    radius?: boolean
    type?: boolean
    presetName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DesignSystemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "name" | "description" | "colors" | "typography" | "spacing" | "radius" | "type" | "presetName" | "createdAt" | "updatedAt", ExtArgs["result"]["designSystem"]>
  export type DesignSystemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type DesignSystemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type DesignSystemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $DesignSystemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DesignSystem"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      description: string | null
      colors: Prisma.JsonValue
      typography: Prisma.JsonValue
      spacing: Prisma.JsonValue
      radius: Prisma.JsonValue
      type: string
      presetName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["designSystem"]>
    composites: {}
  }

  type DesignSystemGetPayload<S extends boolean | null | undefined | DesignSystemDefaultArgs> = $Result.GetResult<Prisma.$DesignSystemPayload, S>

  type DesignSystemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DesignSystemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DesignSystemCountAggregateInputType | true
    }

  export interface DesignSystemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DesignSystem'], meta: { name: 'DesignSystem' } }
    /**
     * Find zero or one DesignSystem that matches the filter.
     * @param {DesignSystemFindUniqueArgs} args - Arguments to find a DesignSystem
     * @example
     * // Get one DesignSystem
     * const designSystem = await prisma.designSystem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DesignSystemFindUniqueArgs>(args: SelectSubset<T, DesignSystemFindUniqueArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DesignSystem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DesignSystemFindUniqueOrThrowArgs} args - Arguments to find a DesignSystem
     * @example
     * // Get one DesignSystem
     * const designSystem = await prisma.designSystem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DesignSystemFindUniqueOrThrowArgs>(args: SelectSubset<T, DesignSystemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignSystem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSystemFindFirstArgs} args - Arguments to find a DesignSystem
     * @example
     * // Get one DesignSystem
     * const designSystem = await prisma.designSystem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DesignSystemFindFirstArgs>(args?: SelectSubset<T, DesignSystemFindFirstArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DesignSystem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSystemFindFirstOrThrowArgs} args - Arguments to find a DesignSystem
     * @example
     * // Get one DesignSystem
     * const designSystem = await prisma.designSystem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DesignSystemFindFirstOrThrowArgs>(args?: SelectSubset<T, DesignSystemFindFirstOrThrowArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DesignSystems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSystemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DesignSystems
     * const designSystems = await prisma.designSystem.findMany()
     * 
     * // Get first 10 DesignSystems
     * const designSystems = await prisma.designSystem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const designSystemWithIdOnly = await prisma.designSystem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DesignSystemFindManyArgs>(args?: SelectSubset<T, DesignSystemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DesignSystem.
     * @param {DesignSystemCreateArgs} args - Arguments to create a DesignSystem.
     * @example
     * // Create one DesignSystem
     * const DesignSystem = await prisma.designSystem.create({
     *   data: {
     *     // ... data to create a DesignSystem
     *   }
     * })
     * 
     */
    create<T extends DesignSystemCreateArgs>(args: SelectSubset<T, DesignSystemCreateArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DesignSystems.
     * @param {DesignSystemCreateManyArgs} args - Arguments to create many DesignSystems.
     * @example
     * // Create many DesignSystems
     * const designSystem = await prisma.designSystem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DesignSystemCreateManyArgs>(args?: SelectSubset<T, DesignSystemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DesignSystems and returns the data saved in the database.
     * @param {DesignSystemCreateManyAndReturnArgs} args - Arguments to create many DesignSystems.
     * @example
     * // Create many DesignSystems
     * const designSystem = await prisma.designSystem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DesignSystems and only return the `id`
     * const designSystemWithIdOnly = await prisma.designSystem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DesignSystemCreateManyAndReturnArgs>(args?: SelectSubset<T, DesignSystemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DesignSystem.
     * @param {DesignSystemDeleteArgs} args - Arguments to delete one DesignSystem.
     * @example
     * // Delete one DesignSystem
     * const DesignSystem = await prisma.designSystem.delete({
     *   where: {
     *     // ... filter to delete one DesignSystem
     *   }
     * })
     * 
     */
    delete<T extends DesignSystemDeleteArgs>(args: SelectSubset<T, DesignSystemDeleteArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DesignSystem.
     * @param {DesignSystemUpdateArgs} args - Arguments to update one DesignSystem.
     * @example
     * // Update one DesignSystem
     * const designSystem = await prisma.designSystem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DesignSystemUpdateArgs>(args: SelectSubset<T, DesignSystemUpdateArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DesignSystems.
     * @param {DesignSystemDeleteManyArgs} args - Arguments to filter DesignSystems to delete.
     * @example
     * // Delete a few DesignSystems
     * const { count } = await prisma.designSystem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DesignSystemDeleteManyArgs>(args?: SelectSubset<T, DesignSystemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignSystems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSystemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DesignSystems
     * const designSystem = await prisma.designSystem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DesignSystemUpdateManyArgs>(args: SelectSubset<T, DesignSystemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DesignSystems and returns the data updated in the database.
     * @param {DesignSystemUpdateManyAndReturnArgs} args - Arguments to update many DesignSystems.
     * @example
     * // Update many DesignSystems
     * const designSystem = await prisma.designSystem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DesignSystems and only return the `id`
     * const designSystemWithIdOnly = await prisma.designSystem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DesignSystemUpdateManyAndReturnArgs>(args: SelectSubset<T, DesignSystemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DesignSystem.
     * @param {DesignSystemUpsertArgs} args - Arguments to update or create a DesignSystem.
     * @example
     * // Update or create a DesignSystem
     * const designSystem = await prisma.designSystem.upsert({
     *   create: {
     *     // ... data to create a DesignSystem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DesignSystem we want to update
     *   }
     * })
     */
    upsert<T extends DesignSystemUpsertArgs>(args: SelectSubset<T, DesignSystemUpsertArgs<ExtArgs>>): Prisma__DesignSystemClient<$Result.GetResult<Prisma.$DesignSystemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DesignSystems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSystemCountArgs} args - Arguments to filter DesignSystems to count.
     * @example
     * // Count the number of DesignSystems
     * const count = await prisma.designSystem.count({
     *   where: {
     *     // ... the filter for the DesignSystems we want to count
     *   }
     * })
    **/
    count<T extends DesignSystemCountArgs>(
      args?: Subset<T, DesignSystemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DesignSystemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DesignSystem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSystemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DesignSystemAggregateArgs>(args: Subset<T, DesignSystemAggregateArgs>): Prisma.PrismaPromise<GetDesignSystemAggregateType<T>>

    /**
     * Group by DesignSystem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DesignSystemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DesignSystemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DesignSystemGroupByArgs['orderBy'] }
        : { orderBy?: DesignSystemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DesignSystemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDesignSystemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DesignSystem model
   */
  readonly fields: DesignSystemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DesignSystem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DesignSystemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DesignSystem model
   */
  interface DesignSystemFieldRefs {
    readonly id: FieldRef<"DesignSystem", 'String'>
    readonly projectId: FieldRef<"DesignSystem", 'String'>
    readonly name: FieldRef<"DesignSystem", 'String'>
    readonly description: FieldRef<"DesignSystem", 'String'>
    readonly colors: FieldRef<"DesignSystem", 'Json'>
    readonly typography: FieldRef<"DesignSystem", 'Json'>
    readonly spacing: FieldRef<"DesignSystem", 'Json'>
    readonly radius: FieldRef<"DesignSystem", 'Json'>
    readonly type: FieldRef<"DesignSystem", 'String'>
    readonly presetName: FieldRef<"DesignSystem", 'String'>
    readonly createdAt: FieldRef<"DesignSystem", 'DateTime'>
    readonly updatedAt: FieldRef<"DesignSystem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DesignSystem findUnique
   */
  export type DesignSystemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * Filter, which DesignSystem to fetch.
     */
    where: DesignSystemWhereUniqueInput
  }

  /**
   * DesignSystem findUniqueOrThrow
   */
  export type DesignSystemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * Filter, which DesignSystem to fetch.
     */
    where: DesignSystemWhereUniqueInput
  }

  /**
   * DesignSystem findFirst
   */
  export type DesignSystemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * Filter, which DesignSystem to fetch.
     */
    where?: DesignSystemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSystems to fetch.
     */
    orderBy?: DesignSystemOrderByWithRelationInput | DesignSystemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignSystems.
     */
    cursor?: DesignSystemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSystems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSystems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignSystems.
     */
    distinct?: DesignSystemScalarFieldEnum | DesignSystemScalarFieldEnum[]
  }

  /**
   * DesignSystem findFirstOrThrow
   */
  export type DesignSystemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * Filter, which DesignSystem to fetch.
     */
    where?: DesignSystemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSystems to fetch.
     */
    orderBy?: DesignSystemOrderByWithRelationInput | DesignSystemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DesignSystems.
     */
    cursor?: DesignSystemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSystems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSystems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DesignSystems.
     */
    distinct?: DesignSystemScalarFieldEnum | DesignSystemScalarFieldEnum[]
  }

  /**
   * DesignSystem findMany
   */
  export type DesignSystemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * Filter, which DesignSystems to fetch.
     */
    where?: DesignSystemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DesignSystems to fetch.
     */
    orderBy?: DesignSystemOrderByWithRelationInput | DesignSystemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DesignSystems.
     */
    cursor?: DesignSystemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DesignSystems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DesignSystems.
     */
    skip?: number
    distinct?: DesignSystemScalarFieldEnum | DesignSystemScalarFieldEnum[]
  }

  /**
   * DesignSystem create
   */
  export type DesignSystemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * The data needed to create a DesignSystem.
     */
    data: XOR<DesignSystemCreateInput, DesignSystemUncheckedCreateInput>
  }

  /**
   * DesignSystem createMany
   */
  export type DesignSystemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DesignSystems.
     */
    data: DesignSystemCreateManyInput | DesignSystemCreateManyInput[]
  }

  /**
   * DesignSystem createManyAndReturn
   */
  export type DesignSystemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * The data used to create many DesignSystems.
     */
    data: DesignSystemCreateManyInput | DesignSystemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignSystem update
   */
  export type DesignSystemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * The data needed to update a DesignSystem.
     */
    data: XOR<DesignSystemUpdateInput, DesignSystemUncheckedUpdateInput>
    /**
     * Choose, which DesignSystem to update.
     */
    where: DesignSystemWhereUniqueInput
  }

  /**
   * DesignSystem updateMany
   */
  export type DesignSystemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DesignSystems.
     */
    data: XOR<DesignSystemUpdateManyMutationInput, DesignSystemUncheckedUpdateManyInput>
    /**
     * Filter which DesignSystems to update
     */
    where?: DesignSystemWhereInput
    /**
     * Limit how many DesignSystems to update.
     */
    limit?: number
  }

  /**
   * DesignSystem updateManyAndReturn
   */
  export type DesignSystemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * The data used to update DesignSystems.
     */
    data: XOR<DesignSystemUpdateManyMutationInput, DesignSystemUncheckedUpdateManyInput>
    /**
     * Filter which DesignSystems to update
     */
    where?: DesignSystemWhereInput
    /**
     * Limit how many DesignSystems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DesignSystem upsert
   */
  export type DesignSystemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * The filter to search for the DesignSystem to update in case it exists.
     */
    where: DesignSystemWhereUniqueInput
    /**
     * In case the DesignSystem found by the `where` argument doesn't exist, create a new DesignSystem with this data.
     */
    create: XOR<DesignSystemCreateInput, DesignSystemUncheckedCreateInput>
    /**
     * In case the DesignSystem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DesignSystemUpdateInput, DesignSystemUncheckedUpdateInput>
  }

  /**
   * DesignSystem delete
   */
  export type DesignSystemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
    /**
     * Filter which DesignSystem to delete.
     */
    where: DesignSystemWhereUniqueInput
  }

  /**
   * DesignSystem deleteMany
   */
  export type DesignSystemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DesignSystems to delete
     */
    where?: DesignSystemWhereInput
    /**
     * Limit how many DesignSystems to delete.
     */
    limit?: number
  }

  /**
   * DesignSystem without action
   */
  export type DesignSystemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DesignSystem
     */
    select?: DesignSystemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DesignSystem
     */
    omit?: DesignSystemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DesignSystemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    llmPreferences: 'llmPreferences'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    key: 'key',
    lastUsedAt: 'lastUsedAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const LlmApiKeyScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    apiKey: 'apiKey',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LlmApiKeyScalarFieldEnum = (typeof LlmApiKeyScalarFieldEnum)[keyof typeof LlmApiKeyScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectMembershipScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    userId: 'userId',
    role: 'role',
    invitedById: 'invitedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectMembershipScalarFieldEnum = (typeof ProjectMembershipScalarFieldEnum)[keyof typeof ProjectMembershipScalarFieldEnum]


  export const DesignScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    createdById: 'createdById',
    name: 'name',
    description: 'description',
    html: 'html',
    position: 'position',
    size: 'size',
    viewMode: 'viewMode',
    history: 'history',
    tokens: 'tokens',
    data: 'data',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DesignScalarFieldEnum = (typeof DesignScalarFieldEnum)[keyof typeof DesignScalarFieldEnum]


  export const ComponentScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    createdById: 'createdById',
    name: 'name',
    html: 'html',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ComponentScalarFieldEnum = (typeof ComponentScalarFieldEnum)[keyof typeof ComponentScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const DesignConnectionScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    fromDesignId: 'fromDesignId',
    toDesignId: 'toDesignId',
    fromPosition: 'fromPosition',
    toPosition: 'toPosition',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DesignConnectionScalarFieldEnum = (typeof DesignConnectionScalarFieldEnum)[keyof typeof DesignConnectionScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const DesignSystemScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    description: 'description',
    colors: 'colors',
    typography: 'typography',
    spacing: 'spacing',
    radius: 'radius',
    type: 'type',
    presetName: 'presetName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DesignSystemScalarFieldEnum = (typeof DesignSystemScalarFieldEnum)[keyof typeof DesignSystemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'LlmProvider'
   */
  export type EnumLlmProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LlmProvider'>
    


  /**
   * Reference to a field of type 'ProjectRole'
   */
  export type EnumProjectRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectRole'>
    


  /**
   * Reference to a field of type 'DesignViewMode'
   */
  export type EnumDesignViewModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DesignViewMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'ConnectionPosition'
   */
  export type EnumConnectionPositionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConnectionPosition'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    llmPreferences?: JsonNullableFilter<"User">
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    projectsOwned?: ProjectListRelationFilter
    memberships?: ProjectMembershipListRelationFilter
    designs?: DesignListRelationFilter
    components?: ComponentListRelationFilter
    membershipInvites?: ProjectMembershipListRelationFilter
    llmApiKeys?: LlmApiKeyListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    llmPreferences?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    projectsOwned?: ProjectOrderByRelationAggregateInput
    memberships?: ProjectMembershipOrderByRelationAggregateInput
    designs?: DesignOrderByRelationAggregateInput
    components?: ComponentOrderByRelationAggregateInput
    membershipInvites?: ProjectMembershipOrderByRelationAggregateInput
    llmApiKeys?: LlmApiKeyOrderByRelationAggregateInput
    apiKeys?: ApiKeyOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    llmPreferences?: JsonNullableFilter<"User">
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    projectsOwned?: ProjectListRelationFilter
    memberships?: ProjectMembershipListRelationFilter
    designs?: DesignListRelationFilter
    components?: ComponentListRelationFilter
    membershipInvites?: ProjectMembershipListRelationFilter
    llmApiKeys?: LlmApiKeyListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    llmPreferences?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    llmPreferences?: JsonNullableWithAggregatesFilter<"User">
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    name?: StringNullableFilter<"ApiKey"> | string | null
    key?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    userId?: StringFilter<"ApiKey"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    key?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    name?: StringNullableFilter<"ApiKey"> | string | null
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    userId?: StringFilter<"ApiKey"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "key">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    key?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    key?: StringWithAggregatesFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    userId?: StringWithAggregatesFilter<"ApiKey"> | string
  }

  export type LlmApiKeyWhereInput = {
    AND?: LlmApiKeyWhereInput | LlmApiKeyWhereInput[]
    OR?: LlmApiKeyWhereInput[]
    NOT?: LlmApiKeyWhereInput | LlmApiKeyWhereInput[]
    id?: StringFilter<"LlmApiKey"> | string
    provider?: EnumLlmProviderFilter<"LlmApiKey"> | $Enums.LlmProvider
    apiKey?: StringFilter<"LlmApiKey"> | string
    userId?: StringFilter<"LlmApiKey"> | string
    createdAt?: DateTimeFilter<"LlmApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"LlmApiKey"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LlmApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LlmApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_provider?: LlmApiKeyUserIdProviderCompoundUniqueInput
    AND?: LlmApiKeyWhereInput | LlmApiKeyWhereInput[]
    OR?: LlmApiKeyWhereInput[]
    NOT?: LlmApiKeyWhereInput | LlmApiKeyWhereInput[]
    provider?: EnumLlmProviderFilter<"LlmApiKey"> | $Enums.LlmProvider
    apiKey?: StringFilter<"LlmApiKey"> | string
    userId?: StringFilter<"LlmApiKey"> | string
    createdAt?: DateTimeFilter<"LlmApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"LlmApiKey"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_provider">

  export type LlmApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LlmApiKeyCountOrderByAggregateInput
    _max?: LlmApiKeyMaxOrderByAggregateInput
    _min?: LlmApiKeyMinOrderByAggregateInput
  }

  export type LlmApiKeyScalarWhereWithAggregatesInput = {
    AND?: LlmApiKeyScalarWhereWithAggregatesInput | LlmApiKeyScalarWhereWithAggregatesInput[]
    OR?: LlmApiKeyScalarWhereWithAggregatesInput[]
    NOT?: LlmApiKeyScalarWhereWithAggregatesInput | LlmApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LlmApiKey"> | string
    provider?: EnumLlmProviderWithAggregatesFilter<"LlmApiKey"> | $Enums.LlmProvider
    apiKey?: StringWithAggregatesFilter<"LlmApiKey"> | string
    userId?: StringWithAggregatesFilter<"LlmApiKey"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LlmApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LlmApiKey"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdById?: StringFilter<"Project"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    memberships?: ProjectMembershipListRelationFilter
    designs?: DesignListRelationFilter
    components?: ComponentListRelationFilter
    connections?: DesignConnectionListRelationFilter
    designSystem?: XOR<DesignSystemNullableScalarRelationFilter, DesignSystemWhereInput> | null
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    memberships?: ProjectMembershipOrderByRelationAggregateInput
    designs?: DesignOrderByRelationAggregateInput
    components?: ComponentOrderByRelationAggregateInput
    connections?: DesignConnectionOrderByRelationAggregateInput
    designSystem?: DesignSystemOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdById?: StringFilter<"Project"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    memberships?: ProjectMembershipListRelationFilter
    designs?: DesignListRelationFilter
    components?: ComponentListRelationFilter
    connections?: DesignConnectionListRelationFilter
    designSystem?: XOR<DesignSystemNullableScalarRelationFilter, DesignSystemWhereInput> | null
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    createdById?: StringWithAggregatesFilter<"Project"> | string
  }

  export type ProjectMembershipWhereInput = {
    AND?: ProjectMembershipWhereInput | ProjectMembershipWhereInput[]
    OR?: ProjectMembershipWhereInput[]
    NOT?: ProjectMembershipWhereInput | ProjectMembershipWhereInput[]
    id?: StringFilter<"ProjectMembership"> | string
    projectId?: StringFilter<"ProjectMembership"> | string
    userId?: StringFilter<"ProjectMembership"> | string
    role?: EnumProjectRoleFilter<"ProjectMembership"> | $Enums.ProjectRole
    invitedById?: StringNullableFilter<"ProjectMembership"> | string | null
    createdAt?: DateTimeFilter<"ProjectMembership"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectMembership"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ProjectMembershipOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    invitedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    invitedBy?: UserOrderByWithRelationInput
  }

  export type ProjectMembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId_userId?: ProjectMembershipProjectIdUserIdCompoundUniqueInput
    AND?: ProjectMembershipWhereInput | ProjectMembershipWhereInput[]
    OR?: ProjectMembershipWhereInput[]
    NOT?: ProjectMembershipWhereInput | ProjectMembershipWhereInput[]
    projectId?: StringFilter<"ProjectMembership"> | string
    userId?: StringFilter<"ProjectMembership"> | string
    role?: EnumProjectRoleFilter<"ProjectMembership"> | $Enums.ProjectRole
    invitedById?: StringNullableFilter<"ProjectMembership"> | string | null
    createdAt?: DateTimeFilter<"ProjectMembership"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectMembership"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "projectId_userId">

  export type ProjectMembershipOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    invitedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectMembershipCountOrderByAggregateInput
    _max?: ProjectMembershipMaxOrderByAggregateInput
    _min?: ProjectMembershipMinOrderByAggregateInput
  }

  export type ProjectMembershipScalarWhereWithAggregatesInput = {
    AND?: ProjectMembershipScalarWhereWithAggregatesInput | ProjectMembershipScalarWhereWithAggregatesInput[]
    OR?: ProjectMembershipScalarWhereWithAggregatesInput[]
    NOT?: ProjectMembershipScalarWhereWithAggregatesInput | ProjectMembershipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectMembership"> | string
    projectId?: StringWithAggregatesFilter<"ProjectMembership"> | string
    userId?: StringWithAggregatesFilter<"ProjectMembership"> | string
    role?: EnumProjectRoleWithAggregatesFilter<"ProjectMembership"> | $Enums.ProjectRole
    invitedById?: StringNullableWithAggregatesFilter<"ProjectMembership"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProjectMembership"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectMembership"> | Date | string
  }

  export type DesignWhereInput = {
    AND?: DesignWhereInput | DesignWhereInput[]
    OR?: DesignWhereInput[]
    NOT?: DesignWhereInput | DesignWhereInput[]
    id?: StringFilter<"Design"> | string
    projectId?: StringFilter<"Design"> | string
    createdById?: StringFilter<"Design"> | string
    name?: StringFilter<"Design"> | string
    description?: StringNullableFilter<"Design"> | string | null
    html?: StringFilter<"Design"> | string
    position?: JsonNullableFilter<"Design">
    size?: JsonNullableFilter<"Design">
    viewMode?: EnumDesignViewModeFilter<"Design"> | $Enums.DesignViewMode
    history?: JsonNullableFilter<"Design">
    tokens?: JsonNullableFilter<"Design">
    data?: JsonNullableFilter<"Design">
    version?: IntFilter<"Design"> | number
    createdAt?: DateTimeFilter<"Design"> | Date | string
    updatedAt?: DateTimeFilter<"Design"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    connectionsFrom?: DesignConnectionListRelationFilter
    connectionsTo?: DesignConnectionListRelationFilter
  }

  export type DesignOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    html?: SortOrder
    position?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    viewMode?: SortOrder
    history?: SortOrderInput | SortOrder
    tokens?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    connectionsFrom?: DesignConnectionOrderByRelationAggregateInput
    connectionsTo?: DesignConnectionOrderByRelationAggregateInput
  }

  export type DesignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DesignWhereInput | DesignWhereInput[]
    OR?: DesignWhereInput[]
    NOT?: DesignWhereInput | DesignWhereInput[]
    projectId?: StringFilter<"Design"> | string
    createdById?: StringFilter<"Design"> | string
    name?: StringFilter<"Design"> | string
    description?: StringNullableFilter<"Design"> | string | null
    html?: StringFilter<"Design"> | string
    position?: JsonNullableFilter<"Design">
    size?: JsonNullableFilter<"Design">
    viewMode?: EnumDesignViewModeFilter<"Design"> | $Enums.DesignViewMode
    history?: JsonNullableFilter<"Design">
    tokens?: JsonNullableFilter<"Design">
    data?: JsonNullableFilter<"Design">
    version?: IntFilter<"Design"> | number
    createdAt?: DateTimeFilter<"Design"> | Date | string
    updatedAt?: DateTimeFilter<"Design"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    connectionsFrom?: DesignConnectionListRelationFilter
    connectionsTo?: DesignConnectionListRelationFilter
  }, "id">

  export type DesignOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    html?: SortOrder
    position?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    viewMode?: SortOrder
    history?: SortOrderInput | SortOrder
    tokens?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DesignCountOrderByAggregateInput
    _avg?: DesignAvgOrderByAggregateInput
    _max?: DesignMaxOrderByAggregateInput
    _min?: DesignMinOrderByAggregateInput
    _sum?: DesignSumOrderByAggregateInput
  }

  export type DesignScalarWhereWithAggregatesInput = {
    AND?: DesignScalarWhereWithAggregatesInput | DesignScalarWhereWithAggregatesInput[]
    OR?: DesignScalarWhereWithAggregatesInput[]
    NOT?: DesignScalarWhereWithAggregatesInput | DesignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Design"> | string
    projectId?: StringWithAggregatesFilter<"Design"> | string
    createdById?: StringWithAggregatesFilter<"Design"> | string
    name?: StringWithAggregatesFilter<"Design"> | string
    description?: StringNullableWithAggregatesFilter<"Design"> | string | null
    html?: StringWithAggregatesFilter<"Design"> | string
    position?: JsonNullableWithAggregatesFilter<"Design">
    size?: JsonNullableWithAggregatesFilter<"Design">
    viewMode?: EnumDesignViewModeWithAggregatesFilter<"Design"> | $Enums.DesignViewMode
    history?: JsonNullableWithAggregatesFilter<"Design">
    tokens?: JsonNullableWithAggregatesFilter<"Design">
    data?: JsonNullableWithAggregatesFilter<"Design">
    version?: IntWithAggregatesFilter<"Design"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Design"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Design"> | Date | string
  }

  export type ComponentWhereInput = {
    AND?: ComponentWhereInput | ComponentWhereInput[]
    OR?: ComponentWhereInput[]
    NOT?: ComponentWhereInput | ComponentWhereInput[]
    id?: StringFilter<"Component"> | string
    projectId?: StringFilter<"Component"> | string
    createdById?: StringFilter<"Component"> | string
    name?: StringFilter<"Component"> | string
    html?: StringFilter<"Component"> | string
    createdAt?: DateTimeFilter<"Component"> | Date | string
    updatedAt?: DateTimeFilter<"Component"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ComponentOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    html?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type ComponentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComponentWhereInput | ComponentWhereInput[]
    OR?: ComponentWhereInput[]
    NOT?: ComponentWhereInput | ComponentWhereInput[]
    projectId?: StringFilter<"Component"> | string
    createdById?: StringFilter<"Component"> | string
    name?: StringFilter<"Component"> | string
    html?: StringFilter<"Component"> | string
    createdAt?: DateTimeFilter<"Component"> | Date | string
    updatedAt?: DateTimeFilter<"Component"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ComponentOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    html?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ComponentCountOrderByAggregateInput
    _max?: ComponentMaxOrderByAggregateInput
    _min?: ComponentMinOrderByAggregateInput
  }

  export type ComponentScalarWhereWithAggregatesInput = {
    AND?: ComponentScalarWhereWithAggregatesInput | ComponentScalarWhereWithAggregatesInput[]
    OR?: ComponentScalarWhereWithAggregatesInput[]
    NOT?: ComponentScalarWhereWithAggregatesInput | ComponentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Component"> | string
    projectId?: StringWithAggregatesFilter<"Component"> | string
    createdById?: StringWithAggregatesFilter<"Component"> | string
    name?: StringWithAggregatesFilter<"Component"> | string
    html?: StringWithAggregatesFilter<"Component"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Component"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Component"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type DesignConnectionWhereInput = {
    AND?: DesignConnectionWhereInput | DesignConnectionWhereInput[]
    OR?: DesignConnectionWhereInput[]
    NOT?: DesignConnectionWhereInput | DesignConnectionWhereInput[]
    id?: StringFilter<"DesignConnection"> | string
    projectId?: StringFilter<"DesignConnection"> | string
    fromDesignId?: StringFilter<"DesignConnection"> | string
    toDesignId?: StringFilter<"DesignConnection"> | string
    fromPosition?: EnumConnectionPositionFilter<"DesignConnection"> | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFilter<"DesignConnection"> | $Enums.ConnectionPosition
    createdAt?: DateTimeFilter<"DesignConnection"> | Date | string
    updatedAt?: DateTimeFilter<"DesignConnection"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    fromDesign?: XOR<DesignScalarRelationFilter, DesignWhereInput>
    toDesign?: XOR<DesignScalarRelationFilter, DesignWhereInput>
  }

  export type DesignConnectionOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromDesignId?: SortOrder
    toDesignId?: SortOrder
    fromPosition?: SortOrder
    toPosition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    fromDesign?: DesignOrderByWithRelationInput
    toDesign?: DesignOrderByWithRelationInput
  }

  export type DesignConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fromDesignId_toDesignId_fromPosition_toPosition?: DesignConnectionFromDesignIdToDesignIdFromPositionToPositionCompoundUniqueInput
    AND?: DesignConnectionWhereInput | DesignConnectionWhereInput[]
    OR?: DesignConnectionWhereInput[]
    NOT?: DesignConnectionWhereInput | DesignConnectionWhereInput[]
    projectId?: StringFilter<"DesignConnection"> | string
    fromDesignId?: StringFilter<"DesignConnection"> | string
    toDesignId?: StringFilter<"DesignConnection"> | string
    fromPosition?: EnumConnectionPositionFilter<"DesignConnection"> | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFilter<"DesignConnection"> | $Enums.ConnectionPosition
    createdAt?: DateTimeFilter<"DesignConnection"> | Date | string
    updatedAt?: DateTimeFilter<"DesignConnection"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    fromDesign?: XOR<DesignScalarRelationFilter, DesignWhereInput>
    toDesign?: XOR<DesignScalarRelationFilter, DesignWhereInput>
  }, "id" | "fromDesignId_toDesignId_fromPosition_toPosition">

  export type DesignConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromDesignId?: SortOrder
    toDesignId?: SortOrder
    fromPosition?: SortOrder
    toPosition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DesignConnectionCountOrderByAggregateInput
    _max?: DesignConnectionMaxOrderByAggregateInput
    _min?: DesignConnectionMinOrderByAggregateInput
  }

  export type DesignConnectionScalarWhereWithAggregatesInput = {
    AND?: DesignConnectionScalarWhereWithAggregatesInput | DesignConnectionScalarWhereWithAggregatesInput[]
    OR?: DesignConnectionScalarWhereWithAggregatesInput[]
    NOT?: DesignConnectionScalarWhereWithAggregatesInput | DesignConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DesignConnection"> | string
    projectId?: StringWithAggregatesFilter<"DesignConnection"> | string
    fromDesignId?: StringWithAggregatesFilter<"DesignConnection"> | string
    toDesignId?: StringWithAggregatesFilter<"DesignConnection"> | string
    fromPosition?: EnumConnectionPositionWithAggregatesFilter<"DesignConnection"> | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionWithAggregatesFilter<"DesignConnection"> | $Enums.ConnectionPosition
    createdAt?: DateTimeWithAggregatesFilter<"DesignConnection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DesignConnection"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type DesignSystemWhereInput = {
    AND?: DesignSystemWhereInput | DesignSystemWhereInput[]
    OR?: DesignSystemWhereInput[]
    NOT?: DesignSystemWhereInput | DesignSystemWhereInput[]
    id?: StringFilter<"DesignSystem"> | string
    projectId?: StringFilter<"DesignSystem"> | string
    name?: StringFilter<"DesignSystem"> | string
    description?: StringNullableFilter<"DesignSystem"> | string | null
    colors?: JsonFilter<"DesignSystem">
    typography?: JsonFilter<"DesignSystem">
    spacing?: JsonFilter<"DesignSystem">
    radius?: JsonFilter<"DesignSystem">
    type?: StringFilter<"DesignSystem"> | string
    presetName?: StringNullableFilter<"DesignSystem"> | string | null
    createdAt?: DateTimeFilter<"DesignSystem"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSystem"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type DesignSystemOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    colors?: SortOrder
    typography?: SortOrder
    spacing?: SortOrder
    radius?: SortOrder
    type?: SortOrder
    presetName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type DesignSystemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    AND?: DesignSystemWhereInput | DesignSystemWhereInput[]
    OR?: DesignSystemWhereInput[]
    NOT?: DesignSystemWhereInput | DesignSystemWhereInput[]
    name?: StringFilter<"DesignSystem"> | string
    description?: StringNullableFilter<"DesignSystem"> | string | null
    colors?: JsonFilter<"DesignSystem">
    typography?: JsonFilter<"DesignSystem">
    spacing?: JsonFilter<"DesignSystem">
    radius?: JsonFilter<"DesignSystem">
    type?: StringFilter<"DesignSystem"> | string
    presetName?: StringNullableFilter<"DesignSystem"> | string | null
    createdAt?: DateTimeFilter<"DesignSystem"> | Date | string
    updatedAt?: DateTimeFilter<"DesignSystem"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId">

  export type DesignSystemOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    colors?: SortOrder
    typography?: SortOrder
    spacing?: SortOrder
    radius?: SortOrder
    type?: SortOrder
    presetName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DesignSystemCountOrderByAggregateInput
    _max?: DesignSystemMaxOrderByAggregateInput
    _min?: DesignSystemMinOrderByAggregateInput
  }

  export type DesignSystemScalarWhereWithAggregatesInput = {
    AND?: DesignSystemScalarWhereWithAggregatesInput | DesignSystemScalarWhereWithAggregatesInput[]
    OR?: DesignSystemScalarWhereWithAggregatesInput[]
    NOT?: DesignSystemScalarWhereWithAggregatesInput | DesignSystemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DesignSystem"> | string
    projectId?: StringWithAggregatesFilter<"DesignSystem"> | string
    name?: StringWithAggregatesFilter<"DesignSystem"> | string
    description?: StringNullableWithAggregatesFilter<"DesignSystem"> | string | null
    colors?: JsonWithAggregatesFilter<"DesignSystem">
    typography?: JsonWithAggregatesFilter<"DesignSystem">
    spacing?: JsonWithAggregatesFilter<"DesignSystem">
    radius?: JsonWithAggregatesFilter<"DesignSystem">
    type?: StringWithAggregatesFilter<"DesignSystem"> | string
    presetName?: StringNullableWithAggregatesFilter<"DesignSystem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DesignSystem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DesignSystem"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ApiKeyCreateInput = {
    id?: string
    name?: string | null
    key?: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApiKeysInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    name?: string | null
    key?: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    key?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApiKeysNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    key?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    name?: string | null
    key?: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    key?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    key?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LlmApiKeyCreateInput = {
    id?: string
    provider: $Enums.LlmProvider
    apiKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLlmApiKeysInput
  }

  export type LlmApiKeyUncheckedCreateInput = {
    id?: string
    provider: $Enums.LlmProvider
    apiKey: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LlmApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumLlmProviderFieldUpdateOperationsInput | $Enums.LlmProvider
    apiKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLlmApiKeysNestedInput
  }

  export type LlmApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumLlmProviderFieldUpdateOperationsInput | $Enums.LlmProvider
    apiKey?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LlmApiKeyCreateManyInput = {
    id?: string
    provider: $Enums.LlmProvider
    apiKey: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LlmApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumLlmProviderFieldUpdateOperationsInput | $Enums.LlmProvider
    apiKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LlmApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumLlmProviderFieldUpdateOperationsInput | $Enums.LlmProvider
    apiKey?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutProjectsOwnedInput
    memberships?: ProjectMembershipCreateNestedManyWithoutProjectInput
    designs?: DesignCreateNestedManyWithoutProjectInput
    components?: ComponentCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutProjectInput
    designs?: DesignUncheckedCreateNestedManyWithoutProjectInput
    components?: ComponentUncheckedCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionUncheckedCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutProjectsOwnedNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutProjectNestedInput
    designs?: DesignUpdateManyWithoutProjectNestedInput
    components?: ComponentUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutProjectNestedInput
    designs?: DesignUncheckedUpdateManyWithoutProjectNestedInput
    components?: ComponentUncheckedUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUncheckedUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectMembershipCreateInput = {
    id?: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutMembershipsInput
    user: UserCreateNestedOneWithoutMembershipsInput
    invitedBy?: UserCreateNestedOneWithoutMembershipInvitesInput
  }

  export type ProjectMembershipUncheckedCreateInput = {
    id?: string
    projectId: string
    userId: string
    role?: $Enums.ProjectRole
    invitedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    invitedBy?: UserUpdateOneWithoutMembershipInvitesNestedInput
  }

  export type ProjectMembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipCreateManyInput = {
    id?: string
    projectId: string
    userId: string
    role?: $Enums.ProjectRole
    invitedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignCreateInput = {
    id?: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDesignsInput
    createdBy: UserCreateNestedOneWithoutDesignsInput
    connectionsFrom?: DesignConnectionCreateNestedManyWithoutFromDesignInput
    connectionsTo?: DesignConnectionCreateNestedManyWithoutToDesignInput
  }

  export type DesignUncheckedCreateInput = {
    id?: string
    projectId: string
    createdById: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    connectionsFrom?: DesignConnectionUncheckedCreateNestedManyWithoutFromDesignInput
    connectionsTo?: DesignConnectionUncheckedCreateNestedManyWithoutToDesignInput
  }

  export type DesignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDesignsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutDesignsNestedInput
    connectionsFrom?: DesignConnectionUpdateManyWithoutFromDesignNestedInput
    connectionsTo?: DesignConnectionUpdateManyWithoutToDesignNestedInput
  }

  export type DesignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectionsFrom?: DesignConnectionUncheckedUpdateManyWithoutFromDesignNestedInput
    connectionsTo?: DesignConnectionUncheckedUpdateManyWithoutToDesignNestedInput
  }

  export type DesignCreateManyInput = {
    id?: string
    projectId: string
    createdById: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComponentCreateInput = {
    id?: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutComponentsInput
    createdBy: UserCreateNestedOneWithoutComponentsInput
  }

  export type ComponentUncheckedCreateInput = {
    id?: string
    projectId: string
    createdById: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComponentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutComponentsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutComponentsNestedInput
  }

  export type ComponentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComponentCreateManyInput = {
    id?: string
    projectId: string
    createdById: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComponentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComponentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionCreateInput = {
    id?: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutConnectionsInput
    fromDesign: DesignCreateNestedOneWithoutConnectionsFromInput
    toDesign: DesignCreateNestedOneWithoutConnectionsToInput
  }

  export type DesignConnectionUncheckedCreateInput = {
    id?: string
    projectId: string
    fromDesignId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutConnectionsNestedInput
    fromDesign?: DesignUpdateOneRequiredWithoutConnectionsFromNestedInput
    toDesign?: DesignUpdateOneRequiredWithoutConnectionsToNestedInput
  }

  export type DesignConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromDesignId?: StringFieldUpdateOperationsInput | string
    toDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionCreateManyInput = {
    id?: string
    projectId: string
    fromDesignId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromDesignId?: StringFieldUpdateOperationsInput | string
    toDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignSystemCreateInput = {
    id?: string
    name?: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    typography: JsonNullValueInput | InputJsonValue
    spacing: JsonNullValueInput | InputJsonValue
    radius: JsonNullValueInput | InputJsonValue
    type?: string
    presetName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDesignSystemInput
  }

  export type DesignSystemUncheckedCreateInput = {
    id?: string
    projectId: string
    name?: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    typography: JsonNullValueInput | InputJsonValue
    spacing: JsonNullValueInput | InputJsonValue
    radius: JsonNullValueInput | InputJsonValue
    type?: string
    presetName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignSystemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    typography?: JsonNullValueInput | InputJsonValue
    spacing?: JsonNullValueInput | InputJsonValue
    radius?: JsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    presetName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDesignSystemNestedInput
  }

  export type DesignSystemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    typography?: JsonNullValueInput | InputJsonValue
    spacing?: JsonNullValueInput | InputJsonValue
    radius?: JsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    presetName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignSystemCreateManyInput = {
    id?: string
    projectId: string
    name?: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    typography: JsonNullValueInput | InputJsonValue
    spacing: JsonNullValueInput | InputJsonValue
    radius: JsonNullValueInput | InputJsonValue
    type?: string
    presetName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignSystemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    typography?: JsonNullValueInput | InputJsonValue
    spacing?: JsonNullValueInput | InputJsonValue
    radius?: JsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    presetName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignSystemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    typography?: JsonNullValueInput | InputJsonValue
    spacing?: JsonNullValueInput | InputJsonValue
    radius?: JsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    presetName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ProjectMembershipListRelationFilter = {
    every?: ProjectMembershipWhereInput
    some?: ProjectMembershipWhereInput
    none?: ProjectMembershipWhereInput
  }

  export type DesignListRelationFilter = {
    every?: DesignWhereInput
    some?: DesignWhereInput
    none?: DesignWhereInput
  }

  export type ComponentListRelationFilter = {
    every?: ComponentWhereInput
    some?: ComponentWhereInput
    none?: ComponentWhereInput
  }

  export type LlmApiKeyListRelationFilter = {
    every?: LlmApiKeyWhereInput
    some?: LlmApiKeyWhereInput
    none?: LlmApiKeyWhereInput
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DesignOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComponentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LlmApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    llmPreferences?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumLlmProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.LlmProvider | EnumLlmProviderFieldRefInput<$PrismaModel>
    in?: $Enums.LlmProvider[]
    notIn?: $Enums.LlmProvider[]
    not?: NestedEnumLlmProviderFilter<$PrismaModel> | $Enums.LlmProvider
  }

  export type LlmApiKeyUserIdProviderCompoundUniqueInput = {
    userId: string
    provider: $Enums.LlmProvider
  }

  export type LlmApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LlmApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LlmApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumLlmProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LlmProvider | EnumLlmProviderFieldRefInput<$PrismaModel>
    in?: $Enums.LlmProvider[]
    notIn?: $Enums.LlmProvider[]
    not?: NestedEnumLlmProviderWithAggregatesFilter<$PrismaModel> | $Enums.LlmProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLlmProviderFilter<$PrismaModel>
    _max?: NestedEnumLlmProviderFilter<$PrismaModel>
  }

  export type DesignConnectionListRelationFilter = {
    every?: DesignConnectionWhereInput
    some?: DesignConnectionWhereInput
    none?: DesignConnectionWhereInput
  }

  export type DesignSystemNullableScalarRelationFilter = {
    is?: DesignSystemWhereInput | null
    isNot?: DesignSystemWhereInput | null
  }

  export type DesignConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type EnumProjectRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleFilter<$PrismaModel> | $Enums.ProjectRole
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProjectMembershipProjectIdUserIdCompoundUniqueInput = {
    projectId: string
    userId: string
  }

  export type ProjectMembershipCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    invitedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    invitedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMembershipMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    invitedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumProjectRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel> | $Enums.ProjectRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectRoleFilter<$PrismaModel>
    _max?: NestedEnumProjectRoleFilter<$PrismaModel>
  }

  export type EnumDesignViewModeFilter<$PrismaModel = never> = {
    equals?: $Enums.DesignViewMode | EnumDesignViewModeFieldRefInput<$PrismaModel>
    in?: $Enums.DesignViewMode[]
    notIn?: $Enums.DesignViewMode[]
    not?: NestedEnumDesignViewModeFilter<$PrismaModel> | $Enums.DesignViewMode
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DesignCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    description?: SortOrder
    html?: SortOrder
    position?: SortOrder
    size?: SortOrder
    viewMode?: SortOrder
    history?: SortOrder
    tokens?: SortOrder
    data?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DesignAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type DesignMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    description?: SortOrder
    html?: SortOrder
    viewMode?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DesignMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    description?: SortOrder
    html?: SortOrder
    viewMode?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DesignSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EnumDesignViewModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DesignViewMode | EnumDesignViewModeFieldRefInput<$PrismaModel>
    in?: $Enums.DesignViewMode[]
    notIn?: $Enums.DesignViewMode[]
    not?: NestedEnumDesignViewModeWithAggregatesFilter<$PrismaModel> | $Enums.DesignViewMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDesignViewModeFilter<$PrismaModel>
    _max?: NestedEnumDesignViewModeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ComponentCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    html?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComponentMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    html?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComponentMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    createdById?: SortOrder
    name?: SortOrder
    html?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConnectionPositionFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionPosition | EnumConnectionPositionFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionPosition[]
    notIn?: $Enums.ConnectionPosition[]
    not?: NestedEnumConnectionPositionFilter<$PrismaModel> | $Enums.ConnectionPosition
  }

  export type DesignScalarRelationFilter = {
    is?: DesignWhereInput
    isNot?: DesignWhereInput
  }

  export type DesignConnectionFromDesignIdToDesignIdFromPositionToPositionCompoundUniqueInput = {
    fromDesignId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
  }

  export type DesignConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromDesignId?: SortOrder
    toDesignId?: SortOrder
    fromPosition?: SortOrder
    toPosition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DesignConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromDesignId?: SortOrder
    toDesignId?: SortOrder
    fromPosition?: SortOrder
    toPosition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DesignConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fromDesignId?: SortOrder
    toDesignId?: SortOrder
    fromPosition?: SortOrder
    toPosition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConnectionPositionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionPosition | EnumConnectionPositionFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionPosition[]
    notIn?: $Enums.ConnectionPosition[]
    not?: NestedEnumConnectionPositionWithAggregatesFilter<$PrismaModel> | $Enums.ConnectionPosition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConnectionPositionFilter<$PrismaModel>
    _max?: NestedEnumConnectionPositionFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DesignSystemCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    colors?: SortOrder
    typography?: SortOrder
    spacing?: SortOrder
    radius?: SortOrder
    type?: SortOrder
    presetName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DesignSystemMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    presetName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DesignSystemMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    presetName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectMembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMembershipCreateWithoutUserInput, ProjectMembershipUncheckedCreateWithoutUserInput> | ProjectMembershipCreateWithoutUserInput[] | ProjectMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutUserInput | ProjectMembershipCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMembershipCreateManyUserInputEnvelope
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
  }

  export type DesignCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DesignCreateWithoutCreatedByInput, DesignUncheckedCreateWithoutCreatedByInput> | DesignCreateWithoutCreatedByInput[] | DesignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutCreatedByInput | DesignCreateOrConnectWithoutCreatedByInput[]
    createMany?: DesignCreateManyCreatedByInputEnvelope
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
  }

  export type ComponentCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ComponentCreateWithoutCreatedByInput, ComponentUncheckedCreateWithoutCreatedByInput> | ComponentCreateWithoutCreatedByInput[] | ComponentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutCreatedByInput | ComponentCreateOrConnectWithoutCreatedByInput[]
    createMany?: ComponentCreateManyCreatedByInputEnvelope
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
  }

  export type ProjectMembershipCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<ProjectMembershipCreateWithoutInvitedByInput, ProjectMembershipUncheckedCreateWithoutInvitedByInput> | ProjectMembershipCreateWithoutInvitedByInput[] | ProjectMembershipUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutInvitedByInput | ProjectMembershipCreateOrConnectWithoutInvitedByInput[]
    createMany?: ProjectMembershipCreateManyInvitedByInputEnvelope
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
  }

  export type LlmApiKeyCreateNestedManyWithoutUserInput = {
    create?: XOR<LlmApiKeyCreateWithoutUserInput, LlmApiKeyUncheckedCreateWithoutUserInput> | LlmApiKeyCreateWithoutUserInput[] | LlmApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LlmApiKeyCreateOrConnectWithoutUserInput | LlmApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: LlmApiKeyCreateManyUserInputEnvelope
    connect?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
  }

  export type ApiKeyCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectMembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMembershipCreateWithoutUserInput, ProjectMembershipUncheckedCreateWithoutUserInput> | ProjectMembershipCreateWithoutUserInput[] | ProjectMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutUserInput | ProjectMembershipCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMembershipCreateManyUserInputEnvelope
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
  }

  export type DesignUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DesignCreateWithoutCreatedByInput, DesignUncheckedCreateWithoutCreatedByInput> | DesignCreateWithoutCreatedByInput[] | DesignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutCreatedByInput | DesignCreateOrConnectWithoutCreatedByInput[]
    createMany?: DesignCreateManyCreatedByInputEnvelope
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
  }

  export type ComponentUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ComponentCreateWithoutCreatedByInput, ComponentUncheckedCreateWithoutCreatedByInput> | ComponentCreateWithoutCreatedByInput[] | ComponentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutCreatedByInput | ComponentCreateOrConnectWithoutCreatedByInput[]
    createMany?: ComponentCreateManyCreatedByInputEnvelope
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
  }

  export type ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<ProjectMembershipCreateWithoutInvitedByInput, ProjectMembershipUncheckedCreateWithoutInvitedByInput> | ProjectMembershipCreateWithoutInvitedByInput[] | ProjectMembershipUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutInvitedByInput | ProjectMembershipCreateOrConnectWithoutInvitedByInput[]
    createMany?: ProjectMembershipCreateManyInvitedByInputEnvelope
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
  }

  export type LlmApiKeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LlmApiKeyCreateWithoutUserInput, LlmApiKeyUncheckedCreateWithoutUserInput> | LlmApiKeyCreateWithoutUserInput[] | LlmApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LlmApiKeyCreateOrConnectWithoutUserInput | LlmApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: LlmApiKeyCreateManyUserInputEnvelope
    connect?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCreatedByInput | ProjectUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCreatedByInput | ProjectUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCreatedByInput | ProjectUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectMembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMembershipCreateWithoutUserInput, ProjectMembershipUncheckedCreateWithoutUserInput> | ProjectMembershipCreateWithoutUserInput[] | ProjectMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutUserInput | ProjectMembershipCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMembershipUpsertWithWhereUniqueWithoutUserInput | ProjectMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMembershipCreateManyUserInputEnvelope
    set?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    disconnect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    delete?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    update?: ProjectMembershipUpdateWithWhereUniqueWithoutUserInput | ProjectMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMembershipUpdateManyWithWhereWithoutUserInput | ProjectMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
  }

  export type DesignUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DesignCreateWithoutCreatedByInput, DesignUncheckedCreateWithoutCreatedByInput> | DesignCreateWithoutCreatedByInput[] | DesignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutCreatedByInput | DesignCreateOrConnectWithoutCreatedByInput[]
    upsert?: DesignUpsertWithWhereUniqueWithoutCreatedByInput | DesignUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DesignCreateManyCreatedByInputEnvelope
    set?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    disconnect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    delete?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    update?: DesignUpdateWithWhereUniqueWithoutCreatedByInput | DesignUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DesignUpdateManyWithWhereWithoutCreatedByInput | DesignUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DesignScalarWhereInput | DesignScalarWhereInput[]
  }

  export type ComponentUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ComponentCreateWithoutCreatedByInput, ComponentUncheckedCreateWithoutCreatedByInput> | ComponentCreateWithoutCreatedByInput[] | ComponentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutCreatedByInput | ComponentCreateOrConnectWithoutCreatedByInput[]
    upsert?: ComponentUpsertWithWhereUniqueWithoutCreatedByInput | ComponentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ComponentCreateManyCreatedByInputEnvelope
    set?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    disconnect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    delete?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    update?: ComponentUpdateWithWhereUniqueWithoutCreatedByInput | ComponentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ComponentUpdateManyWithWhereWithoutCreatedByInput | ComponentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ComponentScalarWhereInput | ComponentScalarWhereInput[]
  }

  export type ProjectMembershipUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<ProjectMembershipCreateWithoutInvitedByInput, ProjectMembershipUncheckedCreateWithoutInvitedByInput> | ProjectMembershipCreateWithoutInvitedByInput[] | ProjectMembershipUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutInvitedByInput | ProjectMembershipCreateOrConnectWithoutInvitedByInput[]
    upsert?: ProjectMembershipUpsertWithWhereUniqueWithoutInvitedByInput | ProjectMembershipUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: ProjectMembershipCreateManyInvitedByInputEnvelope
    set?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    disconnect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    delete?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    update?: ProjectMembershipUpdateWithWhereUniqueWithoutInvitedByInput | ProjectMembershipUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: ProjectMembershipUpdateManyWithWhereWithoutInvitedByInput | ProjectMembershipUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
  }

  export type LlmApiKeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<LlmApiKeyCreateWithoutUserInput, LlmApiKeyUncheckedCreateWithoutUserInput> | LlmApiKeyCreateWithoutUserInput[] | LlmApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LlmApiKeyCreateOrConnectWithoutUserInput | LlmApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: LlmApiKeyUpsertWithWhereUniqueWithoutUserInput | LlmApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LlmApiKeyCreateManyUserInputEnvelope
    set?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    disconnect?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    delete?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    connect?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    update?: LlmApiKeyUpdateWithWhereUniqueWithoutUserInput | LlmApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LlmApiKeyUpdateManyWithWhereWithoutUserInput | LlmApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LlmApiKeyScalarWhereInput | LlmApiKeyScalarWhereInput[]
  }

  export type ApiKeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput> | ProjectCreateWithoutCreatedByInput[] | ProjectUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCreatedByInput | ProjectCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCreatedByInput | ProjectUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProjectCreateManyCreatedByInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCreatedByInput | ProjectUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCreatedByInput | ProjectUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMembershipCreateWithoutUserInput, ProjectMembershipUncheckedCreateWithoutUserInput> | ProjectMembershipCreateWithoutUserInput[] | ProjectMembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutUserInput | ProjectMembershipCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMembershipUpsertWithWhereUniqueWithoutUserInput | ProjectMembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMembershipCreateManyUserInputEnvelope
    set?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    disconnect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    delete?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    update?: ProjectMembershipUpdateWithWhereUniqueWithoutUserInput | ProjectMembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMembershipUpdateManyWithWhereWithoutUserInput | ProjectMembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
  }

  export type DesignUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DesignCreateWithoutCreatedByInput, DesignUncheckedCreateWithoutCreatedByInput> | DesignCreateWithoutCreatedByInput[] | DesignUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutCreatedByInput | DesignCreateOrConnectWithoutCreatedByInput[]
    upsert?: DesignUpsertWithWhereUniqueWithoutCreatedByInput | DesignUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DesignCreateManyCreatedByInputEnvelope
    set?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    disconnect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    delete?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    update?: DesignUpdateWithWhereUniqueWithoutCreatedByInput | DesignUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DesignUpdateManyWithWhereWithoutCreatedByInput | DesignUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DesignScalarWhereInput | DesignScalarWhereInput[]
  }

  export type ComponentUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ComponentCreateWithoutCreatedByInput, ComponentUncheckedCreateWithoutCreatedByInput> | ComponentCreateWithoutCreatedByInput[] | ComponentUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutCreatedByInput | ComponentCreateOrConnectWithoutCreatedByInput[]
    upsert?: ComponentUpsertWithWhereUniqueWithoutCreatedByInput | ComponentUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ComponentCreateManyCreatedByInputEnvelope
    set?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    disconnect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    delete?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    update?: ComponentUpdateWithWhereUniqueWithoutCreatedByInput | ComponentUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ComponentUpdateManyWithWhereWithoutCreatedByInput | ComponentUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ComponentScalarWhereInput | ComponentScalarWhereInput[]
  }

  export type ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<ProjectMembershipCreateWithoutInvitedByInput, ProjectMembershipUncheckedCreateWithoutInvitedByInput> | ProjectMembershipCreateWithoutInvitedByInput[] | ProjectMembershipUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutInvitedByInput | ProjectMembershipCreateOrConnectWithoutInvitedByInput[]
    upsert?: ProjectMembershipUpsertWithWhereUniqueWithoutInvitedByInput | ProjectMembershipUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: ProjectMembershipCreateManyInvitedByInputEnvelope
    set?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    disconnect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    delete?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    update?: ProjectMembershipUpdateWithWhereUniqueWithoutInvitedByInput | ProjectMembershipUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: ProjectMembershipUpdateManyWithWhereWithoutInvitedByInput | ProjectMembershipUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
  }

  export type LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LlmApiKeyCreateWithoutUserInput, LlmApiKeyUncheckedCreateWithoutUserInput> | LlmApiKeyCreateWithoutUserInput[] | LlmApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LlmApiKeyCreateOrConnectWithoutUserInput | LlmApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: LlmApiKeyUpsertWithWhereUniqueWithoutUserInput | LlmApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LlmApiKeyCreateManyUserInputEnvelope
    set?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    disconnect?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    delete?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    connect?: LlmApiKeyWhereUniqueInput | LlmApiKeyWhereUniqueInput[]
    update?: LlmApiKeyUpdateWithWhereUniqueWithoutUserInput | LlmApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LlmApiKeyUpdateManyWithWhereWithoutUserInput | LlmApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LlmApiKeyScalarWhereInput | LlmApiKeyScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutApiKeysInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    upsert?: UserUpsertWithoutApiKeysInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApiKeysInput, UserUpdateWithoutApiKeysInput>, UserUncheckedUpdateWithoutApiKeysInput>
  }

  export type UserCreateNestedOneWithoutLlmApiKeysInput = {
    create?: XOR<UserCreateWithoutLlmApiKeysInput, UserUncheckedCreateWithoutLlmApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutLlmApiKeysInput
    connect?: UserWhereUniqueInput
  }

  export type EnumLlmProviderFieldUpdateOperationsInput = {
    set?: $Enums.LlmProvider
  }

  export type UserUpdateOneRequiredWithoutLlmApiKeysNestedInput = {
    create?: XOR<UserCreateWithoutLlmApiKeysInput, UserUncheckedCreateWithoutLlmApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutLlmApiKeysInput
    upsert?: UserUpsertWithoutLlmApiKeysInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLlmApiKeysInput, UserUpdateWithoutLlmApiKeysInput>, UserUncheckedUpdateWithoutLlmApiKeysInput>
  }

  export type UserCreateNestedOneWithoutProjectsOwnedInput = {
    create?: XOR<UserCreateWithoutProjectsOwnedInput, UserUncheckedCreateWithoutProjectsOwnedInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsOwnedInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectMembershipCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMembershipCreateWithoutProjectInput, ProjectMembershipUncheckedCreateWithoutProjectInput> | ProjectMembershipCreateWithoutProjectInput[] | ProjectMembershipUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutProjectInput | ProjectMembershipCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMembershipCreateManyProjectInputEnvelope
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
  }

  export type DesignCreateNestedManyWithoutProjectInput = {
    create?: XOR<DesignCreateWithoutProjectInput, DesignUncheckedCreateWithoutProjectInput> | DesignCreateWithoutProjectInput[] | DesignUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutProjectInput | DesignCreateOrConnectWithoutProjectInput[]
    createMany?: DesignCreateManyProjectInputEnvelope
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
  }

  export type ComponentCreateNestedManyWithoutProjectInput = {
    create?: XOR<ComponentCreateWithoutProjectInput, ComponentUncheckedCreateWithoutProjectInput> | ComponentCreateWithoutProjectInput[] | ComponentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutProjectInput | ComponentCreateOrConnectWithoutProjectInput[]
    createMany?: ComponentCreateManyProjectInputEnvelope
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
  }

  export type DesignConnectionCreateNestedManyWithoutProjectInput = {
    create?: XOR<DesignConnectionCreateWithoutProjectInput, DesignConnectionUncheckedCreateWithoutProjectInput> | DesignConnectionCreateWithoutProjectInput[] | DesignConnectionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutProjectInput | DesignConnectionCreateOrConnectWithoutProjectInput[]
    createMany?: DesignConnectionCreateManyProjectInputEnvelope
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
  }

  export type DesignSystemCreateNestedOneWithoutProjectInput = {
    create?: XOR<DesignSystemCreateWithoutProjectInput, DesignSystemUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignSystemCreateOrConnectWithoutProjectInput
    connect?: DesignSystemWhereUniqueInput
  }

  export type ProjectMembershipUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMembershipCreateWithoutProjectInput, ProjectMembershipUncheckedCreateWithoutProjectInput> | ProjectMembershipCreateWithoutProjectInput[] | ProjectMembershipUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutProjectInput | ProjectMembershipCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMembershipCreateManyProjectInputEnvelope
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
  }

  export type DesignUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<DesignCreateWithoutProjectInput, DesignUncheckedCreateWithoutProjectInput> | DesignCreateWithoutProjectInput[] | DesignUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutProjectInput | DesignCreateOrConnectWithoutProjectInput[]
    createMany?: DesignCreateManyProjectInputEnvelope
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
  }

  export type ComponentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ComponentCreateWithoutProjectInput, ComponentUncheckedCreateWithoutProjectInput> | ComponentCreateWithoutProjectInput[] | ComponentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutProjectInput | ComponentCreateOrConnectWithoutProjectInput[]
    createMany?: ComponentCreateManyProjectInputEnvelope
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
  }

  export type DesignConnectionUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<DesignConnectionCreateWithoutProjectInput, DesignConnectionUncheckedCreateWithoutProjectInput> | DesignConnectionCreateWithoutProjectInput[] | DesignConnectionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutProjectInput | DesignConnectionCreateOrConnectWithoutProjectInput[]
    createMany?: DesignConnectionCreateManyProjectInputEnvelope
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
  }

  export type DesignSystemUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<DesignSystemCreateWithoutProjectInput, DesignSystemUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignSystemCreateOrConnectWithoutProjectInput
    connect?: DesignSystemWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProjectsOwnedNestedInput = {
    create?: XOR<UserCreateWithoutProjectsOwnedInput, UserUncheckedCreateWithoutProjectsOwnedInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsOwnedInput
    upsert?: UserUpsertWithoutProjectsOwnedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsOwnedInput, UserUpdateWithoutProjectsOwnedInput>, UserUncheckedUpdateWithoutProjectsOwnedInput>
  }

  export type ProjectMembershipUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMembershipCreateWithoutProjectInput, ProjectMembershipUncheckedCreateWithoutProjectInput> | ProjectMembershipCreateWithoutProjectInput[] | ProjectMembershipUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutProjectInput | ProjectMembershipCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMembershipUpsertWithWhereUniqueWithoutProjectInput | ProjectMembershipUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMembershipCreateManyProjectInputEnvelope
    set?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    disconnect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    delete?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    update?: ProjectMembershipUpdateWithWhereUniqueWithoutProjectInput | ProjectMembershipUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMembershipUpdateManyWithWhereWithoutProjectInput | ProjectMembershipUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
  }

  export type DesignUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DesignCreateWithoutProjectInput, DesignUncheckedCreateWithoutProjectInput> | DesignCreateWithoutProjectInput[] | DesignUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutProjectInput | DesignCreateOrConnectWithoutProjectInput[]
    upsert?: DesignUpsertWithWhereUniqueWithoutProjectInput | DesignUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DesignCreateManyProjectInputEnvelope
    set?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    disconnect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    delete?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    update?: DesignUpdateWithWhereUniqueWithoutProjectInput | DesignUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DesignUpdateManyWithWhereWithoutProjectInput | DesignUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DesignScalarWhereInput | DesignScalarWhereInput[]
  }

  export type ComponentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ComponentCreateWithoutProjectInput, ComponentUncheckedCreateWithoutProjectInput> | ComponentCreateWithoutProjectInput[] | ComponentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutProjectInput | ComponentCreateOrConnectWithoutProjectInput[]
    upsert?: ComponentUpsertWithWhereUniqueWithoutProjectInput | ComponentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ComponentCreateManyProjectInputEnvelope
    set?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    disconnect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    delete?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    update?: ComponentUpdateWithWhereUniqueWithoutProjectInput | ComponentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ComponentUpdateManyWithWhereWithoutProjectInput | ComponentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ComponentScalarWhereInput | ComponentScalarWhereInput[]
  }

  export type DesignConnectionUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DesignConnectionCreateWithoutProjectInput, DesignConnectionUncheckedCreateWithoutProjectInput> | DesignConnectionCreateWithoutProjectInput[] | DesignConnectionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutProjectInput | DesignConnectionCreateOrConnectWithoutProjectInput[]
    upsert?: DesignConnectionUpsertWithWhereUniqueWithoutProjectInput | DesignConnectionUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DesignConnectionCreateManyProjectInputEnvelope
    set?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    disconnect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    delete?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    update?: DesignConnectionUpdateWithWhereUniqueWithoutProjectInput | DesignConnectionUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DesignConnectionUpdateManyWithWhereWithoutProjectInput | DesignConnectionUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
  }

  export type DesignSystemUpdateOneWithoutProjectNestedInput = {
    create?: XOR<DesignSystemCreateWithoutProjectInput, DesignSystemUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignSystemCreateOrConnectWithoutProjectInput
    upsert?: DesignSystemUpsertWithoutProjectInput
    disconnect?: DesignSystemWhereInput | boolean
    delete?: DesignSystemWhereInput | boolean
    connect?: DesignSystemWhereUniqueInput
    update?: XOR<XOR<DesignSystemUpdateToOneWithWhereWithoutProjectInput, DesignSystemUpdateWithoutProjectInput>, DesignSystemUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMembershipUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMembershipCreateWithoutProjectInput, ProjectMembershipUncheckedCreateWithoutProjectInput> | ProjectMembershipCreateWithoutProjectInput[] | ProjectMembershipUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMembershipCreateOrConnectWithoutProjectInput | ProjectMembershipCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMembershipUpsertWithWhereUniqueWithoutProjectInput | ProjectMembershipUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMembershipCreateManyProjectInputEnvelope
    set?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    disconnect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    delete?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    connect?: ProjectMembershipWhereUniqueInput | ProjectMembershipWhereUniqueInput[]
    update?: ProjectMembershipUpdateWithWhereUniqueWithoutProjectInput | ProjectMembershipUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMembershipUpdateManyWithWhereWithoutProjectInput | ProjectMembershipUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
  }

  export type DesignUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DesignCreateWithoutProjectInput, DesignUncheckedCreateWithoutProjectInput> | DesignCreateWithoutProjectInput[] | DesignUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignCreateOrConnectWithoutProjectInput | DesignCreateOrConnectWithoutProjectInput[]
    upsert?: DesignUpsertWithWhereUniqueWithoutProjectInput | DesignUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DesignCreateManyProjectInputEnvelope
    set?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    disconnect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    delete?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    connect?: DesignWhereUniqueInput | DesignWhereUniqueInput[]
    update?: DesignUpdateWithWhereUniqueWithoutProjectInput | DesignUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DesignUpdateManyWithWhereWithoutProjectInput | DesignUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DesignScalarWhereInput | DesignScalarWhereInput[]
  }

  export type ComponentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ComponentCreateWithoutProjectInput, ComponentUncheckedCreateWithoutProjectInput> | ComponentCreateWithoutProjectInput[] | ComponentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ComponentCreateOrConnectWithoutProjectInput | ComponentCreateOrConnectWithoutProjectInput[]
    upsert?: ComponentUpsertWithWhereUniqueWithoutProjectInput | ComponentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ComponentCreateManyProjectInputEnvelope
    set?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    disconnect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    delete?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    connect?: ComponentWhereUniqueInput | ComponentWhereUniqueInput[]
    update?: ComponentUpdateWithWhereUniqueWithoutProjectInput | ComponentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ComponentUpdateManyWithWhereWithoutProjectInput | ComponentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ComponentScalarWhereInput | ComponentScalarWhereInput[]
  }

  export type DesignConnectionUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<DesignConnectionCreateWithoutProjectInput, DesignConnectionUncheckedCreateWithoutProjectInput> | DesignConnectionCreateWithoutProjectInput[] | DesignConnectionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutProjectInput | DesignConnectionCreateOrConnectWithoutProjectInput[]
    upsert?: DesignConnectionUpsertWithWhereUniqueWithoutProjectInput | DesignConnectionUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: DesignConnectionCreateManyProjectInputEnvelope
    set?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    disconnect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    delete?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    update?: DesignConnectionUpdateWithWhereUniqueWithoutProjectInput | DesignConnectionUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: DesignConnectionUpdateManyWithWhereWithoutProjectInput | DesignConnectionUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
  }

  export type DesignSystemUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<DesignSystemCreateWithoutProjectInput, DesignSystemUncheckedCreateWithoutProjectInput>
    connectOrCreate?: DesignSystemCreateOrConnectWithoutProjectInput
    upsert?: DesignSystemUpsertWithoutProjectInput
    disconnect?: DesignSystemWhereInput | boolean
    delete?: DesignSystemWhereInput | boolean
    connect?: DesignSystemWhereUniqueInput
    update?: XOR<XOR<DesignSystemUpdateToOneWithWhereWithoutProjectInput, DesignSystemUpdateWithoutProjectInput>, DesignSystemUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<ProjectCreateWithoutMembershipsInput, ProjectUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembershipsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembershipInvitesInput = {
    create?: XOR<UserCreateWithoutMembershipInvitesInput, UserUncheckedCreateWithoutMembershipInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumProjectRoleFieldUpdateOperationsInput = {
    set?: $Enums.ProjectRole
  }

  export type ProjectUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<ProjectCreateWithoutMembershipsInput, ProjectUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembershipsInput
    upsert?: ProjectUpsertWithoutMembershipsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMembershipsInput, ProjectUpdateWithoutMembershipsInput>, ProjectUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateOneWithoutMembershipInvitesNestedInput = {
    create?: XOR<UserCreateWithoutMembershipInvitesInput, UserUncheckedCreateWithoutMembershipInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipInvitesInput
    upsert?: UserUpsertWithoutMembershipInvitesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipInvitesInput, UserUpdateWithoutMembershipInvitesInput>, UserUncheckedUpdateWithoutMembershipInvitesInput>
  }

  export type ProjectCreateNestedOneWithoutDesignsInput = {
    create?: XOR<ProjectCreateWithoutDesignsInput, ProjectUncheckedCreateWithoutDesignsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDesignsInput = {
    create?: XOR<UserCreateWithoutDesignsInput, UserUncheckedCreateWithoutDesignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDesignsInput
    connect?: UserWhereUniqueInput
  }

  export type DesignConnectionCreateNestedManyWithoutFromDesignInput = {
    create?: XOR<DesignConnectionCreateWithoutFromDesignInput, DesignConnectionUncheckedCreateWithoutFromDesignInput> | DesignConnectionCreateWithoutFromDesignInput[] | DesignConnectionUncheckedCreateWithoutFromDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutFromDesignInput | DesignConnectionCreateOrConnectWithoutFromDesignInput[]
    createMany?: DesignConnectionCreateManyFromDesignInputEnvelope
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
  }

  export type DesignConnectionCreateNestedManyWithoutToDesignInput = {
    create?: XOR<DesignConnectionCreateWithoutToDesignInput, DesignConnectionUncheckedCreateWithoutToDesignInput> | DesignConnectionCreateWithoutToDesignInput[] | DesignConnectionUncheckedCreateWithoutToDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutToDesignInput | DesignConnectionCreateOrConnectWithoutToDesignInput[]
    createMany?: DesignConnectionCreateManyToDesignInputEnvelope
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
  }

  export type DesignConnectionUncheckedCreateNestedManyWithoutFromDesignInput = {
    create?: XOR<DesignConnectionCreateWithoutFromDesignInput, DesignConnectionUncheckedCreateWithoutFromDesignInput> | DesignConnectionCreateWithoutFromDesignInput[] | DesignConnectionUncheckedCreateWithoutFromDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutFromDesignInput | DesignConnectionCreateOrConnectWithoutFromDesignInput[]
    createMany?: DesignConnectionCreateManyFromDesignInputEnvelope
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
  }

  export type DesignConnectionUncheckedCreateNestedManyWithoutToDesignInput = {
    create?: XOR<DesignConnectionCreateWithoutToDesignInput, DesignConnectionUncheckedCreateWithoutToDesignInput> | DesignConnectionCreateWithoutToDesignInput[] | DesignConnectionUncheckedCreateWithoutToDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutToDesignInput | DesignConnectionCreateOrConnectWithoutToDesignInput[]
    createMany?: DesignConnectionCreateManyToDesignInputEnvelope
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
  }

  export type EnumDesignViewModeFieldUpdateOperationsInput = {
    set?: $Enums.DesignViewMode
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutDesignsNestedInput = {
    create?: XOR<ProjectCreateWithoutDesignsInput, ProjectUncheckedCreateWithoutDesignsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignsInput
    upsert?: ProjectUpsertWithoutDesignsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutDesignsInput, ProjectUpdateWithoutDesignsInput>, ProjectUncheckedUpdateWithoutDesignsInput>
  }

  export type UserUpdateOneRequiredWithoutDesignsNestedInput = {
    create?: XOR<UserCreateWithoutDesignsInput, UserUncheckedCreateWithoutDesignsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDesignsInput
    upsert?: UserUpsertWithoutDesignsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDesignsInput, UserUpdateWithoutDesignsInput>, UserUncheckedUpdateWithoutDesignsInput>
  }

  export type DesignConnectionUpdateManyWithoutFromDesignNestedInput = {
    create?: XOR<DesignConnectionCreateWithoutFromDesignInput, DesignConnectionUncheckedCreateWithoutFromDesignInput> | DesignConnectionCreateWithoutFromDesignInput[] | DesignConnectionUncheckedCreateWithoutFromDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutFromDesignInput | DesignConnectionCreateOrConnectWithoutFromDesignInput[]
    upsert?: DesignConnectionUpsertWithWhereUniqueWithoutFromDesignInput | DesignConnectionUpsertWithWhereUniqueWithoutFromDesignInput[]
    createMany?: DesignConnectionCreateManyFromDesignInputEnvelope
    set?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    disconnect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    delete?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    update?: DesignConnectionUpdateWithWhereUniqueWithoutFromDesignInput | DesignConnectionUpdateWithWhereUniqueWithoutFromDesignInput[]
    updateMany?: DesignConnectionUpdateManyWithWhereWithoutFromDesignInput | DesignConnectionUpdateManyWithWhereWithoutFromDesignInput[]
    deleteMany?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
  }

  export type DesignConnectionUpdateManyWithoutToDesignNestedInput = {
    create?: XOR<DesignConnectionCreateWithoutToDesignInput, DesignConnectionUncheckedCreateWithoutToDesignInput> | DesignConnectionCreateWithoutToDesignInput[] | DesignConnectionUncheckedCreateWithoutToDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutToDesignInput | DesignConnectionCreateOrConnectWithoutToDesignInput[]
    upsert?: DesignConnectionUpsertWithWhereUniqueWithoutToDesignInput | DesignConnectionUpsertWithWhereUniqueWithoutToDesignInput[]
    createMany?: DesignConnectionCreateManyToDesignInputEnvelope
    set?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    disconnect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    delete?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    update?: DesignConnectionUpdateWithWhereUniqueWithoutToDesignInput | DesignConnectionUpdateWithWhereUniqueWithoutToDesignInput[]
    updateMany?: DesignConnectionUpdateManyWithWhereWithoutToDesignInput | DesignConnectionUpdateManyWithWhereWithoutToDesignInput[]
    deleteMany?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
  }

  export type DesignConnectionUncheckedUpdateManyWithoutFromDesignNestedInput = {
    create?: XOR<DesignConnectionCreateWithoutFromDesignInput, DesignConnectionUncheckedCreateWithoutFromDesignInput> | DesignConnectionCreateWithoutFromDesignInput[] | DesignConnectionUncheckedCreateWithoutFromDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutFromDesignInput | DesignConnectionCreateOrConnectWithoutFromDesignInput[]
    upsert?: DesignConnectionUpsertWithWhereUniqueWithoutFromDesignInput | DesignConnectionUpsertWithWhereUniqueWithoutFromDesignInput[]
    createMany?: DesignConnectionCreateManyFromDesignInputEnvelope
    set?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    disconnect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    delete?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    update?: DesignConnectionUpdateWithWhereUniqueWithoutFromDesignInput | DesignConnectionUpdateWithWhereUniqueWithoutFromDesignInput[]
    updateMany?: DesignConnectionUpdateManyWithWhereWithoutFromDesignInput | DesignConnectionUpdateManyWithWhereWithoutFromDesignInput[]
    deleteMany?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
  }

  export type DesignConnectionUncheckedUpdateManyWithoutToDesignNestedInput = {
    create?: XOR<DesignConnectionCreateWithoutToDesignInput, DesignConnectionUncheckedCreateWithoutToDesignInput> | DesignConnectionCreateWithoutToDesignInput[] | DesignConnectionUncheckedCreateWithoutToDesignInput[]
    connectOrCreate?: DesignConnectionCreateOrConnectWithoutToDesignInput | DesignConnectionCreateOrConnectWithoutToDesignInput[]
    upsert?: DesignConnectionUpsertWithWhereUniqueWithoutToDesignInput | DesignConnectionUpsertWithWhereUniqueWithoutToDesignInput[]
    createMany?: DesignConnectionCreateManyToDesignInputEnvelope
    set?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    disconnect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    delete?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    connect?: DesignConnectionWhereUniqueInput | DesignConnectionWhereUniqueInput[]
    update?: DesignConnectionUpdateWithWhereUniqueWithoutToDesignInput | DesignConnectionUpdateWithWhereUniqueWithoutToDesignInput[]
    updateMany?: DesignConnectionUpdateManyWithWhereWithoutToDesignInput | DesignConnectionUpdateManyWithWhereWithoutToDesignInput[]
    deleteMany?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutComponentsInput = {
    create?: XOR<ProjectCreateWithoutComponentsInput, ProjectUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutComponentsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutComponentsInput = {
    create?: XOR<UserCreateWithoutComponentsInput, UserUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutComponentsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutComponentsNestedInput = {
    create?: XOR<ProjectCreateWithoutComponentsInput, ProjectUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutComponentsInput
    upsert?: ProjectUpsertWithoutComponentsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutComponentsInput, ProjectUpdateWithoutComponentsInput>, ProjectUncheckedUpdateWithoutComponentsInput>
  }

  export type UserUpdateOneRequiredWithoutComponentsNestedInput = {
    create?: XOR<UserCreateWithoutComponentsInput, UserUncheckedCreateWithoutComponentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutComponentsInput
    upsert?: UserUpsertWithoutComponentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutComponentsInput, UserUpdateWithoutComponentsInput>, UserUncheckedUpdateWithoutComponentsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type ProjectCreateNestedOneWithoutConnectionsInput = {
    create?: XOR<ProjectCreateWithoutConnectionsInput, ProjectUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConnectionsInput
    connect?: ProjectWhereUniqueInput
  }

  export type DesignCreateNestedOneWithoutConnectionsFromInput = {
    create?: XOR<DesignCreateWithoutConnectionsFromInput, DesignUncheckedCreateWithoutConnectionsFromInput>
    connectOrCreate?: DesignCreateOrConnectWithoutConnectionsFromInput
    connect?: DesignWhereUniqueInput
  }

  export type DesignCreateNestedOneWithoutConnectionsToInput = {
    create?: XOR<DesignCreateWithoutConnectionsToInput, DesignUncheckedCreateWithoutConnectionsToInput>
    connectOrCreate?: DesignCreateOrConnectWithoutConnectionsToInput
    connect?: DesignWhereUniqueInput
  }

  export type EnumConnectionPositionFieldUpdateOperationsInput = {
    set?: $Enums.ConnectionPosition
  }

  export type ProjectUpdateOneRequiredWithoutConnectionsNestedInput = {
    create?: XOR<ProjectCreateWithoutConnectionsInput, ProjectUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutConnectionsInput
    upsert?: ProjectUpsertWithoutConnectionsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutConnectionsInput, ProjectUpdateWithoutConnectionsInput>, ProjectUncheckedUpdateWithoutConnectionsInput>
  }

  export type DesignUpdateOneRequiredWithoutConnectionsFromNestedInput = {
    create?: XOR<DesignCreateWithoutConnectionsFromInput, DesignUncheckedCreateWithoutConnectionsFromInput>
    connectOrCreate?: DesignCreateOrConnectWithoutConnectionsFromInput
    upsert?: DesignUpsertWithoutConnectionsFromInput
    connect?: DesignWhereUniqueInput
    update?: XOR<XOR<DesignUpdateToOneWithWhereWithoutConnectionsFromInput, DesignUpdateWithoutConnectionsFromInput>, DesignUncheckedUpdateWithoutConnectionsFromInput>
  }

  export type DesignUpdateOneRequiredWithoutConnectionsToNestedInput = {
    create?: XOR<DesignCreateWithoutConnectionsToInput, DesignUncheckedCreateWithoutConnectionsToInput>
    connectOrCreate?: DesignCreateOrConnectWithoutConnectionsToInput
    upsert?: DesignUpsertWithoutConnectionsToInput
    connect?: DesignWhereUniqueInput
    update?: XOR<XOR<DesignUpdateToOneWithWhereWithoutConnectionsToInput, DesignUpdateWithoutConnectionsToInput>, DesignUncheckedUpdateWithoutConnectionsToInput>
  }

  export type ProjectCreateNestedOneWithoutDesignSystemInput = {
    create?: XOR<ProjectCreateWithoutDesignSystemInput, ProjectUncheckedCreateWithoutDesignSystemInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignSystemInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutDesignSystemNestedInput = {
    create?: XOR<ProjectCreateWithoutDesignSystemInput, ProjectUncheckedCreateWithoutDesignSystemInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutDesignSystemInput
    upsert?: ProjectUpsertWithoutDesignSystemInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutDesignSystemInput, ProjectUpdateWithoutDesignSystemInput>, ProjectUncheckedUpdateWithoutDesignSystemInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumLlmProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.LlmProvider | EnumLlmProviderFieldRefInput<$PrismaModel>
    in?: $Enums.LlmProvider[]
    notIn?: $Enums.LlmProvider[]
    not?: NestedEnumLlmProviderFilter<$PrismaModel> | $Enums.LlmProvider
  }

  export type NestedEnumLlmProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LlmProvider | EnumLlmProviderFieldRefInput<$PrismaModel>
    in?: $Enums.LlmProvider[]
    notIn?: $Enums.LlmProvider[]
    not?: NestedEnumLlmProviderWithAggregatesFilter<$PrismaModel> | $Enums.LlmProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLlmProviderFilter<$PrismaModel>
    _max?: NestedEnumLlmProviderFilter<$PrismaModel>
  }

  export type NestedEnumProjectRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleFilter<$PrismaModel> | $Enums.ProjectRole
  }

  export type NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectRole | EnumProjectRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectRole[]
    notIn?: $Enums.ProjectRole[]
    not?: NestedEnumProjectRoleWithAggregatesFilter<$PrismaModel> | $Enums.ProjectRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectRoleFilter<$PrismaModel>
    _max?: NestedEnumProjectRoleFilter<$PrismaModel>
  }

  export type NestedEnumDesignViewModeFilter<$PrismaModel = never> = {
    equals?: $Enums.DesignViewMode | EnumDesignViewModeFieldRefInput<$PrismaModel>
    in?: $Enums.DesignViewMode[]
    notIn?: $Enums.DesignViewMode[]
    not?: NestedEnumDesignViewModeFilter<$PrismaModel> | $Enums.DesignViewMode
  }

  export type NestedEnumDesignViewModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DesignViewMode | EnumDesignViewModeFieldRefInput<$PrismaModel>
    in?: $Enums.DesignViewMode[]
    notIn?: $Enums.DesignViewMode[]
    not?: NestedEnumDesignViewModeWithAggregatesFilter<$PrismaModel> | $Enums.DesignViewMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDesignViewModeFilter<$PrismaModel>
    _max?: NestedEnumDesignViewModeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumConnectionPositionFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionPosition | EnumConnectionPositionFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionPosition[]
    notIn?: $Enums.ConnectionPosition[]
    not?: NestedEnumConnectionPositionFilter<$PrismaModel> | $Enums.ConnectionPosition
  }

  export type NestedEnumConnectionPositionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionPosition | EnumConnectionPositionFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionPosition[]
    notIn?: $Enums.ConnectionPosition[]
    not?: NestedEnumConnectionPositionWithAggregatesFilter<$PrismaModel> | $Enums.ConnectionPosition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConnectionPositionFilter<$PrismaModel>
    _max?: NestedEnumConnectionPositionFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
  }

  export type ProjectCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: ProjectMembershipCreateNestedManyWithoutProjectInput
    designs?: DesignCreateNestedManyWithoutProjectInput
    components?: ComponentCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutProjectInput
    designs?: DesignUncheckedCreateNestedManyWithoutProjectInput
    components?: ComponentUncheckedCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionUncheckedCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCreatedByInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput>
  }

  export type ProjectCreateManyCreatedByInputEnvelope = {
    data: ProjectCreateManyCreatedByInput | ProjectCreateManyCreatedByInput[]
  }

  export type ProjectMembershipCreateWithoutUserInput = {
    id?: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutMembershipsInput
    invitedBy?: UserCreateNestedOneWithoutMembershipInvitesInput
  }

  export type ProjectMembershipUncheckedCreateWithoutUserInput = {
    id?: string
    projectId: string
    role?: $Enums.ProjectRole
    invitedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipCreateOrConnectWithoutUserInput = {
    where: ProjectMembershipWhereUniqueInput
    create: XOR<ProjectMembershipCreateWithoutUserInput, ProjectMembershipUncheckedCreateWithoutUserInput>
  }

  export type ProjectMembershipCreateManyUserInputEnvelope = {
    data: ProjectMembershipCreateManyUserInput | ProjectMembershipCreateManyUserInput[]
  }

  export type DesignCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDesignsInput
    connectionsFrom?: DesignConnectionCreateNestedManyWithoutFromDesignInput
    connectionsTo?: DesignConnectionCreateNestedManyWithoutToDesignInput
  }

  export type DesignUncheckedCreateWithoutCreatedByInput = {
    id?: string
    projectId: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    connectionsFrom?: DesignConnectionUncheckedCreateNestedManyWithoutFromDesignInput
    connectionsTo?: DesignConnectionUncheckedCreateNestedManyWithoutToDesignInput
  }

  export type DesignCreateOrConnectWithoutCreatedByInput = {
    where: DesignWhereUniqueInput
    create: XOR<DesignCreateWithoutCreatedByInput, DesignUncheckedCreateWithoutCreatedByInput>
  }

  export type DesignCreateManyCreatedByInputEnvelope = {
    data: DesignCreateManyCreatedByInput | DesignCreateManyCreatedByInput[]
  }

  export type ComponentCreateWithoutCreatedByInput = {
    id?: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutComponentsInput
  }

  export type ComponentUncheckedCreateWithoutCreatedByInput = {
    id?: string
    projectId: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComponentCreateOrConnectWithoutCreatedByInput = {
    where: ComponentWhereUniqueInput
    create: XOR<ComponentCreateWithoutCreatedByInput, ComponentUncheckedCreateWithoutCreatedByInput>
  }

  export type ComponentCreateManyCreatedByInputEnvelope = {
    data: ComponentCreateManyCreatedByInput | ComponentCreateManyCreatedByInput[]
  }

  export type ProjectMembershipCreateWithoutInvitedByInput = {
    id?: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutMembershipsInput
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type ProjectMembershipUncheckedCreateWithoutInvitedByInput = {
    id?: string
    projectId: string
    userId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipCreateOrConnectWithoutInvitedByInput = {
    where: ProjectMembershipWhereUniqueInput
    create: XOR<ProjectMembershipCreateWithoutInvitedByInput, ProjectMembershipUncheckedCreateWithoutInvitedByInput>
  }

  export type ProjectMembershipCreateManyInvitedByInputEnvelope = {
    data: ProjectMembershipCreateManyInvitedByInput | ProjectMembershipCreateManyInvitedByInput[]
  }

  export type LlmApiKeyCreateWithoutUserInput = {
    id?: string
    provider: $Enums.LlmProvider
    apiKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LlmApiKeyUncheckedCreateWithoutUserInput = {
    id?: string
    provider: $Enums.LlmProvider
    apiKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LlmApiKeyCreateOrConnectWithoutUserInput = {
    where: LlmApiKeyWhereUniqueInput
    create: XOR<LlmApiKeyCreateWithoutUserInput, LlmApiKeyUncheckedCreateWithoutUserInput>
  }

  export type LlmApiKeyCreateManyUserInputEnvelope = {
    data: LlmApiKeyCreateManyUserInput | LlmApiKeyCreateManyUserInput[]
  }

  export type ApiKeyCreateWithoutUserInput = {
    id?: string
    name?: string | null
    key?: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateWithoutUserInput = {
    id?: string
    name?: string | null
    key?: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyCreateManyUserInputEnvelope = {
    data: ApiKeyCreateManyUserInput | ApiKeyCreateManyUserInput[]
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutCreatedByInput, ProjectUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ProjectCreateWithoutCreatedByInput, ProjectUncheckedCreateWithoutCreatedByInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutCreatedByInput, ProjectUncheckedUpdateWithoutCreatedByInput>
  }

  export type ProjectUpdateManyWithWhereWithoutCreatedByInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdById?: StringFilter<"Project"> | string
  }

  export type ProjectMembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectMembershipWhereUniqueInput
    update: XOR<ProjectMembershipUpdateWithoutUserInput, ProjectMembershipUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectMembershipCreateWithoutUserInput, ProjectMembershipUncheckedCreateWithoutUserInput>
  }

  export type ProjectMembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectMembershipWhereUniqueInput
    data: XOR<ProjectMembershipUpdateWithoutUserInput, ProjectMembershipUncheckedUpdateWithoutUserInput>
  }

  export type ProjectMembershipUpdateManyWithWhereWithoutUserInput = {
    where: ProjectMembershipScalarWhereInput
    data: XOR<ProjectMembershipUpdateManyMutationInput, ProjectMembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectMembershipScalarWhereInput = {
    AND?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
    OR?: ProjectMembershipScalarWhereInput[]
    NOT?: ProjectMembershipScalarWhereInput | ProjectMembershipScalarWhereInput[]
    id?: StringFilter<"ProjectMembership"> | string
    projectId?: StringFilter<"ProjectMembership"> | string
    userId?: StringFilter<"ProjectMembership"> | string
    role?: EnumProjectRoleFilter<"ProjectMembership"> | $Enums.ProjectRole
    invitedById?: StringNullableFilter<"ProjectMembership"> | string | null
    createdAt?: DateTimeFilter<"ProjectMembership"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectMembership"> | Date | string
  }

  export type DesignUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: DesignWhereUniqueInput
    update: XOR<DesignUpdateWithoutCreatedByInput, DesignUncheckedUpdateWithoutCreatedByInput>
    create: XOR<DesignCreateWithoutCreatedByInput, DesignUncheckedCreateWithoutCreatedByInput>
  }

  export type DesignUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: DesignWhereUniqueInput
    data: XOR<DesignUpdateWithoutCreatedByInput, DesignUncheckedUpdateWithoutCreatedByInput>
  }

  export type DesignUpdateManyWithWhereWithoutCreatedByInput = {
    where: DesignScalarWhereInput
    data: XOR<DesignUpdateManyMutationInput, DesignUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type DesignScalarWhereInput = {
    AND?: DesignScalarWhereInput | DesignScalarWhereInput[]
    OR?: DesignScalarWhereInput[]
    NOT?: DesignScalarWhereInput | DesignScalarWhereInput[]
    id?: StringFilter<"Design"> | string
    projectId?: StringFilter<"Design"> | string
    createdById?: StringFilter<"Design"> | string
    name?: StringFilter<"Design"> | string
    description?: StringNullableFilter<"Design"> | string | null
    html?: StringFilter<"Design"> | string
    position?: JsonNullableFilter<"Design">
    size?: JsonNullableFilter<"Design">
    viewMode?: EnumDesignViewModeFilter<"Design"> | $Enums.DesignViewMode
    history?: JsonNullableFilter<"Design">
    tokens?: JsonNullableFilter<"Design">
    data?: JsonNullableFilter<"Design">
    version?: IntFilter<"Design"> | number
    createdAt?: DateTimeFilter<"Design"> | Date | string
    updatedAt?: DateTimeFilter<"Design"> | Date | string
  }

  export type ComponentUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ComponentWhereUniqueInput
    update: XOR<ComponentUpdateWithoutCreatedByInput, ComponentUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ComponentCreateWithoutCreatedByInput, ComponentUncheckedCreateWithoutCreatedByInput>
  }

  export type ComponentUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ComponentWhereUniqueInput
    data: XOR<ComponentUpdateWithoutCreatedByInput, ComponentUncheckedUpdateWithoutCreatedByInput>
  }

  export type ComponentUpdateManyWithWhereWithoutCreatedByInput = {
    where: ComponentScalarWhereInput
    data: XOR<ComponentUpdateManyMutationInput, ComponentUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ComponentScalarWhereInput = {
    AND?: ComponentScalarWhereInput | ComponentScalarWhereInput[]
    OR?: ComponentScalarWhereInput[]
    NOT?: ComponentScalarWhereInput | ComponentScalarWhereInput[]
    id?: StringFilter<"Component"> | string
    projectId?: StringFilter<"Component"> | string
    createdById?: StringFilter<"Component"> | string
    name?: StringFilter<"Component"> | string
    html?: StringFilter<"Component"> | string
    createdAt?: DateTimeFilter<"Component"> | Date | string
    updatedAt?: DateTimeFilter<"Component"> | Date | string
  }

  export type ProjectMembershipUpsertWithWhereUniqueWithoutInvitedByInput = {
    where: ProjectMembershipWhereUniqueInput
    update: XOR<ProjectMembershipUpdateWithoutInvitedByInput, ProjectMembershipUncheckedUpdateWithoutInvitedByInput>
    create: XOR<ProjectMembershipCreateWithoutInvitedByInput, ProjectMembershipUncheckedCreateWithoutInvitedByInput>
  }

  export type ProjectMembershipUpdateWithWhereUniqueWithoutInvitedByInput = {
    where: ProjectMembershipWhereUniqueInput
    data: XOR<ProjectMembershipUpdateWithoutInvitedByInput, ProjectMembershipUncheckedUpdateWithoutInvitedByInput>
  }

  export type ProjectMembershipUpdateManyWithWhereWithoutInvitedByInput = {
    where: ProjectMembershipScalarWhereInput
    data: XOR<ProjectMembershipUpdateManyMutationInput, ProjectMembershipUncheckedUpdateManyWithoutInvitedByInput>
  }

  export type LlmApiKeyUpsertWithWhereUniqueWithoutUserInput = {
    where: LlmApiKeyWhereUniqueInput
    update: XOR<LlmApiKeyUpdateWithoutUserInput, LlmApiKeyUncheckedUpdateWithoutUserInput>
    create: XOR<LlmApiKeyCreateWithoutUserInput, LlmApiKeyUncheckedCreateWithoutUserInput>
  }

  export type LlmApiKeyUpdateWithWhereUniqueWithoutUserInput = {
    where: LlmApiKeyWhereUniqueInput
    data: XOR<LlmApiKeyUpdateWithoutUserInput, LlmApiKeyUncheckedUpdateWithoutUserInput>
  }

  export type LlmApiKeyUpdateManyWithWhereWithoutUserInput = {
    where: LlmApiKeyScalarWhereInput
    data: XOR<LlmApiKeyUpdateManyMutationInput, LlmApiKeyUncheckedUpdateManyWithoutUserInput>
  }

  export type LlmApiKeyScalarWhereInput = {
    AND?: LlmApiKeyScalarWhereInput | LlmApiKeyScalarWhereInput[]
    OR?: LlmApiKeyScalarWhereInput[]
    NOT?: LlmApiKeyScalarWhereInput | LlmApiKeyScalarWhereInput[]
    id?: StringFilter<"LlmApiKey"> | string
    provider?: EnumLlmProviderFilter<"LlmApiKey"> | $Enums.LlmProvider
    apiKey?: StringFilter<"LlmApiKey"> | string
    userId?: StringFilter<"LlmApiKey"> | string
    createdAt?: DateTimeFilter<"LlmApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"LlmApiKey"> | Date | string
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutUserInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutUserInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    OR?: ApiKeyScalarWhereInput[]
    NOT?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    name?: StringNullableFilter<"ApiKey"> | string | null
    key?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    userId?: StringFilter<"ApiKey"> | string
  }

  export type UserCreateWithoutApiKeysInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApiKeysInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApiKeysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
  }

  export type UserUpsertWithoutApiKeysInput = {
    update: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
  }

  export type UserUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLlmApiKeysInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLlmApiKeysInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLlmApiKeysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLlmApiKeysInput, UserUncheckedCreateWithoutLlmApiKeysInput>
  }

  export type UserUpsertWithoutLlmApiKeysInput = {
    update: XOR<UserUpdateWithoutLlmApiKeysInput, UserUncheckedUpdateWithoutLlmApiKeysInput>
    create: XOR<UserCreateWithoutLlmApiKeysInput, UserUncheckedCreateWithoutLlmApiKeysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLlmApiKeysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLlmApiKeysInput, UserUncheckedUpdateWithoutLlmApiKeysInput>
  }

  export type UserUpdateWithoutLlmApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLlmApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjectsOwnedInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsOwnedInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsOwnedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsOwnedInput, UserUncheckedCreateWithoutProjectsOwnedInput>
  }

  export type ProjectMembershipCreateWithoutProjectInput = {
    id?: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    invitedBy?: UserCreateNestedOneWithoutMembershipInvitesInput
  }

  export type ProjectMembershipUncheckedCreateWithoutProjectInput = {
    id?: string
    userId: string
    role?: $Enums.ProjectRole
    invitedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipCreateOrConnectWithoutProjectInput = {
    where: ProjectMembershipWhereUniqueInput
    create: XOR<ProjectMembershipCreateWithoutProjectInput, ProjectMembershipUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMembershipCreateManyProjectInputEnvelope = {
    data: ProjectMembershipCreateManyProjectInput | ProjectMembershipCreateManyProjectInput[]
  }

  export type DesignCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutDesignsInput
    connectionsFrom?: DesignConnectionCreateNestedManyWithoutFromDesignInput
    connectionsTo?: DesignConnectionCreateNestedManyWithoutToDesignInput
  }

  export type DesignUncheckedCreateWithoutProjectInput = {
    id?: string
    createdById: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    connectionsFrom?: DesignConnectionUncheckedCreateNestedManyWithoutFromDesignInput
    connectionsTo?: DesignConnectionUncheckedCreateNestedManyWithoutToDesignInput
  }

  export type DesignCreateOrConnectWithoutProjectInput = {
    where: DesignWhereUniqueInput
    create: XOR<DesignCreateWithoutProjectInput, DesignUncheckedCreateWithoutProjectInput>
  }

  export type DesignCreateManyProjectInputEnvelope = {
    data: DesignCreateManyProjectInput | DesignCreateManyProjectInput[]
  }

  export type ComponentCreateWithoutProjectInput = {
    id?: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutComponentsInput
  }

  export type ComponentUncheckedCreateWithoutProjectInput = {
    id?: string
    createdById: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComponentCreateOrConnectWithoutProjectInput = {
    where: ComponentWhereUniqueInput
    create: XOR<ComponentCreateWithoutProjectInput, ComponentUncheckedCreateWithoutProjectInput>
  }

  export type ComponentCreateManyProjectInputEnvelope = {
    data: ComponentCreateManyProjectInput | ComponentCreateManyProjectInput[]
  }

  export type DesignConnectionCreateWithoutProjectInput = {
    id?: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
    fromDesign: DesignCreateNestedOneWithoutConnectionsFromInput
    toDesign: DesignCreateNestedOneWithoutConnectionsToInput
  }

  export type DesignConnectionUncheckedCreateWithoutProjectInput = {
    id?: string
    fromDesignId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionCreateOrConnectWithoutProjectInput = {
    where: DesignConnectionWhereUniqueInput
    create: XOR<DesignConnectionCreateWithoutProjectInput, DesignConnectionUncheckedCreateWithoutProjectInput>
  }

  export type DesignConnectionCreateManyProjectInputEnvelope = {
    data: DesignConnectionCreateManyProjectInput | DesignConnectionCreateManyProjectInput[]
  }

  export type DesignSystemCreateWithoutProjectInput = {
    id?: string
    name?: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    typography: JsonNullValueInput | InputJsonValue
    spacing: JsonNullValueInput | InputJsonValue
    radius: JsonNullValueInput | InputJsonValue
    type?: string
    presetName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignSystemUncheckedCreateWithoutProjectInput = {
    id?: string
    name?: string
    description?: string | null
    colors: JsonNullValueInput | InputJsonValue
    typography: JsonNullValueInput | InputJsonValue
    spacing: JsonNullValueInput | InputJsonValue
    radius: JsonNullValueInput | InputJsonValue
    type?: string
    presetName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignSystemCreateOrConnectWithoutProjectInput = {
    where: DesignSystemWhereUniqueInput
    create: XOR<DesignSystemCreateWithoutProjectInput, DesignSystemUncheckedCreateWithoutProjectInput>
  }

  export type UserUpsertWithoutProjectsOwnedInput = {
    update: XOR<UserUpdateWithoutProjectsOwnedInput, UserUncheckedUpdateWithoutProjectsOwnedInput>
    create: XOR<UserCreateWithoutProjectsOwnedInput, UserUncheckedCreateWithoutProjectsOwnedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsOwnedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsOwnedInput, UserUncheckedUpdateWithoutProjectsOwnedInput>
  }

  export type UserUpdateWithoutProjectsOwnedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsOwnedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectMembershipUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectMembershipWhereUniqueInput
    update: XOR<ProjectMembershipUpdateWithoutProjectInput, ProjectMembershipUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectMembershipCreateWithoutProjectInput, ProjectMembershipUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMembershipUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectMembershipWhereUniqueInput
    data: XOR<ProjectMembershipUpdateWithoutProjectInput, ProjectMembershipUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMembershipUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectMembershipScalarWhereInput
    data: XOR<ProjectMembershipUpdateManyMutationInput, ProjectMembershipUncheckedUpdateManyWithoutProjectInput>
  }

  export type DesignUpsertWithWhereUniqueWithoutProjectInput = {
    where: DesignWhereUniqueInput
    update: XOR<DesignUpdateWithoutProjectInput, DesignUncheckedUpdateWithoutProjectInput>
    create: XOR<DesignCreateWithoutProjectInput, DesignUncheckedCreateWithoutProjectInput>
  }

  export type DesignUpdateWithWhereUniqueWithoutProjectInput = {
    where: DesignWhereUniqueInput
    data: XOR<DesignUpdateWithoutProjectInput, DesignUncheckedUpdateWithoutProjectInput>
  }

  export type DesignUpdateManyWithWhereWithoutProjectInput = {
    where: DesignScalarWhereInput
    data: XOR<DesignUpdateManyMutationInput, DesignUncheckedUpdateManyWithoutProjectInput>
  }

  export type ComponentUpsertWithWhereUniqueWithoutProjectInput = {
    where: ComponentWhereUniqueInput
    update: XOR<ComponentUpdateWithoutProjectInput, ComponentUncheckedUpdateWithoutProjectInput>
    create: XOR<ComponentCreateWithoutProjectInput, ComponentUncheckedCreateWithoutProjectInput>
  }

  export type ComponentUpdateWithWhereUniqueWithoutProjectInput = {
    where: ComponentWhereUniqueInput
    data: XOR<ComponentUpdateWithoutProjectInput, ComponentUncheckedUpdateWithoutProjectInput>
  }

  export type ComponentUpdateManyWithWhereWithoutProjectInput = {
    where: ComponentScalarWhereInput
    data: XOR<ComponentUpdateManyMutationInput, ComponentUncheckedUpdateManyWithoutProjectInput>
  }

  export type DesignConnectionUpsertWithWhereUniqueWithoutProjectInput = {
    where: DesignConnectionWhereUniqueInput
    update: XOR<DesignConnectionUpdateWithoutProjectInput, DesignConnectionUncheckedUpdateWithoutProjectInput>
    create: XOR<DesignConnectionCreateWithoutProjectInput, DesignConnectionUncheckedCreateWithoutProjectInput>
  }

  export type DesignConnectionUpdateWithWhereUniqueWithoutProjectInput = {
    where: DesignConnectionWhereUniqueInput
    data: XOR<DesignConnectionUpdateWithoutProjectInput, DesignConnectionUncheckedUpdateWithoutProjectInput>
  }

  export type DesignConnectionUpdateManyWithWhereWithoutProjectInput = {
    where: DesignConnectionScalarWhereInput
    data: XOR<DesignConnectionUpdateManyMutationInput, DesignConnectionUncheckedUpdateManyWithoutProjectInput>
  }

  export type DesignConnectionScalarWhereInput = {
    AND?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
    OR?: DesignConnectionScalarWhereInput[]
    NOT?: DesignConnectionScalarWhereInput | DesignConnectionScalarWhereInput[]
    id?: StringFilter<"DesignConnection"> | string
    projectId?: StringFilter<"DesignConnection"> | string
    fromDesignId?: StringFilter<"DesignConnection"> | string
    toDesignId?: StringFilter<"DesignConnection"> | string
    fromPosition?: EnumConnectionPositionFilter<"DesignConnection"> | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFilter<"DesignConnection"> | $Enums.ConnectionPosition
    createdAt?: DateTimeFilter<"DesignConnection"> | Date | string
    updatedAt?: DateTimeFilter<"DesignConnection"> | Date | string
  }

  export type DesignSystemUpsertWithoutProjectInput = {
    update: XOR<DesignSystemUpdateWithoutProjectInput, DesignSystemUncheckedUpdateWithoutProjectInput>
    create: XOR<DesignSystemCreateWithoutProjectInput, DesignSystemUncheckedCreateWithoutProjectInput>
    where?: DesignSystemWhereInput
  }

  export type DesignSystemUpdateToOneWithWhereWithoutProjectInput = {
    where?: DesignSystemWhereInput
    data: XOR<DesignSystemUpdateWithoutProjectInput, DesignSystemUncheckedUpdateWithoutProjectInput>
  }

  export type DesignSystemUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    typography?: JsonNullValueInput | InputJsonValue
    spacing?: JsonNullValueInput | InputJsonValue
    radius?: JsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    presetName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignSystemUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    colors?: JsonNullValueInput | InputJsonValue
    typography?: JsonNullValueInput | InputJsonValue
    spacing?: JsonNullValueInput | InputJsonValue
    radius?: JsonNullValueInput | InputJsonValue
    type?: StringFieldUpdateOperationsInput | string
    presetName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateWithoutMembershipsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutProjectsOwnedInput
    designs?: DesignCreateNestedManyWithoutProjectInput
    components?: ComponentCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    designs?: DesignUncheckedCreateNestedManyWithoutProjectInput
    components?: ComponentUncheckedCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionUncheckedCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMembershipsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMembershipsInput, ProjectUncheckedCreateWithoutMembershipsInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type UserCreateWithoutMembershipInvitesInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipInvitesInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipInvitesInput, UserUncheckedCreateWithoutMembershipInvitesInput>
  }

  export type ProjectUpsertWithoutMembershipsInput = {
    update: XOR<ProjectUpdateWithoutMembershipsInput, ProjectUncheckedUpdateWithoutMembershipsInput>
    create: XOR<ProjectCreateWithoutMembershipsInput, ProjectUncheckedCreateWithoutMembershipsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMembershipsInput, ProjectUncheckedUpdateWithoutMembershipsInput>
  }

  export type ProjectUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutProjectsOwnedNestedInput
    designs?: DesignUpdateManyWithoutProjectNestedInput
    components?: ComponentUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    designs?: DesignUncheckedUpdateManyWithoutProjectNestedInput
    components?: ComponentUncheckedUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUncheckedUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutMembershipInvitesInput = {
    update: XOR<UserUpdateWithoutMembershipInvitesInput, UserUncheckedUpdateWithoutMembershipInvitesInput>
    create: XOR<UserCreateWithoutMembershipInvitesInput, UserUncheckedCreateWithoutMembershipInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipInvitesInput, UserUncheckedUpdateWithoutMembershipInvitesInput>
  }

  export type UserUpdateWithoutMembershipInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutDesignsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutProjectsOwnedInput
    memberships?: ProjectMembershipCreateNestedManyWithoutProjectInput
    components?: ComponentCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutDesignsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutProjectInput
    components?: ComponentUncheckedCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionUncheckedCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutDesignsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutDesignsInput, ProjectUncheckedCreateWithoutDesignsInput>
  }

  export type UserCreateWithoutDesignsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDesignsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDesignsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDesignsInput, UserUncheckedCreateWithoutDesignsInput>
  }

  export type DesignConnectionCreateWithoutFromDesignInput = {
    id?: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutConnectionsInput
    toDesign: DesignCreateNestedOneWithoutConnectionsToInput
  }

  export type DesignConnectionUncheckedCreateWithoutFromDesignInput = {
    id?: string
    projectId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionCreateOrConnectWithoutFromDesignInput = {
    where: DesignConnectionWhereUniqueInput
    create: XOR<DesignConnectionCreateWithoutFromDesignInput, DesignConnectionUncheckedCreateWithoutFromDesignInput>
  }

  export type DesignConnectionCreateManyFromDesignInputEnvelope = {
    data: DesignConnectionCreateManyFromDesignInput | DesignConnectionCreateManyFromDesignInput[]
  }

  export type DesignConnectionCreateWithoutToDesignInput = {
    id?: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutConnectionsInput
    fromDesign: DesignCreateNestedOneWithoutConnectionsFromInput
  }

  export type DesignConnectionUncheckedCreateWithoutToDesignInput = {
    id?: string
    projectId: string
    fromDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionCreateOrConnectWithoutToDesignInput = {
    where: DesignConnectionWhereUniqueInput
    create: XOR<DesignConnectionCreateWithoutToDesignInput, DesignConnectionUncheckedCreateWithoutToDesignInput>
  }

  export type DesignConnectionCreateManyToDesignInputEnvelope = {
    data: DesignConnectionCreateManyToDesignInput | DesignConnectionCreateManyToDesignInput[]
  }

  export type ProjectUpsertWithoutDesignsInput = {
    update: XOR<ProjectUpdateWithoutDesignsInput, ProjectUncheckedUpdateWithoutDesignsInput>
    create: XOR<ProjectCreateWithoutDesignsInput, ProjectUncheckedCreateWithoutDesignsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutDesignsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutDesignsInput, ProjectUncheckedUpdateWithoutDesignsInput>
  }

  export type ProjectUpdateWithoutDesignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutProjectsOwnedNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutProjectNestedInput
    components?: ComponentUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutDesignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutProjectNestedInput
    components?: ComponentUncheckedUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUncheckedUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type UserUpsertWithoutDesignsInput = {
    update: XOR<UserUpdateWithoutDesignsInput, UserUncheckedUpdateWithoutDesignsInput>
    create: XOR<UserCreateWithoutDesignsInput, UserUncheckedCreateWithoutDesignsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDesignsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDesignsInput, UserUncheckedUpdateWithoutDesignsInput>
  }

  export type UserUpdateWithoutDesignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDesignsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DesignConnectionUpsertWithWhereUniqueWithoutFromDesignInput = {
    where: DesignConnectionWhereUniqueInput
    update: XOR<DesignConnectionUpdateWithoutFromDesignInput, DesignConnectionUncheckedUpdateWithoutFromDesignInput>
    create: XOR<DesignConnectionCreateWithoutFromDesignInput, DesignConnectionUncheckedCreateWithoutFromDesignInput>
  }

  export type DesignConnectionUpdateWithWhereUniqueWithoutFromDesignInput = {
    where: DesignConnectionWhereUniqueInput
    data: XOR<DesignConnectionUpdateWithoutFromDesignInput, DesignConnectionUncheckedUpdateWithoutFromDesignInput>
  }

  export type DesignConnectionUpdateManyWithWhereWithoutFromDesignInput = {
    where: DesignConnectionScalarWhereInput
    data: XOR<DesignConnectionUpdateManyMutationInput, DesignConnectionUncheckedUpdateManyWithoutFromDesignInput>
  }

  export type DesignConnectionUpsertWithWhereUniqueWithoutToDesignInput = {
    where: DesignConnectionWhereUniqueInput
    update: XOR<DesignConnectionUpdateWithoutToDesignInput, DesignConnectionUncheckedUpdateWithoutToDesignInput>
    create: XOR<DesignConnectionCreateWithoutToDesignInput, DesignConnectionUncheckedCreateWithoutToDesignInput>
  }

  export type DesignConnectionUpdateWithWhereUniqueWithoutToDesignInput = {
    where: DesignConnectionWhereUniqueInput
    data: XOR<DesignConnectionUpdateWithoutToDesignInput, DesignConnectionUncheckedUpdateWithoutToDesignInput>
  }

  export type DesignConnectionUpdateManyWithWhereWithoutToDesignInput = {
    where: DesignConnectionScalarWhereInput
    data: XOR<DesignConnectionUpdateManyMutationInput, DesignConnectionUncheckedUpdateManyWithoutToDesignInput>
  }

  export type ProjectCreateWithoutComponentsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutProjectsOwnedInput
    memberships?: ProjectMembershipCreateNestedManyWithoutProjectInput
    designs?: DesignCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutComponentsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutProjectInput
    designs?: DesignUncheckedCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionUncheckedCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutComponentsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutComponentsInput, ProjectUncheckedCreateWithoutComponentsInput>
  }

  export type UserCreateWithoutComponentsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutComponentsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutComponentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutComponentsInput, UserUncheckedCreateWithoutComponentsInput>
  }

  export type ProjectUpsertWithoutComponentsInput = {
    update: XOR<ProjectUpdateWithoutComponentsInput, ProjectUncheckedUpdateWithoutComponentsInput>
    create: XOR<ProjectCreateWithoutComponentsInput, ProjectUncheckedCreateWithoutComponentsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutComponentsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutComponentsInput, ProjectUncheckedUpdateWithoutComponentsInput>
  }

  export type ProjectUpdateWithoutComponentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutProjectsOwnedNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutProjectNestedInput
    designs?: DesignUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutComponentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutProjectNestedInput
    designs?: DesignUncheckedUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUncheckedUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type UserUpsertWithoutComponentsInput = {
    update: XOR<UserUpdateWithoutComponentsInput, UserUncheckedUpdateWithoutComponentsInput>
    create: XOR<UserCreateWithoutComponentsInput, UserUncheckedCreateWithoutComponentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutComponentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutComponentsInput, UserUncheckedUpdateWithoutComponentsInput>
  }

  export type UserUpdateWithoutComponentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutComponentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    accounts?: AccountCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipCreateNestedManyWithoutUserInput
    designs?: DesignCreateNestedManyWithoutCreatedByInput
    components?: ComponentCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    projectsOwned?: ProjectUncheckedCreateNestedManyWithoutCreatedByInput
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutUserInput
    designs?: DesignUncheckedCreateNestedManyWithoutCreatedByInput
    components?: ComponentUncheckedCreateNestedManyWithoutCreatedByInput
    membershipInvites?: ProjectMembershipUncheckedCreateNestedManyWithoutInvitedByInput
    llmApiKeys?: LlmApiKeyUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutUserNestedInput
    designs?: DesignUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    llmPreferences?: NullableJsonNullValueInput | InputJsonValue
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    projectsOwned?: ProjectUncheckedUpdateManyWithoutCreatedByNestedInput
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutUserNestedInput
    designs?: DesignUncheckedUpdateManyWithoutCreatedByNestedInput
    components?: ComponentUncheckedUpdateManyWithoutCreatedByNestedInput
    membershipInvites?: ProjectMembershipUncheckedUpdateManyWithoutInvitedByNestedInput
    llmApiKeys?: LlmApiKeyUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutConnectionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutProjectsOwnedInput
    memberships?: ProjectMembershipCreateNestedManyWithoutProjectInput
    designs?: DesignCreateNestedManyWithoutProjectInput
    components?: ComponentCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutConnectionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutProjectInput
    designs?: DesignUncheckedCreateNestedManyWithoutProjectInput
    components?: ComponentUncheckedCreateNestedManyWithoutProjectInput
    designSystem?: DesignSystemUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutConnectionsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutConnectionsInput, ProjectUncheckedCreateWithoutConnectionsInput>
  }

  export type DesignCreateWithoutConnectionsFromInput = {
    id?: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDesignsInput
    createdBy: UserCreateNestedOneWithoutDesignsInput
    connectionsTo?: DesignConnectionCreateNestedManyWithoutToDesignInput
  }

  export type DesignUncheckedCreateWithoutConnectionsFromInput = {
    id?: string
    projectId: string
    createdById: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    connectionsTo?: DesignConnectionUncheckedCreateNestedManyWithoutToDesignInput
  }

  export type DesignCreateOrConnectWithoutConnectionsFromInput = {
    where: DesignWhereUniqueInput
    create: XOR<DesignCreateWithoutConnectionsFromInput, DesignUncheckedCreateWithoutConnectionsFromInput>
  }

  export type DesignCreateWithoutConnectionsToInput = {
    id?: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutDesignsInput
    createdBy: UserCreateNestedOneWithoutDesignsInput
    connectionsFrom?: DesignConnectionCreateNestedManyWithoutFromDesignInput
  }

  export type DesignUncheckedCreateWithoutConnectionsToInput = {
    id?: string
    projectId: string
    createdById: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    connectionsFrom?: DesignConnectionUncheckedCreateNestedManyWithoutFromDesignInput
  }

  export type DesignCreateOrConnectWithoutConnectionsToInput = {
    where: DesignWhereUniqueInput
    create: XOR<DesignCreateWithoutConnectionsToInput, DesignUncheckedCreateWithoutConnectionsToInput>
  }

  export type ProjectUpsertWithoutConnectionsInput = {
    update: XOR<ProjectUpdateWithoutConnectionsInput, ProjectUncheckedUpdateWithoutConnectionsInput>
    create: XOR<ProjectCreateWithoutConnectionsInput, ProjectUncheckedCreateWithoutConnectionsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutConnectionsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutConnectionsInput, ProjectUncheckedUpdateWithoutConnectionsInput>
  }

  export type ProjectUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutProjectsOwnedNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutProjectNestedInput
    designs?: DesignUpdateManyWithoutProjectNestedInput
    components?: ComponentUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutProjectNestedInput
    designs?: DesignUncheckedUpdateManyWithoutProjectNestedInput
    components?: ComponentUncheckedUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type DesignUpsertWithoutConnectionsFromInput = {
    update: XOR<DesignUpdateWithoutConnectionsFromInput, DesignUncheckedUpdateWithoutConnectionsFromInput>
    create: XOR<DesignCreateWithoutConnectionsFromInput, DesignUncheckedCreateWithoutConnectionsFromInput>
    where?: DesignWhereInput
  }

  export type DesignUpdateToOneWithWhereWithoutConnectionsFromInput = {
    where?: DesignWhereInput
    data: XOR<DesignUpdateWithoutConnectionsFromInput, DesignUncheckedUpdateWithoutConnectionsFromInput>
  }

  export type DesignUpdateWithoutConnectionsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDesignsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutDesignsNestedInput
    connectionsTo?: DesignConnectionUpdateManyWithoutToDesignNestedInput
  }

  export type DesignUncheckedUpdateWithoutConnectionsFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectionsTo?: DesignConnectionUncheckedUpdateManyWithoutToDesignNestedInput
  }

  export type DesignUpsertWithoutConnectionsToInput = {
    update: XOR<DesignUpdateWithoutConnectionsToInput, DesignUncheckedUpdateWithoutConnectionsToInput>
    create: XOR<DesignCreateWithoutConnectionsToInput, DesignUncheckedCreateWithoutConnectionsToInput>
    where?: DesignWhereInput
  }

  export type DesignUpdateToOneWithWhereWithoutConnectionsToInput = {
    where?: DesignWhereInput
    data: XOR<DesignUpdateWithoutConnectionsToInput, DesignUncheckedUpdateWithoutConnectionsToInput>
  }

  export type DesignUpdateWithoutConnectionsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDesignsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutDesignsNestedInput
    connectionsFrom?: DesignConnectionUpdateManyWithoutFromDesignNestedInput
  }

  export type DesignUncheckedUpdateWithoutConnectionsToInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectionsFrom?: DesignConnectionUncheckedUpdateManyWithoutFromDesignNestedInput
  }

  export type ProjectCreateWithoutDesignSystemInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutProjectsOwnedInput
    memberships?: ProjectMembershipCreateNestedManyWithoutProjectInput
    designs?: DesignCreateNestedManyWithoutProjectInput
    components?: ComponentCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutDesignSystemInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    memberships?: ProjectMembershipUncheckedCreateNestedManyWithoutProjectInput
    designs?: DesignUncheckedCreateNestedManyWithoutProjectInput
    components?: ComponentUncheckedCreateNestedManyWithoutProjectInput
    connections?: DesignConnectionUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutDesignSystemInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutDesignSystemInput, ProjectUncheckedCreateWithoutDesignSystemInput>
  }

  export type ProjectUpsertWithoutDesignSystemInput = {
    update: XOR<ProjectUpdateWithoutDesignSystemInput, ProjectUncheckedUpdateWithoutDesignSystemInput>
    create: XOR<ProjectCreateWithoutDesignSystemInput, ProjectUncheckedCreateWithoutDesignSystemInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutDesignSystemInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutDesignSystemInput, ProjectUncheckedUpdateWithoutDesignSystemInput>
  }

  export type ProjectUpdateWithoutDesignSystemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutProjectsOwnedNestedInput
    memberships?: ProjectMembershipUpdateManyWithoutProjectNestedInput
    designs?: DesignUpdateManyWithoutProjectNestedInput
    components?: ComponentUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutDesignSystemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutProjectNestedInput
    designs?: DesignUncheckedUpdateManyWithoutProjectNestedInput
    components?: ComponentUncheckedUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipCreateManyUserInput = {
    id?: string
    projectId: string
    role?: $Enums.ProjectRole
    invitedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignCreateManyCreatedByInput = {
    id?: string
    projectId: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComponentCreateManyCreatedByInput = {
    id?: string
    projectId: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipCreateManyInvitedByInput = {
    id?: string
    projectId: string
    userId: string
    role?: $Enums.ProjectRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LlmApiKeyCreateManyUserInput = {
    id?: string
    provider: $Enums.LlmProvider
    apiKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyCreateManyUserInput = {
    id?: string
    name?: string | null
    key?: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: ProjectMembershipUpdateManyWithoutProjectNestedInput
    designs?: DesignUpdateManyWithoutProjectNestedInput
    components?: ComponentUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: ProjectMembershipUncheckedUpdateManyWithoutProjectNestedInput
    designs?: DesignUncheckedUpdateManyWithoutProjectNestedInput
    components?: ComponentUncheckedUpdateManyWithoutProjectNestedInput
    connections?: DesignConnectionUncheckedUpdateManyWithoutProjectNestedInput
    designSystem?: DesignSystemUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutMembershipsNestedInput
    invitedBy?: UserUpdateOneWithoutMembershipInvitesNestedInput
  }

  export type ProjectMembershipUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutDesignsNestedInput
    connectionsFrom?: DesignConnectionUpdateManyWithoutFromDesignNestedInput
    connectionsTo?: DesignConnectionUpdateManyWithoutToDesignNestedInput
  }

  export type DesignUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectionsFrom?: DesignConnectionUncheckedUpdateManyWithoutFromDesignNestedInput
    connectionsTo?: DesignConnectionUncheckedUpdateManyWithoutToDesignNestedInput
  }

  export type DesignUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComponentUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutComponentsNestedInput
  }

  export type ComponentUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComponentUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutMembershipsNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type ProjectMembershipUncheckedUpdateWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipUncheckedUpdateManyWithoutInvitedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LlmApiKeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumLlmProviderFieldUpdateOperationsInput | $Enums.LlmProvider
    apiKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LlmApiKeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumLlmProviderFieldUpdateOperationsInput | $Enums.LlmProvider
    apiKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LlmApiKeyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumLlmProviderFieldUpdateOperationsInput | $Enums.LlmProvider
    apiKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    key?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    key?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    key?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipCreateManyProjectInput = {
    id?: string
    userId: string
    role?: $Enums.ProjectRole
    invitedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignCreateManyProjectInput = {
    id?: string
    createdById: string
    name: string
    description?: string | null
    html?: string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComponentCreateManyProjectInput = {
    id?: string
    createdById: string
    name: string
    html?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionCreateManyProjectInput = {
    id?: string
    fromDesignId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectMembershipUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    invitedBy?: UserUpdateOneWithoutMembershipInvitesNestedInput
  }

  export type ProjectMembershipUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMembershipUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumProjectRoleFieldUpdateOperationsInput | $Enums.ProjectRole
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutDesignsNestedInput
    connectionsFrom?: DesignConnectionUpdateManyWithoutFromDesignNestedInput
    connectionsTo?: DesignConnectionUpdateManyWithoutToDesignNestedInput
  }

  export type DesignUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connectionsFrom?: DesignConnectionUncheckedUpdateManyWithoutFromDesignNestedInput
    connectionsTo?: DesignConnectionUncheckedUpdateManyWithoutToDesignNestedInput
  }

  export type DesignUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    html?: StringFieldUpdateOperationsInput | string
    position?: NullableJsonNullValueInput | InputJsonValue
    size?: NullableJsonNullValueInput | InputJsonValue
    viewMode?: EnumDesignViewModeFieldUpdateOperationsInput | $Enums.DesignViewMode
    history?: NullableJsonNullValueInput | InputJsonValue
    tokens?: NullableJsonNullValueInput | InputJsonValue
    data?: NullableJsonNullValueInput | InputJsonValue
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComponentUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutComponentsNestedInput
  }

  export type ComponentUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComponentUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    html?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromDesign?: DesignUpdateOneRequiredWithoutConnectionsFromNestedInput
    toDesign?: DesignUpdateOneRequiredWithoutConnectionsToNestedInput
  }

  export type DesignConnectionUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromDesignId?: StringFieldUpdateOperationsInput | string
    toDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromDesignId?: StringFieldUpdateOperationsInput | string
    toDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionCreateManyFromDesignInput = {
    id?: string
    projectId: string
    toDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionCreateManyToDesignInput = {
    id?: string
    projectId: string
    fromDesignId: string
    fromPosition: $Enums.ConnectionPosition
    toPosition: $Enums.ConnectionPosition
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DesignConnectionUpdateWithoutFromDesignInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutConnectionsNestedInput
    toDesign?: DesignUpdateOneRequiredWithoutConnectionsToNestedInput
  }

  export type DesignConnectionUncheckedUpdateWithoutFromDesignInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    toDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionUncheckedUpdateManyWithoutFromDesignInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    toDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionUpdateWithoutToDesignInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutConnectionsNestedInput
    fromDesign?: DesignUpdateOneRequiredWithoutConnectionsFromNestedInput
  }

  export type DesignConnectionUncheckedUpdateWithoutToDesignInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DesignConnectionUncheckedUpdateManyWithoutToDesignInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fromDesignId?: StringFieldUpdateOperationsInput | string
    fromPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    toPosition?: EnumConnectionPositionFieldUpdateOperationsInput | $Enums.ConnectionPosition
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}