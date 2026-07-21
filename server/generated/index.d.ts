
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model attendance_logs
 * 
 */
export type attendance_logs = $Result.DefaultSelection<Prisma.$attendance_logsPayload>
/**
 * Model course_attendance
 * 
 */
export type course_attendance = $Result.DefaultSelection<Prisma.$course_attendancePayload>
/**
 * Model courses
 * 
 */
export type courses = $Result.DefaultSelection<Prisma.$coursesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const attendance_logs_status: {
  present: 'present',
  absent: 'absent',
  medical: 'medical',
  cancelled: 'cancelled'
};

export type attendance_logs_status = (typeof attendance_logs_status)[keyof typeof attendance_logs_status]

}

export type attendance_logs_status = $Enums.attendance_logs_status

export const attendance_logs_status: typeof $Enums.attendance_logs_status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendance_logs`: Exposes CRUD operations for the **attendance_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendance_logs
    * const attendance_logs = await prisma.attendance_logs.findMany()
    * ```
    */
  get attendance_logs(): Prisma.attendance_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course_attendance`: Exposes CRUD operations for the **course_attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Course_attendances
    * const course_attendances = await prisma.course_attendance.findMany()
    * ```
    */
  get course_attendance(): Prisma.course_attendanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courses`: Exposes CRUD operations for the **courses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.courses.findMany()
    * ```
    */
  get courses(): Prisma.coursesDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.0
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
    users: 'users',
    attendance_logs: 'attendance_logs',
    course_attendance: 'course_attendance',
    courses: 'courses'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "attendance_logs" | "course_attendance" | "courses"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      attendance_logs: {
        payload: Prisma.$attendance_logsPayload<ExtArgs>
        fields: Prisma.attendance_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.attendance_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.attendance_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload>
          }
          findFirst: {
            args: Prisma.attendance_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.attendance_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload>
          }
          findMany: {
            args: Prisma.attendance_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload>[]
          }
          create: {
            args: Prisma.attendance_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload>
          }
          createMany: {
            args: Prisma.attendance_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.attendance_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload>
          }
          update: {
            args: Prisma.attendance_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload>
          }
          deleteMany: {
            args: Prisma.attendance_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.attendance_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.attendance_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$attendance_logsPayload>
          }
          aggregate: {
            args: Prisma.Attendance_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance_logs>
          }
          groupBy: {
            args: Prisma.attendance_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Attendance_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.attendance_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Attendance_logsCountAggregateOutputType> | number
          }
        }
      }
      course_attendance: {
        payload: Prisma.$course_attendancePayload<ExtArgs>
        fields: Prisma.course_attendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.course_attendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.course_attendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload>
          }
          findFirst: {
            args: Prisma.course_attendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.course_attendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload>
          }
          findMany: {
            args: Prisma.course_attendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload>[]
          }
          create: {
            args: Prisma.course_attendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload>
          }
          createMany: {
            args: Prisma.course_attendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.course_attendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload>
          }
          update: {
            args: Prisma.course_attendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload>
          }
          deleteMany: {
            args: Prisma.course_attendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.course_attendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.course_attendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$course_attendancePayload>
          }
          aggregate: {
            args: Prisma.Course_attendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse_attendance>
          }
          groupBy: {
            args: Prisma.course_attendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<Course_attendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.course_attendanceCountArgs<ExtArgs>
            result: $Utils.Optional<Course_attendanceCountAggregateOutputType> | number
          }
        }
      }
      courses: {
        payload: Prisma.$coursesPayload<ExtArgs>
        fields: Prisma.coursesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.coursesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.coursesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload>
          }
          findFirst: {
            args: Prisma.coursesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.coursesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload>
          }
          findMany: {
            args: Prisma.coursesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload>[]
          }
          create: {
            args: Prisma.coursesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload>
          }
          createMany: {
            args: Prisma.coursesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.coursesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload>
          }
          update: {
            args: Prisma.coursesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload>
          }
          deleteMany: {
            args: Prisma.coursesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.coursesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.coursesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$coursesPayload>
          }
          aggregate: {
            args: Prisma.CoursesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourses>
          }
          groupBy: {
            args: Prisma.coursesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoursesGroupByOutputType>[]
          }
          count: {
            args: Prisma.coursesCountArgs<ExtArgs>
            result: $Utils.Optional<CoursesCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    attendance_logs?: attendance_logsOmit
    course_attendance?: course_attendanceOmit
    courses?: coursesOmit
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
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    attendance_logs: number
    course_attendance: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance_logs?: boolean | UsersCountOutputTypeCountAttendance_logsArgs
    course_attendance?: boolean | UsersCountOutputTypeCountCourse_attendanceArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAttendance_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendance_logsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCourse_attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: course_attendanceWhereInput
  }


  /**
   * Count Type CoursesCountOutputType
   */

  export type CoursesCountOutputType = {
    attendance_logs: number
    course_attendance: number
  }

  export type CoursesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance_logs?: boolean | CoursesCountOutputTypeCountAttendance_logsArgs
    course_attendance?: boolean | CoursesCountOutputTypeCountCourse_attendanceArgs
  }

  // Custom InputTypes
  /**
   * CoursesCountOutputType without action
   */
  export type CoursesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CoursesCountOutputType
     */
    select?: CoursesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CoursesCountOutputType without action
   */
  export type CoursesCountOutputTypeCountAttendance_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendance_logsWhereInput
  }

  /**
   * CoursesCountOutputType without action
   */
  export type CoursesCountOutputTypeCountCourse_attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: course_attendanceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    semester: number | null
    batch: number | null
  }

  export type UsersSumAggregateOutputType = {
    semester: number | null
    batch: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    oid: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    roll_number: string | null
    branch: string | null
    semester: number | null
    image_url: string | null
    batch: number | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    oid: string | null
    email: string | null
    first_name: string | null
    last_name: string | null
    roll_number: string | null
    branch: string | null
    semester: number | null
    image_url: string | null
    batch: number | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    oid: number
    email: number
    first_name: number
    last_name: number
    roll_number: number
    branch: number
    semester: number
    image_url: number
    batch: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    semester?: true
    batch?: true
  }

  export type UsersSumAggregateInputType = {
    semester?: true
    batch?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    oid?: true
    email?: true
    first_name?: true
    last_name?: true
    roll_number?: true
    branch?: true
    semester?: true
    image_url?: true
    batch?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    oid?: true
    email?: true
    first_name?: true
    last_name?: true
    roll_number?: true
    branch?: true
    semester?: true
    image_url?: true
    batch?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    oid?: true
    email?: true
    first_name?: true
    last_name?: true
    roll_number?: true
    branch?: true
    semester?: true
    image_url?: true
    batch?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    oid: string
    email: string
    first_name: string
    last_name: string | null
    roll_number: string
    branch: string
    semester: number
    image_url: string | null
    batch: number
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    oid?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    roll_number?: boolean
    branch?: boolean
    semester?: boolean
    image_url?: boolean
    batch?: boolean
    attendance_logs?: boolean | users$attendance_logsArgs<ExtArgs>
    course_attendance?: boolean | users$course_attendanceArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    id?: boolean
    oid?: boolean
    email?: boolean
    first_name?: boolean
    last_name?: boolean
    roll_number?: boolean
    branch?: boolean
    semester?: boolean
    image_url?: boolean
    batch?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "oid" | "email" | "first_name" | "last_name" | "roll_number" | "branch" | "semester" | "image_url" | "batch", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance_logs?: boolean | users$attendance_logsArgs<ExtArgs>
    course_attendance?: boolean | users$course_attendanceArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      attendance_logs: Prisma.$attendance_logsPayload<ExtArgs>[]
      course_attendance: Prisma.$course_attendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      oid: string
      email: string
      first_name: string
      last_name: string | null
      roll_number: string
      branch: string
      semester: number
      image_url: string | null
      batch: number
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance_logs<T extends users$attendance_logsArgs<ExtArgs> = {}>(args?: Subset<T, users$attendance_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    course_attendance<T extends users$course_attendanceArgs<ExtArgs> = {}>(args?: Subset<T, users$course_attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly oid: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly roll_number: FieldRef<"users", 'String'>
    readonly branch: FieldRef<"users", 'String'>
    readonly semester: FieldRef<"users", 'Int'>
    readonly image_url: FieldRef<"users", 'String'>
    readonly batch: FieldRef<"users", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.attendance_logs
   */
  export type users$attendance_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    where?: attendance_logsWhereInput
    orderBy?: attendance_logsOrderByWithRelationInput | attendance_logsOrderByWithRelationInput[]
    cursor?: attendance_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Attendance_logsScalarFieldEnum | Attendance_logsScalarFieldEnum[]
  }

  /**
   * users.course_attendance
   */
  export type users$course_attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    where?: course_attendanceWhereInput
    orderBy?: course_attendanceOrderByWithRelationInput | course_attendanceOrderByWithRelationInput[]
    cursor?: course_attendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Course_attendanceScalarFieldEnum | Course_attendanceScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model attendance_logs
   */

  export type AggregateAttendance_logs = {
    _count: Attendance_logsCountAggregateOutputType | null
    _min: Attendance_logsMinAggregateOutputType | null
    _max: Attendance_logsMaxAggregateOutputType | null
  }

  export type Attendance_logsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    course_code: string | null
    lecture_date: Date | null
    start_time: Date | null
    end_time: Date | null
    status: $Enums.attendance_logs_status | null
  }

  export type Attendance_logsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    course_code: string | null
    lecture_date: Date | null
    start_time: Date | null
    end_time: Date | null
    status: $Enums.attendance_logs_status | null
  }

  export type Attendance_logsCountAggregateOutputType = {
    id: number
    user_id: number
    course_code: number
    lecture_date: number
    start_time: number
    end_time: number
    status: number
    _all: number
  }


  export type Attendance_logsMinAggregateInputType = {
    id?: true
    user_id?: true
    course_code?: true
    lecture_date?: true
    start_time?: true
    end_time?: true
    status?: true
  }

  export type Attendance_logsMaxAggregateInputType = {
    id?: true
    user_id?: true
    course_code?: true
    lecture_date?: true
    start_time?: true
    end_time?: true
    status?: true
  }

  export type Attendance_logsCountAggregateInputType = {
    id?: true
    user_id?: true
    course_code?: true
    lecture_date?: true
    start_time?: true
    end_time?: true
    status?: true
    _all?: true
  }

  export type Attendance_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendance_logs to aggregate.
     */
    where?: attendance_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendance_logs to fetch.
     */
    orderBy?: attendance_logsOrderByWithRelationInput | attendance_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: attendance_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendance_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendance_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned attendance_logs
    **/
    _count?: true | Attendance_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Attendance_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Attendance_logsMaxAggregateInputType
  }

  export type GetAttendance_logsAggregateType<T extends Attendance_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance_logs[P]>
      : GetScalarType<T[P], AggregateAttendance_logs[P]>
  }




  export type attendance_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: attendance_logsWhereInput
    orderBy?: attendance_logsOrderByWithAggregationInput | attendance_logsOrderByWithAggregationInput[]
    by: Attendance_logsScalarFieldEnum[] | Attendance_logsScalarFieldEnum
    having?: attendance_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Attendance_logsCountAggregateInputType | true
    _min?: Attendance_logsMinAggregateInputType
    _max?: Attendance_logsMaxAggregateInputType
  }

  export type Attendance_logsGroupByOutputType = {
    id: string
    user_id: string
    course_code: string
    lecture_date: Date
    start_time: Date
    end_time: Date
    status: $Enums.attendance_logs_status | null
    _count: Attendance_logsCountAggregateOutputType | null
    _min: Attendance_logsMinAggregateOutputType | null
    _max: Attendance_logsMaxAggregateOutputType | null
  }

  type GetAttendance_logsGroupByPayload<T extends attendance_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Attendance_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Attendance_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Attendance_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Attendance_logsGroupByOutputType[P]>
        }
      >
    >


  export type attendance_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    course_code?: boolean
    lecture_date?: boolean
    start_time?: boolean
    end_time?: boolean
    status?: boolean
    courses?: boolean | coursesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance_logs"]>



  export type attendance_logsSelectScalar = {
    id?: boolean
    user_id?: boolean
    course_code?: boolean
    lecture_date?: boolean
    start_time?: boolean
    end_time?: boolean
    status?: boolean
  }

  export type attendance_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "course_code" | "lecture_date" | "start_time" | "end_time" | "status", ExtArgs["result"]["attendance_logs"]>
  export type attendance_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | coursesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $attendance_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "attendance_logs"
    objects: {
      courses: Prisma.$coursesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      course_code: string
      lecture_date: Date
      start_time: Date
      end_time: Date
      status: $Enums.attendance_logs_status | null
    }, ExtArgs["result"]["attendance_logs"]>
    composites: {}
  }

  type attendance_logsGetPayload<S extends boolean | null | undefined | attendance_logsDefaultArgs> = $Result.GetResult<Prisma.$attendance_logsPayload, S>

  type attendance_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<attendance_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Attendance_logsCountAggregateInputType | true
    }

  export interface attendance_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['attendance_logs'], meta: { name: 'attendance_logs' } }
    /**
     * Find zero or one Attendance_logs that matches the filter.
     * @param {attendance_logsFindUniqueArgs} args - Arguments to find a Attendance_logs
     * @example
     * // Get one Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends attendance_logsFindUniqueArgs>(args: SelectSubset<T, attendance_logsFindUniqueArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendance_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {attendance_logsFindUniqueOrThrowArgs} args - Arguments to find a Attendance_logs
     * @example
     * // Get one Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends attendance_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, attendance_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendance_logsFindFirstArgs} args - Arguments to find a Attendance_logs
     * @example
     * // Get one Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends attendance_logsFindFirstArgs>(args?: SelectSubset<T, attendance_logsFindFirstArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendance_logsFindFirstOrThrowArgs} args - Arguments to find a Attendance_logs
     * @example
     * // Get one Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends attendance_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, attendance_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendance_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendance_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.findMany()
     * 
     * // Get first 10 Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendance_logsWithIdOnly = await prisma.attendance_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends attendance_logsFindManyArgs>(args?: SelectSubset<T, attendance_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendance_logs.
     * @param {attendance_logsCreateArgs} args - Arguments to create a Attendance_logs.
     * @example
     * // Create one Attendance_logs
     * const Attendance_logs = await prisma.attendance_logs.create({
     *   data: {
     *     // ... data to create a Attendance_logs
     *   }
     * })
     * 
     */
    create<T extends attendance_logsCreateArgs>(args: SelectSubset<T, attendance_logsCreateArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendance_logs.
     * @param {attendance_logsCreateManyArgs} args - Arguments to create many Attendance_logs.
     * @example
     * // Create many Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends attendance_logsCreateManyArgs>(args?: SelectSubset<T, attendance_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attendance_logs.
     * @param {attendance_logsDeleteArgs} args - Arguments to delete one Attendance_logs.
     * @example
     * // Delete one Attendance_logs
     * const Attendance_logs = await prisma.attendance_logs.delete({
     *   where: {
     *     // ... filter to delete one Attendance_logs
     *   }
     * })
     * 
     */
    delete<T extends attendance_logsDeleteArgs>(args: SelectSubset<T, attendance_logsDeleteArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendance_logs.
     * @param {attendance_logsUpdateArgs} args - Arguments to update one Attendance_logs.
     * @example
     * // Update one Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends attendance_logsUpdateArgs>(args: SelectSubset<T, attendance_logsUpdateArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendance_logs.
     * @param {attendance_logsDeleteManyArgs} args - Arguments to filter Attendance_logs to delete.
     * @example
     * // Delete a few Attendance_logs
     * const { count } = await prisma.attendance_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends attendance_logsDeleteManyArgs>(args?: SelectSubset<T, attendance_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendance_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendance_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends attendance_logsUpdateManyArgs>(args: SelectSubset<T, attendance_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance_logs.
     * @param {attendance_logsUpsertArgs} args - Arguments to update or create a Attendance_logs.
     * @example
     * // Update or create a Attendance_logs
     * const attendance_logs = await prisma.attendance_logs.upsert({
     *   create: {
     *     // ... data to create a Attendance_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance_logs we want to update
     *   }
     * })
     */
    upsert<T extends attendance_logsUpsertArgs>(args: SelectSubset<T, attendance_logsUpsertArgs<ExtArgs>>): Prisma__attendance_logsClient<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendance_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendance_logsCountArgs} args - Arguments to filter Attendance_logs to count.
     * @example
     * // Count the number of Attendance_logs
     * const count = await prisma.attendance_logs.count({
     *   where: {
     *     // ... the filter for the Attendance_logs we want to count
     *   }
     * })
    **/
    count<T extends attendance_logsCountArgs>(
      args?: Subset<T, attendance_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Attendance_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Attendance_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Attendance_logsAggregateArgs>(args: Subset<T, Attendance_logsAggregateArgs>): Prisma.PrismaPromise<GetAttendance_logsAggregateType<T>>

    /**
     * Group by Attendance_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {attendance_logsGroupByArgs} args - Group by arguments.
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
      T extends attendance_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: attendance_logsGroupByArgs['orderBy'] }
        : { orderBy?: attendance_logsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, attendance_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendance_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the attendance_logs model
   */
  readonly fields: attendance_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for attendance_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__attendance_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends coursesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, coursesDefaultArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the attendance_logs model
   */
  interface attendance_logsFieldRefs {
    readonly id: FieldRef<"attendance_logs", 'String'>
    readonly user_id: FieldRef<"attendance_logs", 'String'>
    readonly course_code: FieldRef<"attendance_logs", 'String'>
    readonly lecture_date: FieldRef<"attendance_logs", 'DateTime'>
    readonly start_time: FieldRef<"attendance_logs", 'DateTime'>
    readonly end_time: FieldRef<"attendance_logs", 'DateTime'>
    readonly status: FieldRef<"attendance_logs", 'attendance_logs_status'>
  }
    

  // Custom InputTypes
  /**
   * attendance_logs findUnique
   */
  export type attendance_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * Filter, which attendance_logs to fetch.
     */
    where: attendance_logsWhereUniqueInput
  }

  /**
   * attendance_logs findUniqueOrThrow
   */
  export type attendance_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * Filter, which attendance_logs to fetch.
     */
    where: attendance_logsWhereUniqueInput
  }

  /**
   * attendance_logs findFirst
   */
  export type attendance_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * Filter, which attendance_logs to fetch.
     */
    where?: attendance_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendance_logs to fetch.
     */
    orderBy?: attendance_logsOrderByWithRelationInput | attendance_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendance_logs.
     */
    cursor?: attendance_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendance_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendance_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendance_logs.
     */
    distinct?: Attendance_logsScalarFieldEnum | Attendance_logsScalarFieldEnum[]
  }

  /**
   * attendance_logs findFirstOrThrow
   */
  export type attendance_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * Filter, which attendance_logs to fetch.
     */
    where?: attendance_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendance_logs to fetch.
     */
    orderBy?: attendance_logsOrderByWithRelationInput | attendance_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for attendance_logs.
     */
    cursor?: attendance_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendance_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendance_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendance_logs.
     */
    distinct?: Attendance_logsScalarFieldEnum | Attendance_logsScalarFieldEnum[]
  }

  /**
   * attendance_logs findMany
   */
  export type attendance_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * Filter, which attendance_logs to fetch.
     */
    where?: attendance_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of attendance_logs to fetch.
     */
    orderBy?: attendance_logsOrderByWithRelationInput | attendance_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing attendance_logs.
     */
    cursor?: attendance_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` attendance_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` attendance_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of attendance_logs.
     */
    distinct?: Attendance_logsScalarFieldEnum | Attendance_logsScalarFieldEnum[]
  }

  /**
   * attendance_logs create
   */
  export type attendance_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a attendance_logs.
     */
    data: XOR<attendance_logsCreateInput, attendance_logsUncheckedCreateInput>
  }

  /**
   * attendance_logs createMany
   */
  export type attendance_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many attendance_logs.
     */
    data: attendance_logsCreateManyInput | attendance_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * attendance_logs update
   */
  export type attendance_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a attendance_logs.
     */
    data: XOR<attendance_logsUpdateInput, attendance_logsUncheckedUpdateInput>
    /**
     * Choose, which attendance_logs to update.
     */
    where: attendance_logsWhereUniqueInput
  }

  /**
   * attendance_logs updateMany
   */
  export type attendance_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update attendance_logs.
     */
    data: XOR<attendance_logsUpdateManyMutationInput, attendance_logsUncheckedUpdateManyInput>
    /**
     * Filter which attendance_logs to update
     */
    where?: attendance_logsWhereInput
    /**
     * Limit how many attendance_logs to update.
     */
    limit?: number
  }

  /**
   * attendance_logs upsert
   */
  export type attendance_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the attendance_logs to update in case it exists.
     */
    where: attendance_logsWhereUniqueInput
    /**
     * In case the attendance_logs found by the `where` argument doesn't exist, create a new attendance_logs with this data.
     */
    create: XOR<attendance_logsCreateInput, attendance_logsUncheckedCreateInput>
    /**
     * In case the attendance_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<attendance_logsUpdateInput, attendance_logsUncheckedUpdateInput>
  }

  /**
   * attendance_logs delete
   */
  export type attendance_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    /**
     * Filter which attendance_logs to delete.
     */
    where: attendance_logsWhereUniqueInput
  }

  /**
   * attendance_logs deleteMany
   */
  export type attendance_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which attendance_logs to delete
     */
    where?: attendance_logsWhereInput
    /**
     * Limit how many attendance_logs to delete.
     */
    limit?: number
  }

  /**
   * attendance_logs without action
   */
  export type attendance_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
  }


  /**
   * Model course_attendance
   */

  export type AggregateCourse_attendance = {
    _count: Course_attendanceCountAggregateOutputType | null
    _avg: Course_attendanceAvgAggregateOutputType | null
    _sum: Course_attendanceSumAggregateOutputType | null
    _min: Course_attendanceMinAggregateOutputType | null
    _max: Course_attendanceMaxAggregateOutputType | null
  }

  export type Course_attendanceAvgAggregateOutputType = {
    present_total: number | null
    absent_total: number | null
    medical_total: number | null
    total_classes: number | null
  }

  export type Course_attendanceSumAggregateOutputType = {
    present_total: number | null
    absent_total: number | null
    medical_total: number | null
    total_classes: number | null
  }

  export type Course_attendanceMinAggregateOutputType = {
    user_id: string | null
    course_code: string | null
    present_total: number | null
    absent_total: number | null
    medical_total: number | null
    total_classes: number | null
  }

  export type Course_attendanceMaxAggregateOutputType = {
    user_id: string | null
    course_code: string | null
    present_total: number | null
    absent_total: number | null
    medical_total: number | null
    total_classes: number | null
  }

  export type Course_attendanceCountAggregateOutputType = {
    user_id: number
    course_code: number
    present_total: number
    absent_total: number
    medical_total: number
    total_classes: number
    _all: number
  }


  export type Course_attendanceAvgAggregateInputType = {
    present_total?: true
    absent_total?: true
    medical_total?: true
    total_classes?: true
  }

  export type Course_attendanceSumAggregateInputType = {
    present_total?: true
    absent_total?: true
    medical_total?: true
    total_classes?: true
  }

  export type Course_attendanceMinAggregateInputType = {
    user_id?: true
    course_code?: true
    present_total?: true
    absent_total?: true
    medical_total?: true
    total_classes?: true
  }

  export type Course_attendanceMaxAggregateInputType = {
    user_id?: true
    course_code?: true
    present_total?: true
    absent_total?: true
    medical_total?: true
    total_classes?: true
  }

  export type Course_attendanceCountAggregateInputType = {
    user_id?: true
    course_code?: true
    present_total?: true
    absent_total?: true
    medical_total?: true
    total_classes?: true
    _all?: true
  }

  export type Course_attendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which course_attendance to aggregate.
     */
    where?: course_attendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of course_attendances to fetch.
     */
    orderBy?: course_attendanceOrderByWithRelationInput | course_attendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: course_attendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` course_attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` course_attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned course_attendances
    **/
    _count?: true | Course_attendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Course_attendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Course_attendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Course_attendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Course_attendanceMaxAggregateInputType
  }

  export type GetCourse_attendanceAggregateType<T extends Course_attendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse_attendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse_attendance[P]>
      : GetScalarType<T[P], AggregateCourse_attendance[P]>
  }




  export type course_attendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: course_attendanceWhereInput
    orderBy?: course_attendanceOrderByWithAggregationInput | course_attendanceOrderByWithAggregationInput[]
    by: Course_attendanceScalarFieldEnum[] | Course_attendanceScalarFieldEnum
    having?: course_attendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Course_attendanceCountAggregateInputType | true
    _avg?: Course_attendanceAvgAggregateInputType
    _sum?: Course_attendanceSumAggregateInputType
    _min?: Course_attendanceMinAggregateInputType
    _max?: Course_attendanceMaxAggregateInputType
  }

  export type Course_attendanceGroupByOutputType = {
    user_id: string
    course_code: string
    present_total: number
    absent_total: number
    medical_total: number
    total_classes: number
    _count: Course_attendanceCountAggregateOutputType | null
    _avg: Course_attendanceAvgAggregateOutputType | null
    _sum: Course_attendanceSumAggregateOutputType | null
    _min: Course_attendanceMinAggregateOutputType | null
    _max: Course_attendanceMaxAggregateOutputType | null
  }

  type GetCourse_attendanceGroupByPayload<T extends course_attendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Course_attendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Course_attendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Course_attendanceGroupByOutputType[P]>
            : GetScalarType<T[P], Course_attendanceGroupByOutputType[P]>
        }
      >
    >


  export type course_attendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    course_code?: boolean
    present_total?: boolean
    absent_total?: boolean
    medical_total?: boolean
    total_classes?: boolean
    courses?: boolean | coursesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course_attendance"]>



  export type course_attendanceSelectScalar = {
    user_id?: boolean
    course_code?: boolean
    present_total?: boolean
    absent_total?: boolean
    medical_total?: boolean
    total_classes?: boolean
  }

  export type course_attendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "course_code" | "present_total" | "absent_total" | "medical_total" | "total_classes", ExtArgs["result"]["course_attendance"]>
  export type course_attendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | coursesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $course_attendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "course_attendance"
    objects: {
      courses: Prisma.$coursesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      course_code: string
      present_total: number
      absent_total: number
      medical_total: number
      total_classes: number
    }, ExtArgs["result"]["course_attendance"]>
    composites: {}
  }

  type course_attendanceGetPayload<S extends boolean | null | undefined | course_attendanceDefaultArgs> = $Result.GetResult<Prisma.$course_attendancePayload, S>

  type course_attendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<course_attendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Course_attendanceCountAggregateInputType | true
    }

  export interface course_attendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['course_attendance'], meta: { name: 'course_attendance' } }
    /**
     * Find zero or one Course_attendance that matches the filter.
     * @param {course_attendanceFindUniqueArgs} args - Arguments to find a Course_attendance
     * @example
     * // Get one Course_attendance
     * const course_attendance = await prisma.course_attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends course_attendanceFindUniqueArgs>(args: SelectSubset<T, course_attendanceFindUniqueArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course_attendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {course_attendanceFindUniqueOrThrowArgs} args - Arguments to find a Course_attendance
     * @example
     * // Get one Course_attendance
     * const course_attendance = await prisma.course_attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends course_attendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, course_attendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course_attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {course_attendanceFindFirstArgs} args - Arguments to find a Course_attendance
     * @example
     * // Get one Course_attendance
     * const course_attendance = await prisma.course_attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends course_attendanceFindFirstArgs>(args?: SelectSubset<T, course_attendanceFindFirstArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course_attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {course_attendanceFindFirstOrThrowArgs} args - Arguments to find a Course_attendance
     * @example
     * // Get one Course_attendance
     * const course_attendance = await prisma.course_attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends course_attendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, course_attendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Course_attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {course_attendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Course_attendances
     * const course_attendances = await prisma.course_attendance.findMany()
     * 
     * // Get first 10 Course_attendances
     * const course_attendances = await prisma.course_attendance.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const course_attendanceWithUser_idOnly = await prisma.course_attendance.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends course_attendanceFindManyArgs>(args?: SelectSubset<T, course_attendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course_attendance.
     * @param {course_attendanceCreateArgs} args - Arguments to create a Course_attendance.
     * @example
     * // Create one Course_attendance
     * const Course_attendance = await prisma.course_attendance.create({
     *   data: {
     *     // ... data to create a Course_attendance
     *   }
     * })
     * 
     */
    create<T extends course_attendanceCreateArgs>(args: SelectSubset<T, course_attendanceCreateArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Course_attendances.
     * @param {course_attendanceCreateManyArgs} args - Arguments to create many Course_attendances.
     * @example
     * // Create many Course_attendances
     * const course_attendance = await prisma.course_attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends course_attendanceCreateManyArgs>(args?: SelectSubset<T, course_attendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Course_attendance.
     * @param {course_attendanceDeleteArgs} args - Arguments to delete one Course_attendance.
     * @example
     * // Delete one Course_attendance
     * const Course_attendance = await prisma.course_attendance.delete({
     *   where: {
     *     // ... filter to delete one Course_attendance
     *   }
     * })
     * 
     */
    delete<T extends course_attendanceDeleteArgs>(args: SelectSubset<T, course_attendanceDeleteArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course_attendance.
     * @param {course_attendanceUpdateArgs} args - Arguments to update one Course_attendance.
     * @example
     * // Update one Course_attendance
     * const course_attendance = await prisma.course_attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends course_attendanceUpdateArgs>(args: SelectSubset<T, course_attendanceUpdateArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Course_attendances.
     * @param {course_attendanceDeleteManyArgs} args - Arguments to filter Course_attendances to delete.
     * @example
     * // Delete a few Course_attendances
     * const { count } = await prisma.course_attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends course_attendanceDeleteManyArgs>(args?: SelectSubset<T, course_attendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Course_attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {course_attendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Course_attendances
     * const course_attendance = await prisma.course_attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends course_attendanceUpdateManyArgs>(args: SelectSubset<T, course_attendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course_attendance.
     * @param {course_attendanceUpsertArgs} args - Arguments to update or create a Course_attendance.
     * @example
     * // Update or create a Course_attendance
     * const course_attendance = await prisma.course_attendance.upsert({
     *   create: {
     *     // ... data to create a Course_attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course_attendance we want to update
     *   }
     * })
     */
    upsert<T extends course_attendanceUpsertArgs>(args: SelectSubset<T, course_attendanceUpsertArgs<ExtArgs>>): Prisma__course_attendanceClient<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Course_attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {course_attendanceCountArgs} args - Arguments to filter Course_attendances to count.
     * @example
     * // Count the number of Course_attendances
     * const count = await prisma.course_attendance.count({
     *   where: {
     *     // ... the filter for the Course_attendances we want to count
     *   }
     * })
    **/
    count<T extends course_attendanceCountArgs>(
      args?: Subset<T, course_attendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Course_attendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course_attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Course_attendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Course_attendanceAggregateArgs>(args: Subset<T, Course_attendanceAggregateArgs>): Prisma.PrismaPromise<GetCourse_attendanceAggregateType<T>>

    /**
     * Group by Course_attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {course_attendanceGroupByArgs} args - Group by arguments.
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
      T extends course_attendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: course_attendanceGroupByArgs['orderBy'] }
        : { orderBy?: course_attendanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, course_attendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourse_attendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the course_attendance model
   */
  readonly fields: course_attendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for course_attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__course_attendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends coursesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, coursesDefaultArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the course_attendance model
   */
  interface course_attendanceFieldRefs {
    readonly user_id: FieldRef<"course_attendance", 'String'>
    readonly course_code: FieldRef<"course_attendance", 'String'>
    readonly present_total: FieldRef<"course_attendance", 'Int'>
    readonly absent_total: FieldRef<"course_attendance", 'Int'>
    readonly medical_total: FieldRef<"course_attendance", 'Int'>
    readonly total_classes: FieldRef<"course_attendance", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * course_attendance findUnique
   */
  export type course_attendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * Filter, which course_attendance to fetch.
     */
    where: course_attendanceWhereUniqueInput
  }

  /**
   * course_attendance findUniqueOrThrow
   */
  export type course_attendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * Filter, which course_attendance to fetch.
     */
    where: course_attendanceWhereUniqueInput
  }

  /**
   * course_attendance findFirst
   */
  export type course_attendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * Filter, which course_attendance to fetch.
     */
    where?: course_attendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of course_attendances to fetch.
     */
    orderBy?: course_attendanceOrderByWithRelationInput | course_attendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for course_attendances.
     */
    cursor?: course_attendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` course_attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` course_attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of course_attendances.
     */
    distinct?: Course_attendanceScalarFieldEnum | Course_attendanceScalarFieldEnum[]
  }

  /**
   * course_attendance findFirstOrThrow
   */
  export type course_attendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * Filter, which course_attendance to fetch.
     */
    where?: course_attendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of course_attendances to fetch.
     */
    orderBy?: course_attendanceOrderByWithRelationInput | course_attendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for course_attendances.
     */
    cursor?: course_attendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` course_attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` course_attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of course_attendances.
     */
    distinct?: Course_attendanceScalarFieldEnum | Course_attendanceScalarFieldEnum[]
  }

  /**
   * course_attendance findMany
   */
  export type course_attendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * Filter, which course_attendances to fetch.
     */
    where?: course_attendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of course_attendances to fetch.
     */
    orderBy?: course_attendanceOrderByWithRelationInput | course_attendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing course_attendances.
     */
    cursor?: course_attendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` course_attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` course_attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of course_attendances.
     */
    distinct?: Course_attendanceScalarFieldEnum | Course_attendanceScalarFieldEnum[]
  }

  /**
   * course_attendance create
   */
  export type course_attendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a course_attendance.
     */
    data: XOR<course_attendanceCreateInput, course_attendanceUncheckedCreateInput>
  }

  /**
   * course_attendance createMany
   */
  export type course_attendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many course_attendances.
     */
    data: course_attendanceCreateManyInput | course_attendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * course_attendance update
   */
  export type course_attendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a course_attendance.
     */
    data: XOR<course_attendanceUpdateInput, course_attendanceUncheckedUpdateInput>
    /**
     * Choose, which course_attendance to update.
     */
    where: course_attendanceWhereUniqueInput
  }

  /**
   * course_attendance updateMany
   */
  export type course_attendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update course_attendances.
     */
    data: XOR<course_attendanceUpdateManyMutationInput, course_attendanceUncheckedUpdateManyInput>
    /**
     * Filter which course_attendances to update
     */
    where?: course_attendanceWhereInput
    /**
     * Limit how many course_attendances to update.
     */
    limit?: number
  }

  /**
   * course_attendance upsert
   */
  export type course_attendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the course_attendance to update in case it exists.
     */
    where: course_attendanceWhereUniqueInput
    /**
     * In case the course_attendance found by the `where` argument doesn't exist, create a new course_attendance with this data.
     */
    create: XOR<course_attendanceCreateInput, course_attendanceUncheckedCreateInput>
    /**
     * In case the course_attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<course_attendanceUpdateInput, course_attendanceUncheckedUpdateInput>
  }

  /**
   * course_attendance delete
   */
  export type course_attendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    /**
     * Filter which course_attendance to delete.
     */
    where: course_attendanceWhereUniqueInput
  }

  /**
   * course_attendance deleteMany
   */
  export type course_attendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which course_attendances to delete
     */
    where?: course_attendanceWhereInput
    /**
     * Limit how many course_attendances to delete.
     */
    limit?: number
  }

  /**
   * course_attendance without action
   */
  export type course_attendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
  }


  /**
   * Model courses
   */

  export type AggregateCourses = {
    _count: CoursesCountAggregateOutputType | null
    _avg: CoursesAvgAggregateOutputType | null
    _sum: CoursesSumAggregateOutputType | null
    _min: CoursesMinAggregateOutputType | null
    _max: CoursesMaxAggregateOutputType | null
  }

  export type CoursesAvgAggregateOutputType = {
    semester: number | null
  }

  export type CoursesSumAggregateOutputType = {
    semester: number | null
  }

  export type CoursesMinAggregateOutputType = {
    course_code: string | null
    course_name: string | null
    semester: number | null
    branch: string | null
  }

  export type CoursesMaxAggregateOutputType = {
    course_code: string | null
    course_name: string | null
    semester: number | null
    branch: string | null
  }

  export type CoursesCountAggregateOutputType = {
    course_code: number
    course_name: number
    semester: number
    branch: number
    _all: number
  }


  export type CoursesAvgAggregateInputType = {
    semester?: true
  }

  export type CoursesSumAggregateInputType = {
    semester?: true
  }

  export type CoursesMinAggregateInputType = {
    course_code?: true
    course_name?: true
    semester?: true
    branch?: true
  }

  export type CoursesMaxAggregateInputType = {
    course_code?: true
    course_name?: true
    semester?: true
    branch?: true
  }

  export type CoursesCountAggregateInputType = {
    course_code?: true
    course_name?: true
    semester?: true
    branch?: true
    _all?: true
  }

  export type CoursesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which courses to aggregate.
     */
    where?: coursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of courses to fetch.
     */
    orderBy?: coursesOrderByWithRelationInput | coursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: coursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned courses
    **/
    _count?: true | CoursesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoursesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoursesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoursesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoursesMaxAggregateInputType
  }

  export type GetCoursesAggregateType<T extends CoursesAggregateArgs> = {
        [P in keyof T & keyof AggregateCourses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourses[P]>
      : GetScalarType<T[P], AggregateCourses[P]>
  }




  export type coursesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: coursesWhereInput
    orderBy?: coursesOrderByWithAggregationInput | coursesOrderByWithAggregationInput[]
    by: CoursesScalarFieldEnum[] | CoursesScalarFieldEnum
    having?: coursesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoursesCountAggregateInputType | true
    _avg?: CoursesAvgAggregateInputType
    _sum?: CoursesSumAggregateInputType
    _min?: CoursesMinAggregateInputType
    _max?: CoursesMaxAggregateInputType
  }

  export type CoursesGroupByOutputType = {
    course_code: string
    course_name: string
    semester: number
    branch: string
    _count: CoursesCountAggregateOutputType | null
    _avg: CoursesAvgAggregateOutputType | null
    _sum: CoursesSumAggregateOutputType | null
    _min: CoursesMinAggregateOutputType | null
    _max: CoursesMaxAggregateOutputType | null
  }

  type GetCoursesGroupByPayload<T extends coursesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoursesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoursesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoursesGroupByOutputType[P]>
            : GetScalarType<T[P], CoursesGroupByOutputType[P]>
        }
      >
    >


  export type coursesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    course_code?: boolean
    course_name?: boolean
    semester?: boolean
    branch?: boolean
    attendance_logs?: boolean | courses$attendance_logsArgs<ExtArgs>
    course_attendance?: boolean | courses$course_attendanceArgs<ExtArgs>
    _count?: boolean | CoursesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courses"]>



  export type coursesSelectScalar = {
    course_code?: boolean
    course_name?: boolean
    semester?: boolean
    branch?: boolean
  }

  export type coursesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"course_code" | "course_name" | "semester" | "branch", ExtArgs["result"]["courses"]>
  export type coursesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance_logs?: boolean | courses$attendance_logsArgs<ExtArgs>
    course_attendance?: boolean | courses$course_attendanceArgs<ExtArgs>
    _count?: boolean | CoursesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $coursesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "courses"
    objects: {
      attendance_logs: Prisma.$attendance_logsPayload<ExtArgs>[]
      course_attendance: Prisma.$course_attendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      course_code: string
      course_name: string
      semester: number
      branch: string
    }, ExtArgs["result"]["courses"]>
    composites: {}
  }

  type coursesGetPayload<S extends boolean | null | undefined | coursesDefaultArgs> = $Result.GetResult<Prisma.$coursesPayload, S>

  type coursesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<coursesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoursesCountAggregateInputType | true
    }

  export interface coursesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['courses'], meta: { name: 'courses' } }
    /**
     * Find zero or one Courses that matches the filter.
     * @param {coursesFindUniqueArgs} args - Arguments to find a Courses
     * @example
     * // Get one Courses
     * const courses = await prisma.courses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends coursesFindUniqueArgs>(args: SelectSubset<T, coursesFindUniqueArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Courses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {coursesFindUniqueOrThrowArgs} args - Arguments to find a Courses
     * @example
     * // Get one Courses
     * const courses = await prisma.courses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends coursesFindUniqueOrThrowArgs>(args: SelectSubset<T, coursesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {coursesFindFirstArgs} args - Arguments to find a Courses
     * @example
     * // Get one Courses
     * const courses = await prisma.courses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends coursesFindFirstArgs>(args?: SelectSubset<T, coursesFindFirstArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Courses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {coursesFindFirstOrThrowArgs} args - Arguments to find a Courses
     * @example
     * // Get one Courses
     * const courses = await prisma.courses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends coursesFindFirstOrThrowArgs>(args?: SelectSubset<T, coursesFindFirstOrThrowArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {coursesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.courses.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.courses.findMany({ take: 10 })
     * 
     * // Only select the `course_code`
     * const coursesWithCourse_codeOnly = await prisma.courses.findMany({ select: { course_code: true } })
     * 
     */
    findMany<T extends coursesFindManyArgs>(args?: SelectSubset<T, coursesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Courses.
     * @param {coursesCreateArgs} args - Arguments to create a Courses.
     * @example
     * // Create one Courses
     * const Courses = await prisma.courses.create({
     *   data: {
     *     // ... data to create a Courses
     *   }
     * })
     * 
     */
    create<T extends coursesCreateArgs>(args: SelectSubset<T, coursesCreateArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {coursesCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const courses = await prisma.courses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends coursesCreateManyArgs>(args?: SelectSubset<T, coursesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Courses.
     * @param {coursesDeleteArgs} args - Arguments to delete one Courses.
     * @example
     * // Delete one Courses
     * const Courses = await prisma.courses.delete({
     *   where: {
     *     // ... filter to delete one Courses
     *   }
     * })
     * 
     */
    delete<T extends coursesDeleteArgs>(args: SelectSubset<T, coursesDeleteArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Courses.
     * @param {coursesUpdateArgs} args - Arguments to update one Courses.
     * @example
     * // Update one Courses
     * const courses = await prisma.courses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends coursesUpdateArgs>(args: SelectSubset<T, coursesUpdateArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {coursesDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.courses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends coursesDeleteManyArgs>(args?: SelectSubset<T, coursesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {coursesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const courses = await prisma.courses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends coursesUpdateManyArgs>(args: SelectSubset<T, coursesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Courses.
     * @param {coursesUpsertArgs} args - Arguments to update or create a Courses.
     * @example
     * // Update or create a Courses
     * const courses = await prisma.courses.upsert({
     *   create: {
     *     // ... data to create a Courses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Courses we want to update
     *   }
     * })
     */
    upsert<T extends coursesUpsertArgs>(args: SelectSubset<T, coursesUpsertArgs<ExtArgs>>): Prisma__coursesClient<$Result.GetResult<Prisma.$coursesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {coursesCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.courses.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends coursesCountArgs>(
      args?: Subset<T, coursesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoursesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoursesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CoursesAggregateArgs>(args: Subset<T, CoursesAggregateArgs>): Prisma.PrismaPromise<GetCoursesAggregateType<T>>

    /**
     * Group by Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {coursesGroupByArgs} args - Group by arguments.
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
      T extends coursesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: coursesGroupByArgs['orderBy'] }
        : { orderBy?: coursesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, coursesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoursesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the courses model
   */
  readonly fields: coursesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for courses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__coursesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance_logs<T extends courses$attendance_logsArgs<ExtArgs> = {}>(args?: Subset<T, courses$attendance_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$attendance_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    course_attendance<T extends courses$course_attendanceArgs<ExtArgs> = {}>(args?: Subset<T, courses$course_attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$course_attendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the courses model
   */
  interface coursesFieldRefs {
    readonly course_code: FieldRef<"courses", 'String'>
    readonly course_name: FieldRef<"courses", 'String'>
    readonly semester: FieldRef<"courses", 'Int'>
    readonly branch: FieldRef<"courses", 'String'>
  }
    

  // Custom InputTypes
  /**
   * courses findUnique
   */
  export type coursesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * Filter, which courses to fetch.
     */
    where: coursesWhereUniqueInput
  }

  /**
   * courses findUniqueOrThrow
   */
  export type coursesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * Filter, which courses to fetch.
     */
    where: coursesWhereUniqueInput
  }

  /**
   * courses findFirst
   */
  export type coursesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * Filter, which courses to fetch.
     */
    where?: coursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of courses to fetch.
     */
    orderBy?: coursesOrderByWithRelationInput | coursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for courses.
     */
    cursor?: coursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of courses.
     */
    distinct?: CoursesScalarFieldEnum | CoursesScalarFieldEnum[]
  }

  /**
   * courses findFirstOrThrow
   */
  export type coursesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * Filter, which courses to fetch.
     */
    where?: coursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of courses to fetch.
     */
    orderBy?: coursesOrderByWithRelationInput | coursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for courses.
     */
    cursor?: coursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of courses.
     */
    distinct?: CoursesScalarFieldEnum | CoursesScalarFieldEnum[]
  }

  /**
   * courses findMany
   */
  export type coursesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * Filter, which courses to fetch.
     */
    where?: coursesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of courses to fetch.
     */
    orderBy?: coursesOrderByWithRelationInput | coursesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing courses.
     */
    cursor?: coursesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of courses.
     */
    distinct?: CoursesScalarFieldEnum | CoursesScalarFieldEnum[]
  }

  /**
   * courses create
   */
  export type coursesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * The data needed to create a courses.
     */
    data: XOR<coursesCreateInput, coursesUncheckedCreateInput>
  }

  /**
   * courses createMany
   */
  export type coursesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many courses.
     */
    data: coursesCreateManyInput | coursesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * courses update
   */
  export type coursesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * The data needed to update a courses.
     */
    data: XOR<coursesUpdateInput, coursesUncheckedUpdateInput>
    /**
     * Choose, which courses to update.
     */
    where: coursesWhereUniqueInput
  }

  /**
   * courses updateMany
   */
  export type coursesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update courses.
     */
    data: XOR<coursesUpdateManyMutationInput, coursesUncheckedUpdateManyInput>
    /**
     * Filter which courses to update
     */
    where?: coursesWhereInput
    /**
     * Limit how many courses to update.
     */
    limit?: number
  }

  /**
   * courses upsert
   */
  export type coursesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * The filter to search for the courses to update in case it exists.
     */
    where: coursesWhereUniqueInput
    /**
     * In case the courses found by the `where` argument doesn't exist, create a new courses with this data.
     */
    create: XOR<coursesCreateInput, coursesUncheckedCreateInput>
    /**
     * In case the courses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<coursesUpdateInput, coursesUncheckedUpdateInput>
  }

  /**
   * courses delete
   */
  export type coursesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
    /**
     * Filter which courses to delete.
     */
    where: coursesWhereUniqueInput
  }

  /**
   * courses deleteMany
   */
  export type coursesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which courses to delete
     */
    where?: coursesWhereInput
    /**
     * Limit how many courses to delete.
     */
    limit?: number
  }

  /**
   * courses.attendance_logs
   */
  export type courses$attendance_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the attendance_logs
     */
    select?: attendance_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the attendance_logs
     */
    omit?: attendance_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: attendance_logsInclude<ExtArgs> | null
    where?: attendance_logsWhereInput
    orderBy?: attendance_logsOrderByWithRelationInput | attendance_logsOrderByWithRelationInput[]
    cursor?: attendance_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Attendance_logsScalarFieldEnum | Attendance_logsScalarFieldEnum[]
  }

  /**
   * courses.course_attendance
   */
  export type courses$course_attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the course_attendance
     */
    select?: course_attendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the course_attendance
     */
    omit?: course_attendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: course_attendanceInclude<ExtArgs> | null
    where?: course_attendanceWhereInput
    orderBy?: course_attendanceOrderByWithRelationInput | course_attendanceOrderByWithRelationInput[]
    cursor?: course_attendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Course_attendanceScalarFieldEnum | Course_attendanceScalarFieldEnum[]
  }

  /**
   * courses without action
   */
  export type coursesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the courses
     */
    select?: coursesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the courses
     */
    omit?: coursesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: coursesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    oid: 'oid',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    roll_number: 'roll_number',
    branch: 'branch',
    semester: 'semester',
    image_url: 'image_url',
    batch: 'batch'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Attendance_logsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    course_code: 'course_code',
    lecture_date: 'lecture_date',
    start_time: 'start_time',
    end_time: 'end_time',
    status: 'status'
  };

  export type Attendance_logsScalarFieldEnum = (typeof Attendance_logsScalarFieldEnum)[keyof typeof Attendance_logsScalarFieldEnum]


  export const Course_attendanceScalarFieldEnum: {
    user_id: 'user_id',
    course_code: 'course_code',
    present_total: 'present_total',
    absent_total: 'absent_total',
    medical_total: 'medical_total',
    total_classes: 'total_classes'
  };

  export type Course_attendanceScalarFieldEnum = (typeof Course_attendanceScalarFieldEnum)[keyof typeof Course_attendanceScalarFieldEnum]


  export const CoursesScalarFieldEnum: {
    course_code: 'course_code',
    course_name: 'course_name',
    semester: 'semester',
    branch: 'branch'
  };

  export type CoursesScalarFieldEnum = (typeof CoursesScalarFieldEnum)[keyof typeof CoursesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const usersOrderByRelevanceFieldEnum: {
    id: 'id',
    oid: 'oid',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    roll_number: 'roll_number',
    branch: 'branch',
    image_url: 'image_url'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  export const attendance_logsOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    course_code: 'course_code'
  };

  export type attendance_logsOrderByRelevanceFieldEnum = (typeof attendance_logsOrderByRelevanceFieldEnum)[keyof typeof attendance_logsOrderByRelevanceFieldEnum]


  export const course_attendanceOrderByRelevanceFieldEnum: {
    user_id: 'user_id',
    course_code: 'course_code'
  };

  export type course_attendanceOrderByRelevanceFieldEnum = (typeof course_attendanceOrderByRelevanceFieldEnum)[keyof typeof course_attendanceOrderByRelevanceFieldEnum]


  export const coursesOrderByRelevanceFieldEnum: {
    course_code: 'course_code',
    course_name: 'course_name',
    branch: 'branch'
  };

  export type coursesOrderByRelevanceFieldEnum = (typeof coursesOrderByRelevanceFieldEnum)[keyof typeof coursesOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'attendance_logs_status'
   */
  export type Enumattendance_logs_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'attendance_logs_status'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    oid?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    first_name?: StringFilter<"users"> | string
    last_name?: StringNullableFilter<"users"> | string | null
    roll_number?: StringFilter<"users"> | string
    branch?: StringFilter<"users"> | string
    semester?: IntFilter<"users"> | number
    image_url?: StringNullableFilter<"users"> | string | null
    batch?: IntFilter<"users"> | number
    attendance_logs?: Attendance_logsListRelationFilter
    course_attendance?: Course_attendanceListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    oid?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrderInput | SortOrder
    roll_number?: SortOrder
    branch?: SortOrder
    semester?: SortOrder
    image_url?: SortOrderInput | SortOrder
    batch?: SortOrder
    attendance_logs?: attendance_logsOrderByRelationAggregateInput
    course_attendance?: course_attendanceOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    oid?: string
    email?: string
    roll_number?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    first_name?: StringFilter<"users"> | string
    last_name?: StringNullableFilter<"users"> | string | null
    branch?: StringFilter<"users"> | string
    semester?: IntFilter<"users"> | number
    image_url?: StringNullableFilter<"users"> | string | null
    batch?: IntFilter<"users"> | number
    attendance_logs?: Attendance_logsListRelationFilter
    course_attendance?: Course_attendanceListRelationFilter
  }, "id" | "oid" | "email" | "roll_number">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    oid?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrderInput | SortOrder
    roll_number?: SortOrder
    branch?: SortOrder
    semester?: SortOrder
    image_url?: SortOrderInput | SortOrder
    batch?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    oid?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    first_name?: StringWithAggregatesFilter<"users"> | string
    last_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    roll_number?: StringWithAggregatesFilter<"users"> | string
    branch?: StringWithAggregatesFilter<"users"> | string
    semester?: IntWithAggregatesFilter<"users"> | number
    image_url?: StringNullableWithAggregatesFilter<"users"> | string | null
    batch?: IntWithAggregatesFilter<"users"> | number
  }

  export type attendance_logsWhereInput = {
    AND?: attendance_logsWhereInput | attendance_logsWhereInput[]
    OR?: attendance_logsWhereInput[]
    NOT?: attendance_logsWhereInput | attendance_logsWhereInput[]
    id?: StringFilter<"attendance_logs"> | string
    user_id?: StringFilter<"attendance_logs"> | string
    course_code?: StringFilter<"attendance_logs"> | string
    lecture_date?: DateTimeFilter<"attendance_logs"> | Date | string
    start_time?: DateTimeFilter<"attendance_logs"> | Date | string
    end_time?: DateTimeFilter<"attendance_logs"> | Date | string
    status?: Enumattendance_logs_statusNullableFilter<"attendance_logs"> | $Enums.attendance_logs_status | null
    courses?: XOR<CoursesScalarRelationFilter, coursesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type attendance_logsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    course_code?: SortOrder
    lecture_date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status?: SortOrderInput | SortOrder
    courses?: coursesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: attendance_logsOrderByRelevanceInput
  }

  export type attendance_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_course_code_start_time_status?: attendance_logsUser_idCourse_codeStart_timeStatusCompoundUniqueInput
    AND?: attendance_logsWhereInput | attendance_logsWhereInput[]
    OR?: attendance_logsWhereInput[]
    NOT?: attendance_logsWhereInput | attendance_logsWhereInput[]
    user_id?: StringFilter<"attendance_logs"> | string
    course_code?: StringFilter<"attendance_logs"> | string
    lecture_date?: DateTimeFilter<"attendance_logs"> | Date | string
    start_time?: DateTimeFilter<"attendance_logs"> | Date | string
    end_time?: DateTimeFilter<"attendance_logs"> | Date | string
    status?: Enumattendance_logs_statusNullableFilter<"attendance_logs"> | $Enums.attendance_logs_status | null
    courses?: XOR<CoursesScalarRelationFilter, coursesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "user_id_course_code_start_time_status">

  export type attendance_logsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    course_code?: SortOrder
    lecture_date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status?: SortOrderInput | SortOrder
    _count?: attendance_logsCountOrderByAggregateInput
    _max?: attendance_logsMaxOrderByAggregateInput
    _min?: attendance_logsMinOrderByAggregateInput
  }

  export type attendance_logsScalarWhereWithAggregatesInput = {
    AND?: attendance_logsScalarWhereWithAggregatesInput | attendance_logsScalarWhereWithAggregatesInput[]
    OR?: attendance_logsScalarWhereWithAggregatesInput[]
    NOT?: attendance_logsScalarWhereWithAggregatesInput | attendance_logsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"attendance_logs"> | string
    user_id?: StringWithAggregatesFilter<"attendance_logs"> | string
    course_code?: StringWithAggregatesFilter<"attendance_logs"> | string
    lecture_date?: DateTimeWithAggregatesFilter<"attendance_logs"> | Date | string
    start_time?: DateTimeWithAggregatesFilter<"attendance_logs"> | Date | string
    end_time?: DateTimeWithAggregatesFilter<"attendance_logs"> | Date | string
    status?: Enumattendance_logs_statusNullableWithAggregatesFilter<"attendance_logs"> | $Enums.attendance_logs_status | null
  }

  export type course_attendanceWhereInput = {
    AND?: course_attendanceWhereInput | course_attendanceWhereInput[]
    OR?: course_attendanceWhereInput[]
    NOT?: course_attendanceWhereInput | course_attendanceWhereInput[]
    user_id?: StringFilter<"course_attendance"> | string
    course_code?: StringFilter<"course_attendance"> | string
    present_total?: IntFilter<"course_attendance"> | number
    absent_total?: IntFilter<"course_attendance"> | number
    medical_total?: IntFilter<"course_attendance"> | number
    total_classes?: IntFilter<"course_attendance"> | number
    courses?: XOR<CoursesScalarRelationFilter, coursesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type course_attendanceOrderByWithRelationInput = {
    user_id?: SortOrder
    course_code?: SortOrder
    present_total?: SortOrder
    absent_total?: SortOrder
    medical_total?: SortOrder
    total_classes?: SortOrder
    courses?: coursesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: course_attendanceOrderByRelevanceInput
  }

  export type course_attendanceWhereUniqueInput = Prisma.AtLeast<{
    user_id_course_code?: course_attendanceUser_idCourse_codeCompoundUniqueInput
    AND?: course_attendanceWhereInput | course_attendanceWhereInput[]
    OR?: course_attendanceWhereInput[]
    NOT?: course_attendanceWhereInput | course_attendanceWhereInput[]
    user_id?: StringFilter<"course_attendance"> | string
    course_code?: StringFilter<"course_attendance"> | string
    present_total?: IntFilter<"course_attendance"> | number
    absent_total?: IntFilter<"course_attendance"> | number
    medical_total?: IntFilter<"course_attendance"> | number
    total_classes?: IntFilter<"course_attendance"> | number
    courses?: XOR<CoursesScalarRelationFilter, coursesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "user_id_course_code">

  export type course_attendanceOrderByWithAggregationInput = {
    user_id?: SortOrder
    course_code?: SortOrder
    present_total?: SortOrder
    absent_total?: SortOrder
    medical_total?: SortOrder
    total_classes?: SortOrder
    _count?: course_attendanceCountOrderByAggregateInput
    _avg?: course_attendanceAvgOrderByAggregateInput
    _max?: course_attendanceMaxOrderByAggregateInput
    _min?: course_attendanceMinOrderByAggregateInput
    _sum?: course_attendanceSumOrderByAggregateInput
  }

  export type course_attendanceScalarWhereWithAggregatesInput = {
    AND?: course_attendanceScalarWhereWithAggregatesInput | course_attendanceScalarWhereWithAggregatesInput[]
    OR?: course_attendanceScalarWhereWithAggregatesInput[]
    NOT?: course_attendanceScalarWhereWithAggregatesInput | course_attendanceScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"course_attendance"> | string
    course_code?: StringWithAggregatesFilter<"course_attendance"> | string
    present_total?: IntWithAggregatesFilter<"course_attendance"> | number
    absent_total?: IntWithAggregatesFilter<"course_attendance"> | number
    medical_total?: IntWithAggregatesFilter<"course_attendance"> | number
    total_classes?: IntWithAggregatesFilter<"course_attendance"> | number
  }

  export type coursesWhereInput = {
    AND?: coursesWhereInput | coursesWhereInput[]
    OR?: coursesWhereInput[]
    NOT?: coursesWhereInput | coursesWhereInput[]
    course_code?: StringFilter<"courses"> | string
    course_name?: StringFilter<"courses"> | string
    semester?: IntFilter<"courses"> | number
    branch?: StringFilter<"courses"> | string
    attendance_logs?: Attendance_logsListRelationFilter
    course_attendance?: Course_attendanceListRelationFilter
  }

  export type coursesOrderByWithRelationInput = {
    course_code?: SortOrder
    course_name?: SortOrder
    semester?: SortOrder
    branch?: SortOrder
    attendance_logs?: attendance_logsOrderByRelationAggregateInput
    course_attendance?: course_attendanceOrderByRelationAggregateInput
    _relevance?: coursesOrderByRelevanceInput
  }

  export type coursesWhereUniqueInput = Prisma.AtLeast<{
    course_code?: string
    AND?: coursesWhereInput | coursesWhereInput[]
    OR?: coursesWhereInput[]
    NOT?: coursesWhereInput | coursesWhereInput[]
    course_name?: StringFilter<"courses"> | string
    semester?: IntFilter<"courses"> | number
    branch?: StringFilter<"courses"> | string
    attendance_logs?: Attendance_logsListRelationFilter
    course_attendance?: Course_attendanceListRelationFilter
  }, "course_code">

  export type coursesOrderByWithAggregationInput = {
    course_code?: SortOrder
    course_name?: SortOrder
    semester?: SortOrder
    branch?: SortOrder
    _count?: coursesCountOrderByAggregateInput
    _avg?: coursesAvgOrderByAggregateInput
    _max?: coursesMaxOrderByAggregateInput
    _min?: coursesMinOrderByAggregateInput
    _sum?: coursesSumOrderByAggregateInput
  }

  export type coursesScalarWhereWithAggregatesInput = {
    AND?: coursesScalarWhereWithAggregatesInput | coursesScalarWhereWithAggregatesInput[]
    OR?: coursesScalarWhereWithAggregatesInput[]
    NOT?: coursesScalarWhereWithAggregatesInput | coursesScalarWhereWithAggregatesInput[]
    course_code?: StringWithAggregatesFilter<"courses"> | string
    course_name?: StringWithAggregatesFilter<"courses"> | string
    semester?: IntWithAggregatesFilter<"courses"> | number
    branch?: StringWithAggregatesFilter<"courses"> | string
  }

  export type usersCreateInput = {
    id?: string
    oid: string
    email: string
    first_name: string
    last_name?: string | null
    roll_number: string
    branch: string
    semester: number
    image_url?: string | null
    batch: number
    attendance_logs?: attendance_logsCreateNestedManyWithoutUsersInput
    course_attendance?: course_attendanceCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    oid: string
    email: string
    first_name: string
    last_name?: string | null
    roll_number: string
    branch: string
    semester: number
    image_url?: string | null
    batch: number
    attendance_logs?: attendance_logsUncheckedCreateNestedManyWithoutUsersInput
    course_attendance?: course_attendanceUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
    attendance_logs?: attendance_logsUpdateManyWithoutUsersNestedInput
    course_attendance?: course_attendanceUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
    attendance_logs?: attendance_logsUncheckedUpdateManyWithoutUsersNestedInput
    course_attendance?: course_attendanceUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    oid: string
    email: string
    first_name: string
    last_name?: string | null
    roll_number: string
    branch: string
    semester: number
    image_url?: string | null
    batch: number
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
  }

  export type attendance_logsCreateInput = {
    id?: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
    courses: coursesCreateNestedOneWithoutAttendance_logsInput
    users: usersCreateNestedOneWithoutAttendance_logsInput
  }

  export type attendance_logsUncheckedCreateInput = {
    id?: string
    user_id: string
    course_code: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
  }

  export type attendance_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
    courses?: coursesUpdateOneRequiredWithoutAttendance_logsNestedInput
    users?: usersUpdateOneRequiredWithoutAttendance_logsNestedInput
  }

  export type attendance_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
  }

  export type attendance_logsCreateManyInput = {
    id?: string
    user_id: string
    course_code: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
  }

  export type attendance_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
  }

  export type attendance_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
  }

  export type course_attendanceCreateInput = {
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
    courses: coursesCreateNestedOneWithoutCourse_attendanceInput
    users: usersCreateNestedOneWithoutCourse_attendanceInput
  }

  export type course_attendanceUncheckedCreateInput = {
    user_id: string
    course_code: string
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
  }

  export type course_attendanceUpdateInput = {
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
    courses?: coursesUpdateOneRequiredWithoutCourse_attendanceNestedInput
    users?: usersUpdateOneRequiredWithoutCourse_attendanceNestedInput
  }

  export type course_attendanceUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
  }

  export type course_attendanceCreateManyInput = {
    user_id: string
    course_code: string
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
  }

  export type course_attendanceUpdateManyMutationInput = {
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
  }

  export type course_attendanceUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
  }

  export type coursesCreateInput = {
    course_code: string
    course_name: string
    semester: number
    branch: string
    attendance_logs?: attendance_logsCreateNestedManyWithoutCoursesInput
    course_attendance?: course_attendanceCreateNestedManyWithoutCoursesInput
  }

  export type coursesUncheckedCreateInput = {
    course_code: string
    course_name: string
    semester: number
    branch: string
    attendance_logs?: attendance_logsUncheckedCreateNestedManyWithoutCoursesInput
    course_attendance?: course_attendanceUncheckedCreateNestedManyWithoutCoursesInput
  }

  export type coursesUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
    attendance_logs?: attendance_logsUpdateManyWithoutCoursesNestedInput
    course_attendance?: course_attendanceUpdateManyWithoutCoursesNestedInput
  }

  export type coursesUncheckedUpdateInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
    attendance_logs?: attendance_logsUncheckedUpdateManyWithoutCoursesNestedInput
    course_attendance?: course_attendanceUncheckedUpdateManyWithoutCoursesNestedInput
  }

  export type coursesCreateManyInput = {
    course_code: string
    course_name: string
    semester: number
    branch: string
  }

  export type coursesUpdateManyMutationInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
  }

  export type coursesUncheckedUpdateManyInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type Attendance_logsListRelationFilter = {
    every?: attendance_logsWhereInput
    some?: attendance_logsWhereInput
    none?: attendance_logsWhereInput
  }

  export type Course_attendanceListRelationFilter = {
    every?: course_attendanceWhereInput
    some?: course_attendanceWhereInput
    none?: course_attendanceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type attendance_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type course_attendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    oid?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    roll_number?: SortOrder
    branch?: SortOrder
    semester?: SortOrder
    image_url?: SortOrder
    batch?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    semester?: SortOrder
    batch?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    oid?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    roll_number?: SortOrder
    branch?: SortOrder
    semester?: SortOrder
    image_url?: SortOrder
    batch?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    oid?: SortOrder
    email?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    roll_number?: SortOrder
    branch?: SortOrder
    semester?: SortOrder
    image_url?: SortOrder
    batch?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    semester?: SortOrder
    batch?: SortOrder
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type Enumattendance_logs_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.attendance_logs_status | Enumattendance_logs_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.attendance_logs_status[] | null
    notIn?: $Enums.attendance_logs_status[] | null
    not?: NestedEnumattendance_logs_statusNullableFilter<$PrismaModel> | $Enums.attendance_logs_status | null
  }

  export type CoursesScalarRelationFilter = {
    is?: coursesWhereInput
    isNot?: coursesWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type attendance_logsOrderByRelevanceInput = {
    fields: attendance_logsOrderByRelevanceFieldEnum | attendance_logsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type attendance_logsUser_idCourse_codeStart_timeStatusCompoundUniqueInput = {
    user_id: string
    course_code: string
    start_time: Date | string
    status: $Enums.attendance_logs_status
  }

  export type attendance_logsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    course_code?: SortOrder
    lecture_date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status?: SortOrder
  }

  export type attendance_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    course_code?: SortOrder
    lecture_date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status?: SortOrder
  }

  export type attendance_logsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    course_code?: SortOrder
    lecture_date?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status?: SortOrder
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

  export type Enumattendance_logs_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.attendance_logs_status | Enumattendance_logs_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.attendance_logs_status[] | null
    notIn?: $Enums.attendance_logs_status[] | null
    not?: NestedEnumattendance_logs_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.attendance_logs_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumattendance_logs_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumattendance_logs_statusNullableFilter<$PrismaModel>
  }

  export type course_attendanceOrderByRelevanceInput = {
    fields: course_attendanceOrderByRelevanceFieldEnum | course_attendanceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type course_attendanceUser_idCourse_codeCompoundUniqueInput = {
    user_id: string
    course_code: string
  }

  export type course_attendanceCountOrderByAggregateInput = {
    user_id?: SortOrder
    course_code?: SortOrder
    present_total?: SortOrder
    absent_total?: SortOrder
    medical_total?: SortOrder
    total_classes?: SortOrder
  }

  export type course_attendanceAvgOrderByAggregateInput = {
    present_total?: SortOrder
    absent_total?: SortOrder
    medical_total?: SortOrder
    total_classes?: SortOrder
  }

  export type course_attendanceMaxOrderByAggregateInput = {
    user_id?: SortOrder
    course_code?: SortOrder
    present_total?: SortOrder
    absent_total?: SortOrder
    medical_total?: SortOrder
    total_classes?: SortOrder
  }

  export type course_attendanceMinOrderByAggregateInput = {
    user_id?: SortOrder
    course_code?: SortOrder
    present_total?: SortOrder
    absent_total?: SortOrder
    medical_total?: SortOrder
    total_classes?: SortOrder
  }

  export type course_attendanceSumOrderByAggregateInput = {
    present_total?: SortOrder
    absent_total?: SortOrder
    medical_total?: SortOrder
    total_classes?: SortOrder
  }

  export type coursesOrderByRelevanceInput = {
    fields: coursesOrderByRelevanceFieldEnum | coursesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type coursesCountOrderByAggregateInput = {
    course_code?: SortOrder
    course_name?: SortOrder
    semester?: SortOrder
    branch?: SortOrder
  }

  export type coursesAvgOrderByAggregateInput = {
    semester?: SortOrder
  }

  export type coursesMaxOrderByAggregateInput = {
    course_code?: SortOrder
    course_name?: SortOrder
    semester?: SortOrder
    branch?: SortOrder
  }

  export type coursesMinOrderByAggregateInput = {
    course_code?: SortOrder
    course_name?: SortOrder
    semester?: SortOrder
    branch?: SortOrder
  }

  export type coursesSumOrderByAggregateInput = {
    semester?: SortOrder
  }

  export type attendance_logsCreateNestedManyWithoutUsersInput = {
    create?: XOR<attendance_logsCreateWithoutUsersInput, attendance_logsUncheckedCreateWithoutUsersInput> | attendance_logsCreateWithoutUsersInput[] | attendance_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutUsersInput | attendance_logsCreateOrConnectWithoutUsersInput[]
    createMany?: attendance_logsCreateManyUsersInputEnvelope
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
  }

  export type course_attendanceCreateNestedManyWithoutUsersInput = {
    create?: XOR<course_attendanceCreateWithoutUsersInput, course_attendanceUncheckedCreateWithoutUsersInput> | course_attendanceCreateWithoutUsersInput[] | course_attendanceUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutUsersInput | course_attendanceCreateOrConnectWithoutUsersInput[]
    createMany?: course_attendanceCreateManyUsersInputEnvelope
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
  }

  export type attendance_logsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<attendance_logsCreateWithoutUsersInput, attendance_logsUncheckedCreateWithoutUsersInput> | attendance_logsCreateWithoutUsersInput[] | attendance_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutUsersInput | attendance_logsCreateOrConnectWithoutUsersInput[]
    createMany?: attendance_logsCreateManyUsersInputEnvelope
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
  }

  export type course_attendanceUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<course_attendanceCreateWithoutUsersInput, course_attendanceUncheckedCreateWithoutUsersInput> | course_attendanceCreateWithoutUsersInput[] | course_attendanceUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutUsersInput | course_attendanceCreateOrConnectWithoutUsersInput[]
    createMany?: course_attendanceCreateManyUsersInputEnvelope
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type attendance_logsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<attendance_logsCreateWithoutUsersInput, attendance_logsUncheckedCreateWithoutUsersInput> | attendance_logsCreateWithoutUsersInput[] | attendance_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutUsersInput | attendance_logsCreateOrConnectWithoutUsersInput[]
    upsert?: attendance_logsUpsertWithWhereUniqueWithoutUsersInput | attendance_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: attendance_logsCreateManyUsersInputEnvelope
    set?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    disconnect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    delete?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    update?: attendance_logsUpdateWithWhereUniqueWithoutUsersInput | attendance_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: attendance_logsUpdateManyWithWhereWithoutUsersInput | attendance_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: attendance_logsScalarWhereInput | attendance_logsScalarWhereInput[]
  }

  export type course_attendanceUpdateManyWithoutUsersNestedInput = {
    create?: XOR<course_attendanceCreateWithoutUsersInput, course_attendanceUncheckedCreateWithoutUsersInput> | course_attendanceCreateWithoutUsersInput[] | course_attendanceUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutUsersInput | course_attendanceCreateOrConnectWithoutUsersInput[]
    upsert?: course_attendanceUpsertWithWhereUniqueWithoutUsersInput | course_attendanceUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: course_attendanceCreateManyUsersInputEnvelope
    set?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    disconnect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    delete?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    update?: course_attendanceUpdateWithWhereUniqueWithoutUsersInput | course_attendanceUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: course_attendanceUpdateManyWithWhereWithoutUsersInput | course_attendanceUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: course_attendanceScalarWhereInput | course_attendanceScalarWhereInput[]
  }

  export type attendance_logsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<attendance_logsCreateWithoutUsersInput, attendance_logsUncheckedCreateWithoutUsersInput> | attendance_logsCreateWithoutUsersInput[] | attendance_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutUsersInput | attendance_logsCreateOrConnectWithoutUsersInput[]
    upsert?: attendance_logsUpsertWithWhereUniqueWithoutUsersInput | attendance_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: attendance_logsCreateManyUsersInputEnvelope
    set?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    disconnect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    delete?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    update?: attendance_logsUpdateWithWhereUniqueWithoutUsersInput | attendance_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: attendance_logsUpdateManyWithWhereWithoutUsersInput | attendance_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: attendance_logsScalarWhereInput | attendance_logsScalarWhereInput[]
  }

  export type course_attendanceUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<course_attendanceCreateWithoutUsersInput, course_attendanceUncheckedCreateWithoutUsersInput> | course_attendanceCreateWithoutUsersInput[] | course_attendanceUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutUsersInput | course_attendanceCreateOrConnectWithoutUsersInput[]
    upsert?: course_attendanceUpsertWithWhereUniqueWithoutUsersInput | course_attendanceUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: course_attendanceCreateManyUsersInputEnvelope
    set?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    disconnect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    delete?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    update?: course_attendanceUpdateWithWhereUniqueWithoutUsersInput | course_attendanceUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: course_attendanceUpdateManyWithWhereWithoutUsersInput | course_attendanceUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: course_attendanceScalarWhereInput | course_attendanceScalarWhereInput[]
  }

  export type coursesCreateNestedOneWithoutAttendance_logsInput = {
    create?: XOR<coursesCreateWithoutAttendance_logsInput, coursesUncheckedCreateWithoutAttendance_logsInput>
    connectOrCreate?: coursesCreateOrConnectWithoutAttendance_logsInput
    connect?: coursesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutAttendance_logsInput = {
    create?: XOR<usersCreateWithoutAttendance_logsInput, usersUncheckedCreateWithoutAttendance_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAttendance_logsInput
    connect?: usersWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableEnumattendance_logs_statusFieldUpdateOperationsInput = {
    set?: $Enums.attendance_logs_status | null
  }

  export type coursesUpdateOneRequiredWithoutAttendance_logsNestedInput = {
    create?: XOR<coursesCreateWithoutAttendance_logsInput, coursesUncheckedCreateWithoutAttendance_logsInput>
    connectOrCreate?: coursesCreateOrConnectWithoutAttendance_logsInput
    upsert?: coursesUpsertWithoutAttendance_logsInput
    connect?: coursesWhereUniqueInput
    update?: XOR<XOR<coursesUpdateToOneWithWhereWithoutAttendance_logsInput, coursesUpdateWithoutAttendance_logsInput>, coursesUncheckedUpdateWithoutAttendance_logsInput>
  }

  export type usersUpdateOneRequiredWithoutAttendance_logsNestedInput = {
    create?: XOR<usersCreateWithoutAttendance_logsInput, usersUncheckedCreateWithoutAttendance_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAttendance_logsInput
    upsert?: usersUpsertWithoutAttendance_logsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAttendance_logsInput, usersUpdateWithoutAttendance_logsInput>, usersUncheckedUpdateWithoutAttendance_logsInput>
  }

  export type coursesCreateNestedOneWithoutCourse_attendanceInput = {
    create?: XOR<coursesCreateWithoutCourse_attendanceInput, coursesUncheckedCreateWithoutCourse_attendanceInput>
    connectOrCreate?: coursesCreateOrConnectWithoutCourse_attendanceInput
    connect?: coursesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutCourse_attendanceInput = {
    create?: XOR<usersCreateWithoutCourse_attendanceInput, usersUncheckedCreateWithoutCourse_attendanceInput>
    connectOrCreate?: usersCreateOrConnectWithoutCourse_attendanceInput
    connect?: usersWhereUniqueInput
  }

  export type coursesUpdateOneRequiredWithoutCourse_attendanceNestedInput = {
    create?: XOR<coursesCreateWithoutCourse_attendanceInput, coursesUncheckedCreateWithoutCourse_attendanceInput>
    connectOrCreate?: coursesCreateOrConnectWithoutCourse_attendanceInput
    upsert?: coursesUpsertWithoutCourse_attendanceInput
    connect?: coursesWhereUniqueInput
    update?: XOR<XOR<coursesUpdateToOneWithWhereWithoutCourse_attendanceInput, coursesUpdateWithoutCourse_attendanceInput>, coursesUncheckedUpdateWithoutCourse_attendanceInput>
  }

  export type usersUpdateOneRequiredWithoutCourse_attendanceNestedInput = {
    create?: XOR<usersCreateWithoutCourse_attendanceInput, usersUncheckedCreateWithoutCourse_attendanceInput>
    connectOrCreate?: usersCreateOrConnectWithoutCourse_attendanceInput
    upsert?: usersUpsertWithoutCourse_attendanceInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCourse_attendanceInput, usersUpdateWithoutCourse_attendanceInput>, usersUncheckedUpdateWithoutCourse_attendanceInput>
  }

  export type attendance_logsCreateNestedManyWithoutCoursesInput = {
    create?: XOR<attendance_logsCreateWithoutCoursesInput, attendance_logsUncheckedCreateWithoutCoursesInput> | attendance_logsCreateWithoutCoursesInput[] | attendance_logsUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutCoursesInput | attendance_logsCreateOrConnectWithoutCoursesInput[]
    createMany?: attendance_logsCreateManyCoursesInputEnvelope
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
  }

  export type course_attendanceCreateNestedManyWithoutCoursesInput = {
    create?: XOR<course_attendanceCreateWithoutCoursesInput, course_attendanceUncheckedCreateWithoutCoursesInput> | course_attendanceCreateWithoutCoursesInput[] | course_attendanceUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutCoursesInput | course_attendanceCreateOrConnectWithoutCoursesInput[]
    createMany?: course_attendanceCreateManyCoursesInputEnvelope
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
  }

  export type attendance_logsUncheckedCreateNestedManyWithoutCoursesInput = {
    create?: XOR<attendance_logsCreateWithoutCoursesInput, attendance_logsUncheckedCreateWithoutCoursesInput> | attendance_logsCreateWithoutCoursesInput[] | attendance_logsUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutCoursesInput | attendance_logsCreateOrConnectWithoutCoursesInput[]
    createMany?: attendance_logsCreateManyCoursesInputEnvelope
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
  }

  export type course_attendanceUncheckedCreateNestedManyWithoutCoursesInput = {
    create?: XOR<course_attendanceCreateWithoutCoursesInput, course_attendanceUncheckedCreateWithoutCoursesInput> | course_attendanceCreateWithoutCoursesInput[] | course_attendanceUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutCoursesInput | course_attendanceCreateOrConnectWithoutCoursesInput[]
    createMany?: course_attendanceCreateManyCoursesInputEnvelope
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
  }

  export type attendance_logsUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<attendance_logsCreateWithoutCoursesInput, attendance_logsUncheckedCreateWithoutCoursesInput> | attendance_logsCreateWithoutCoursesInput[] | attendance_logsUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutCoursesInput | attendance_logsCreateOrConnectWithoutCoursesInput[]
    upsert?: attendance_logsUpsertWithWhereUniqueWithoutCoursesInput | attendance_logsUpsertWithWhereUniqueWithoutCoursesInput[]
    createMany?: attendance_logsCreateManyCoursesInputEnvelope
    set?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    disconnect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    delete?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    update?: attendance_logsUpdateWithWhereUniqueWithoutCoursesInput | attendance_logsUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: attendance_logsUpdateManyWithWhereWithoutCoursesInput | attendance_logsUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: attendance_logsScalarWhereInput | attendance_logsScalarWhereInput[]
  }

  export type course_attendanceUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<course_attendanceCreateWithoutCoursesInput, course_attendanceUncheckedCreateWithoutCoursesInput> | course_attendanceCreateWithoutCoursesInput[] | course_attendanceUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutCoursesInput | course_attendanceCreateOrConnectWithoutCoursesInput[]
    upsert?: course_attendanceUpsertWithWhereUniqueWithoutCoursesInput | course_attendanceUpsertWithWhereUniqueWithoutCoursesInput[]
    createMany?: course_attendanceCreateManyCoursesInputEnvelope
    set?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    disconnect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    delete?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    update?: course_attendanceUpdateWithWhereUniqueWithoutCoursesInput | course_attendanceUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: course_attendanceUpdateManyWithWhereWithoutCoursesInput | course_attendanceUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: course_attendanceScalarWhereInput | course_attendanceScalarWhereInput[]
  }

  export type attendance_logsUncheckedUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<attendance_logsCreateWithoutCoursesInput, attendance_logsUncheckedCreateWithoutCoursesInput> | attendance_logsCreateWithoutCoursesInput[] | attendance_logsUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: attendance_logsCreateOrConnectWithoutCoursesInput | attendance_logsCreateOrConnectWithoutCoursesInput[]
    upsert?: attendance_logsUpsertWithWhereUniqueWithoutCoursesInput | attendance_logsUpsertWithWhereUniqueWithoutCoursesInput[]
    createMany?: attendance_logsCreateManyCoursesInputEnvelope
    set?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    disconnect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    delete?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    connect?: attendance_logsWhereUniqueInput | attendance_logsWhereUniqueInput[]
    update?: attendance_logsUpdateWithWhereUniqueWithoutCoursesInput | attendance_logsUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: attendance_logsUpdateManyWithWhereWithoutCoursesInput | attendance_logsUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: attendance_logsScalarWhereInput | attendance_logsScalarWhereInput[]
  }

  export type course_attendanceUncheckedUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<course_attendanceCreateWithoutCoursesInput, course_attendanceUncheckedCreateWithoutCoursesInput> | course_attendanceCreateWithoutCoursesInput[] | course_attendanceUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: course_attendanceCreateOrConnectWithoutCoursesInput | course_attendanceCreateOrConnectWithoutCoursesInput[]
    upsert?: course_attendanceUpsertWithWhereUniqueWithoutCoursesInput | course_attendanceUpsertWithWhereUniqueWithoutCoursesInput[]
    createMany?: course_attendanceCreateManyCoursesInputEnvelope
    set?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    disconnect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    delete?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    connect?: course_attendanceWhereUniqueInput | course_attendanceWhereUniqueInput[]
    update?: course_attendanceUpdateWithWhereUniqueWithoutCoursesInput | course_attendanceUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: course_attendanceUpdateManyWithWhereWithoutCoursesInput | course_attendanceUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: course_attendanceScalarWhereInput | course_attendanceScalarWhereInput[]
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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
    search?: string
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

  export type NestedEnumattendance_logs_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.attendance_logs_status | Enumattendance_logs_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.attendance_logs_status[] | null
    notIn?: $Enums.attendance_logs_status[] | null
    not?: NestedEnumattendance_logs_statusNullableFilter<$PrismaModel> | $Enums.attendance_logs_status | null
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

  export type NestedEnumattendance_logs_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.attendance_logs_status | Enumattendance_logs_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.attendance_logs_status[] | null
    notIn?: $Enums.attendance_logs_status[] | null
    not?: NestedEnumattendance_logs_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.attendance_logs_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumattendance_logs_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumattendance_logs_statusNullableFilter<$PrismaModel>
  }

  export type attendance_logsCreateWithoutUsersInput = {
    id?: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
    courses: coursesCreateNestedOneWithoutAttendance_logsInput
  }

  export type attendance_logsUncheckedCreateWithoutUsersInput = {
    id?: string
    course_code: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
  }

  export type attendance_logsCreateOrConnectWithoutUsersInput = {
    where: attendance_logsWhereUniqueInput
    create: XOR<attendance_logsCreateWithoutUsersInput, attendance_logsUncheckedCreateWithoutUsersInput>
  }

  export type attendance_logsCreateManyUsersInputEnvelope = {
    data: attendance_logsCreateManyUsersInput | attendance_logsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type course_attendanceCreateWithoutUsersInput = {
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
    courses: coursesCreateNestedOneWithoutCourse_attendanceInput
  }

  export type course_attendanceUncheckedCreateWithoutUsersInput = {
    course_code: string
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
  }

  export type course_attendanceCreateOrConnectWithoutUsersInput = {
    where: course_attendanceWhereUniqueInput
    create: XOR<course_attendanceCreateWithoutUsersInput, course_attendanceUncheckedCreateWithoutUsersInput>
  }

  export type course_attendanceCreateManyUsersInputEnvelope = {
    data: course_attendanceCreateManyUsersInput | course_attendanceCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type attendance_logsUpsertWithWhereUniqueWithoutUsersInput = {
    where: attendance_logsWhereUniqueInput
    update: XOR<attendance_logsUpdateWithoutUsersInput, attendance_logsUncheckedUpdateWithoutUsersInput>
    create: XOR<attendance_logsCreateWithoutUsersInput, attendance_logsUncheckedCreateWithoutUsersInput>
  }

  export type attendance_logsUpdateWithWhereUniqueWithoutUsersInput = {
    where: attendance_logsWhereUniqueInput
    data: XOR<attendance_logsUpdateWithoutUsersInput, attendance_logsUncheckedUpdateWithoutUsersInput>
  }

  export type attendance_logsUpdateManyWithWhereWithoutUsersInput = {
    where: attendance_logsScalarWhereInput
    data: XOR<attendance_logsUpdateManyMutationInput, attendance_logsUncheckedUpdateManyWithoutUsersInput>
  }

  export type attendance_logsScalarWhereInput = {
    AND?: attendance_logsScalarWhereInput | attendance_logsScalarWhereInput[]
    OR?: attendance_logsScalarWhereInput[]
    NOT?: attendance_logsScalarWhereInput | attendance_logsScalarWhereInput[]
    id?: StringFilter<"attendance_logs"> | string
    user_id?: StringFilter<"attendance_logs"> | string
    course_code?: StringFilter<"attendance_logs"> | string
    lecture_date?: DateTimeFilter<"attendance_logs"> | Date | string
    start_time?: DateTimeFilter<"attendance_logs"> | Date | string
    end_time?: DateTimeFilter<"attendance_logs"> | Date | string
    status?: Enumattendance_logs_statusNullableFilter<"attendance_logs"> | $Enums.attendance_logs_status | null
  }

  export type course_attendanceUpsertWithWhereUniqueWithoutUsersInput = {
    where: course_attendanceWhereUniqueInput
    update: XOR<course_attendanceUpdateWithoutUsersInput, course_attendanceUncheckedUpdateWithoutUsersInput>
    create: XOR<course_attendanceCreateWithoutUsersInput, course_attendanceUncheckedCreateWithoutUsersInput>
  }

  export type course_attendanceUpdateWithWhereUniqueWithoutUsersInput = {
    where: course_attendanceWhereUniqueInput
    data: XOR<course_attendanceUpdateWithoutUsersInput, course_attendanceUncheckedUpdateWithoutUsersInput>
  }

  export type course_attendanceUpdateManyWithWhereWithoutUsersInput = {
    where: course_attendanceScalarWhereInput
    data: XOR<course_attendanceUpdateManyMutationInput, course_attendanceUncheckedUpdateManyWithoutUsersInput>
  }

  export type course_attendanceScalarWhereInput = {
    AND?: course_attendanceScalarWhereInput | course_attendanceScalarWhereInput[]
    OR?: course_attendanceScalarWhereInput[]
    NOT?: course_attendanceScalarWhereInput | course_attendanceScalarWhereInput[]
    user_id?: StringFilter<"course_attendance"> | string
    course_code?: StringFilter<"course_attendance"> | string
    present_total?: IntFilter<"course_attendance"> | number
    absent_total?: IntFilter<"course_attendance"> | number
    medical_total?: IntFilter<"course_attendance"> | number
    total_classes?: IntFilter<"course_attendance"> | number
  }

  export type coursesCreateWithoutAttendance_logsInput = {
    course_code: string
    course_name: string
    semester: number
    branch: string
    course_attendance?: course_attendanceCreateNestedManyWithoutCoursesInput
  }

  export type coursesUncheckedCreateWithoutAttendance_logsInput = {
    course_code: string
    course_name: string
    semester: number
    branch: string
    course_attendance?: course_attendanceUncheckedCreateNestedManyWithoutCoursesInput
  }

  export type coursesCreateOrConnectWithoutAttendance_logsInput = {
    where: coursesWhereUniqueInput
    create: XOR<coursesCreateWithoutAttendance_logsInput, coursesUncheckedCreateWithoutAttendance_logsInput>
  }

  export type usersCreateWithoutAttendance_logsInput = {
    id?: string
    oid: string
    email: string
    first_name: string
    last_name?: string | null
    roll_number: string
    branch: string
    semester: number
    image_url?: string | null
    batch: number
    course_attendance?: course_attendanceCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutAttendance_logsInput = {
    id?: string
    oid: string
    email: string
    first_name: string
    last_name?: string | null
    roll_number: string
    branch: string
    semester: number
    image_url?: string | null
    batch: number
    course_attendance?: course_attendanceUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutAttendance_logsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAttendance_logsInput, usersUncheckedCreateWithoutAttendance_logsInput>
  }

  export type coursesUpsertWithoutAttendance_logsInput = {
    update: XOR<coursesUpdateWithoutAttendance_logsInput, coursesUncheckedUpdateWithoutAttendance_logsInput>
    create: XOR<coursesCreateWithoutAttendance_logsInput, coursesUncheckedCreateWithoutAttendance_logsInput>
    where?: coursesWhereInput
  }

  export type coursesUpdateToOneWithWhereWithoutAttendance_logsInput = {
    where?: coursesWhereInput
    data: XOR<coursesUpdateWithoutAttendance_logsInput, coursesUncheckedUpdateWithoutAttendance_logsInput>
  }

  export type coursesUpdateWithoutAttendance_logsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
    course_attendance?: course_attendanceUpdateManyWithoutCoursesNestedInput
  }

  export type coursesUncheckedUpdateWithoutAttendance_logsInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
    course_attendance?: course_attendanceUncheckedUpdateManyWithoutCoursesNestedInput
  }

  export type usersUpsertWithoutAttendance_logsInput = {
    update: XOR<usersUpdateWithoutAttendance_logsInput, usersUncheckedUpdateWithoutAttendance_logsInput>
    create: XOR<usersCreateWithoutAttendance_logsInput, usersUncheckedCreateWithoutAttendance_logsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAttendance_logsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAttendance_logsInput, usersUncheckedUpdateWithoutAttendance_logsInput>
  }

  export type usersUpdateWithoutAttendance_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
    course_attendance?: course_attendanceUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutAttendance_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
    course_attendance?: course_attendanceUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type coursesCreateWithoutCourse_attendanceInput = {
    course_code: string
    course_name: string
    semester: number
    branch: string
    attendance_logs?: attendance_logsCreateNestedManyWithoutCoursesInput
  }

  export type coursesUncheckedCreateWithoutCourse_attendanceInput = {
    course_code: string
    course_name: string
    semester: number
    branch: string
    attendance_logs?: attendance_logsUncheckedCreateNestedManyWithoutCoursesInput
  }

  export type coursesCreateOrConnectWithoutCourse_attendanceInput = {
    where: coursesWhereUniqueInput
    create: XOR<coursesCreateWithoutCourse_attendanceInput, coursesUncheckedCreateWithoutCourse_attendanceInput>
  }

  export type usersCreateWithoutCourse_attendanceInput = {
    id?: string
    oid: string
    email: string
    first_name: string
    last_name?: string | null
    roll_number: string
    branch: string
    semester: number
    image_url?: string | null
    batch: number
    attendance_logs?: attendance_logsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutCourse_attendanceInput = {
    id?: string
    oid: string
    email: string
    first_name: string
    last_name?: string | null
    roll_number: string
    branch: string
    semester: number
    image_url?: string | null
    batch: number
    attendance_logs?: attendance_logsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutCourse_attendanceInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCourse_attendanceInput, usersUncheckedCreateWithoutCourse_attendanceInput>
  }

  export type coursesUpsertWithoutCourse_attendanceInput = {
    update: XOR<coursesUpdateWithoutCourse_attendanceInput, coursesUncheckedUpdateWithoutCourse_attendanceInput>
    create: XOR<coursesCreateWithoutCourse_attendanceInput, coursesUncheckedCreateWithoutCourse_attendanceInput>
    where?: coursesWhereInput
  }

  export type coursesUpdateToOneWithWhereWithoutCourse_attendanceInput = {
    where?: coursesWhereInput
    data: XOR<coursesUpdateWithoutCourse_attendanceInput, coursesUncheckedUpdateWithoutCourse_attendanceInput>
  }

  export type coursesUpdateWithoutCourse_attendanceInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
    attendance_logs?: attendance_logsUpdateManyWithoutCoursesNestedInput
  }

  export type coursesUncheckedUpdateWithoutCourse_attendanceInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    branch?: StringFieldUpdateOperationsInput | string
    attendance_logs?: attendance_logsUncheckedUpdateManyWithoutCoursesNestedInput
  }

  export type usersUpsertWithoutCourse_attendanceInput = {
    update: XOR<usersUpdateWithoutCourse_attendanceInput, usersUncheckedUpdateWithoutCourse_attendanceInput>
    create: XOR<usersCreateWithoutCourse_attendanceInput, usersUncheckedCreateWithoutCourse_attendanceInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCourse_attendanceInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCourse_attendanceInput, usersUncheckedUpdateWithoutCourse_attendanceInput>
  }

  export type usersUpdateWithoutCourse_attendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
    attendance_logs?: attendance_logsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutCourse_attendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    oid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    roll_number?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    semester?: IntFieldUpdateOperationsInput | number
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: IntFieldUpdateOperationsInput | number
    attendance_logs?: attendance_logsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type attendance_logsCreateWithoutCoursesInput = {
    id?: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
    users: usersCreateNestedOneWithoutAttendance_logsInput
  }

  export type attendance_logsUncheckedCreateWithoutCoursesInput = {
    id?: string
    user_id: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
  }

  export type attendance_logsCreateOrConnectWithoutCoursesInput = {
    where: attendance_logsWhereUniqueInput
    create: XOR<attendance_logsCreateWithoutCoursesInput, attendance_logsUncheckedCreateWithoutCoursesInput>
  }

  export type attendance_logsCreateManyCoursesInputEnvelope = {
    data: attendance_logsCreateManyCoursesInput | attendance_logsCreateManyCoursesInput[]
    skipDuplicates?: boolean
  }

  export type course_attendanceCreateWithoutCoursesInput = {
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
    users: usersCreateNestedOneWithoutCourse_attendanceInput
  }

  export type course_attendanceUncheckedCreateWithoutCoursesInput = {
    user_id: string
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
  }

  export type course_attendanceCreateOrConnectWithoutCoursesInput = {
    where: course_attendanceWhereUniqueInput
    create: XOR<course_attendanceCreateWithoutCoursesInput, course_attendanceUncheckedCreateWithoutCoursesInput>
  }

  export type course_attendanceCreateManyCoursesInputEnvelope = {
    data: course_attendanceCreateManyCoursesInput | course_attendanceCreateManyCoursesInput[]
    skipDuplicates?: boolean
  }

  export type attendance_logsUpsertWithWhereUniqueWithoutCoursesInput = {
    where: attendance_logsWhereUniqueInput
    update: XOR<attendance_logsUpdateWithoutCoursesInput, attendance_logsUncheckedUpdateWithoutCoursesInput>
    create: XOR<attendance_logsCreateWithoutCoursesInput, attendance_logsUncheckedCreateWithoutCoursesInput>
  }

  export type attendance_logsUpdateWithWhereUniqueWithoutCoursesInput = {
    where: attendance_logsWhereUniqueInput
    data: XOR<attendance_logsUpdateWithoutCoursesInput, attendance_logsUncheckedUpdateWithoutCoursesInput>
  }

  export type attendance_logsUpdateManyWithWhereWithoutCoursesInput = {
    where: attendance_logsScalarWhereInput
    data: XOR<attendance_logsUpdateManyMutationInput, attendance_logsUncheckedUpdateManyWithoutCoursesInput>
  }

  export type course_attendanceUpsertWithWhereUniqueWithoutCoursesInput = {
    where: course_attendanceWhereUniqueInput
    update: XOR<course_attendanceUpdateWithoutCoursesInput, course_attendanceUncheckedUpdateWithoutCoursesInput>
    create: XOR<course_attendanceCreateWithoutCoursesInput, course_attendanceUncheckedCreateWithoutCoursesInput>
  }

  export type course_attendanceUpdateWithWhereUniqueWithoutCoursesInput = {
    where: course_attendanceWhereUniqueInput
    data: XOR<course_attendanceUpdateWithoutCoursesInput, course_attendanceUncheckedUpdateWithoutCoursesInput>
  }

  export type course_attendanceUpdateManyWithWhereWithoutCoursesInput = {
    where: course_attendanceScalarWhereInput
    data: XOR<course_attendanceUpdateManyMutationInput, course_attendanceUncheckedUpdateManyWithoutCoursesInput>
  }

  export type attendance_logsCreateManyUsersInput = {
    id?: string
    course_code: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
  }

  export type course_attendanceCreateManyUsersInput = {
    course_code: string
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
  }

  export type attendance_logsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
    courses?: coursesUpdateOneRequiredWithoutAttendance_logsNestedInput
  }

  export type attendance_logsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
  }

  export type attendance_logsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_code?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
  }

  export type course_attendanceUpdateWithoutUsersInput = {
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
    courses?: coursesUpdateOneRequiredWithoutCourse_attendanceNestedInput
  }

  export type course_attendanceUncheckedUpdateWithoutUsersInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
  }

  export type course_attendanceUncheckedUpdateManyWithoutUsersInput = {
    course_code?: StringFieldUpdateOperationsInput | string
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
  }

  export type attendance_logsCreateManyCoursesInput = {
    id?: string
    user_id: string
    lecture_date: Date | string
    start_time: Date | string
    end_time: Date | string
    status?: $Enums.attendance_logs_status | null
  }

  export type course_attendanceCreateManyCoursesInput = {
    user_id: string
    present_total?: number
    absent_total?: number
    medical_total?: number
    total_classes?: number
  }

  export type attendance_logsUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
    users?: usersUpdateOneRequiredWithoutAttendance_logsNestedInput
  }

  export type attendance_logsUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
  }

  export type attendance_logsUncheckedUpdateManyWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    lecture_date?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: NullableEnumattendance_logs_statusFieldUpdateOperationsInput | $Enums.attendance_logs_status | null
  }

  export type course_attendanceUpdateWithoutCoursesInput = {
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
    users?: usersUpdateOneRequiredWithoutCourse_attendanceNestedInput
  }

  export type course_attendanceUncheckedUpdateWithoutCoursesInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
  }

  export type course_attendanceUncheckedUpdateManyWithoutCoursesInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    present_total?: IntFieldUpdateOperationsInput | number
    absent_total?: IntFieldUpdateOperationsInput | number
    medical_total?: IntFieldUpdateOperationsInput | number
    total_classes?: IntFieldUpdateOperationsInput | number
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