import { EmptyObject, IsAny, Simplify, IsLiteral, IsNever, KeysOfUnion, IsStringLiteral, IsNumericLiteral, IsSymbolLiteral, Split, IsEqual, IfNever, Tagged } from 'type-fest';

declare const RemedaErrorSymbol: unique symbol;
/**
 * Used for reporting type errors in a more useful way than `never`. Use
 * numbers for things that should never happen.
 */
type RemedaTypeError<FunctionName extends string, Message extends string | number> = Message extends string ? Tagged<typeof RemedaErrorSymbol, `RemedaTypeError(${FunctionName}): ${Message}.`> : RemedaTypeError<FunctionName, `Internal error ${Message}. Please open a Remeda GitHub issue.`>;
type NonEmptyArray<T> = [T, ...Array<T>];
type NonEmptyReadonlyArray<T> = readonly [T, ...ReadonlyArray<T>];
type Mapped<T extends IterableContainer, K> = {
    -readonly [P in keyof T]: K;
};
/**
 * This should only be used for defining generics which extend any kind of JS
 * array under the hood, this includes arrays *AND* tuples (of the form [x, y],
 * and of the form [x, ...y[]], etc...), and their readonly equivalent. This
 * allows us to be more inclusive to what functions can process.
 *
 * @example map<T extends ArrayLike>(items: T) { ... }
 *
 * We would've named this `ArrayLike`, but that's already used by typescript...
 * @see This was inspired by the type-definition of Promise.all (https://github.com/microsoft/TypeScript/blob/1df5717b120cddd325deab8b0f2b2c3eecaf2b01/src/lib/es2015.promise.d.ts#L21)
 */
type IterableContainer<T = unknown> = ReadonlyArray<T> | readonly [];
/**
 * Check if a type is guaranteed to be a bounded record: a record with a finite
 * set of keys.
 *
 * @example
 *     IfBoundedRecord<{ a: 1, 1: "a" }>; //=> true
 *     IfBoundedRecord<Record<string | number, unknown>>; //=> false
 *     IfBoundedRecord<Record<`prefix_${number}`, unknown>>; //=> false
 */
type IfBoundedRecord<T, TypeIfBoundedRecord = true, TypeIfUnboundedRecord = false> = IsBoundedKey<KeysOfUnion<T>> extends true ? TypeIfBoundedRecord : TypeIfUnboundedRecord;
/**
 * Checks if a type is a bounded key: a union of bounded strings, numeric
 * literals, or symbol literals.
 */
type IsBoundedKey<T> = T extends unknown ? IsStringLiteral<T> extends true ? IsBoundedString<T> : IsNumericLiteral<T> extends true ? true : IsSymbolLiteral<T> : never;
/**
 * Checks if a type is a bounded string: a type that only has a finite
 * number of strings that are that type.
 *
 * Most relevant for template literals: IsBoundedString<`${1 | 2}_${3 | 4}`> is
 * true, and IsBoundedString<`${1 | 2}_${number}`> is false.
 */
type IsBoundedString<T> = T extends string ? Split<T, "">[number] extends infer U ? [
    `${number}`
] extends [U] ? false : [string] extends [U] ? false : true : false : false;
/**
 * A union of all keys of T which are not symbols, and where number keys are
 * converted to strings, following the definition of `Object.keys` and
 * `Object.entries`.
 *
 * Inspired and largely copied from [`sindresorhus/ts-extras`](https://github.com/sindresorhus/ts-extras/blob/44f57392c5f027268330771996c4fdf9260b22d6/source/object-keys.ts).
 *
 * @see EnumerableStringKeyedValueOf
 */
type EnumerableStringKeyOf<T> = Required<T> extends Record<infer K, unknown> ? `${Exclude<K, symbol>}` : never;
/**
 * A union of all values of properties in T which are not keyed by a symbol,
 * following the definition of `Object.values` and `Object.entries`.
 */
type EnumerableStringKeyedValueOf<T> = ValuesOf<{
    [K in keyof T]-?: K extends symbol ? never : T[K];
}>;
/**
 * Extracts the value type from an object type T.
 */
type ValuesOf<T> = T extends EmptyObject ? T[keyof T] : T extends Record<PropertyKey, infer V> ? V : never;
/**
 * This is the type you'd get from doing:
 * `Object.fromEntries(Object.entries(x))`.
 */
type ReconstructedRecord<T> = Record<EnumerableStringKeyOf<T>, EnumerableStringKeyedValueOf<T>>;
/**
 * An extension of Extract for type predicates which falls back to the base
 * in order to narrow the `unknown` case.
 *
 * @example
 *   function isMyType<T>(data: T | MyType): data is NarrowedTo<T, MyType> { ... }
 */
type NarrowedTo<T, Base> = Extract<T, Base> extends never ? Base : IsAny<T> extends true ? Base : Extract<T, Base>;
type ExactRecord<Key extends PropertyKey, Value> = IfBoundedRecord<Record<Key, Value>, Partial<Record<Key, Value>>, Record<Key, Value>>;
type ReorderedArray<T extends IterableContainer> = {
    -readonly [P in keyof T]: T[number];
};
type UpsertProp<T, K extends PropertyKey, V> = Simplify<Omit<T, K> & (IsSingleLiteral<K> extends true ? {
    -readonly [P in K]-?: V;
} : // The key is either a broad type (`string`) or union of literals
{
    -readonly [P in keyof T as P extends K ? P : never]: T[P] | V;
} & {
    -readonly [P in K as P extends keyof T ? never : P]?: V;
})>;
type IsSingleLiteral<K> = IsLiteral<K> extends true ? (IsUnion<K> extends true ? false : true) : false;
type IsUnion<T> = InternalIsUnion<T>;
type InternalIsUnion<T, U = T> = (IsNever<T> extends true ? false : T extends any ? [U] extends [T] ? false : true : never) extends infer Result ? boolean extends Result ? true : Result : never;
/**
 * Extracts a type predicate from a type guard function for the first argument.
 *
 * @example
 * type TypeGuardFn = (x: unknown) => x is string;
 * type Result = GuardType<TypeGuardFn>; // `string`
 */
type GuardType<T, Fallback = never> = T extends (x: any, ...rest: any) => x is infer U ? U : Fallback;
/**
 * An array with *exactly* N elements in it.
 *
 * Only literal N values are supported. For very large N the type might result
 * in a recurse depth error. For negative N the type would result in an infinite
 * recursion. None of these have protections because this is an internal type!
 */
type NTuple<T, N extends number, Result extends Array<unknown> = []> = Result["length"] extends N ? Result : NTuple<T, N, [...Result, T]>;
/**
 * Takes an array and returns the types that make up its parts. The prefix is
 * anything before the rest parameter (if any), the suffix is anything after
 * the rest parameter (if any), and the item is the type of the rest parameter.
 *
 * The output could be used to reconstruct the input: `[
 *   ...TupleParts<T>["prefix"],
 *   ...Array<TupleParts<T>["item"]>,
 *   ...TupleParts<T>["suffix"],
 * ]`.
 */
type TupleParts<T, Prefix extends Array<unknown> = [], Suffix extends Array<unknown> = []> = T extends readonly [infer Head, ...infer Tail] ? TupleParts<Tail, [...Prefix, Head], Suffix> : T extends readonly [...infer Head, infer Tail] ? TupleParts<Head, Prefix, [Tail, ...Suffix]> : IsTupleRestOnly<T> extends false ? T extends readonly [(infer MaybeHead)?, ...infer Tail] ? TupleParts<Tail, [...Prefix, MaybeHead?], Suffix> : never : T extends ReadonlyArray<infer Item> ? {
    prefix: Prefix;
    item: Item;
    suffix: Suffix;
} : never;
/** Helper type for `TupleParts`. Checks if T = ReadonlyArray<U> for some U. */
type IsTupleRestOnly<T> = T extends readonly [] ? true : T extends readonly [unknown?, ...infer Tail] ? IsEqual<Readonly<T>, Readonly<Tail>> : false;
/** The union of all possible ways to write a tuple as [...left, ...right]. */
type TupleSplits<Tuple extends IterableContainer> = Tuple extends infer T ? TupleParts<T> extends {
    prefix: infer Prefix extends ReadonlyArray<unknown>;
    item: infer Item;
    suffix: infer Suffix extends ReadonlyArray<unknown>;
} ? FixedTupleSplits<Prefix, [...CoercedArray<Item>, ...Suffix]> | {
    left: [...Prefix, ...CoercedArray<Item>];
    right: [...CoercedArray<Item>, ...Suffix];
} | (FixedTupleSplits<Suffix> extends infer U ? U extends {
    left: infer L extends ReadonlyArray<unknown>;
    right: infer R;
} ? {
    left: [...Prefix, ...CoercedArray<Item>, ...L];
    right: R;
} : never : never) : never : never;
/** Helper type for `TupleSplits`, for tuples without rest params. */
type FixedTupleSplits<L extends IterableContainer, R extends IterableContainer = []> = {
    left: L;
    right: R;
} | (L extends readonly [] ? never : L extends readonly [...infer LHead, infer LTail] ? FixedTupleSplits<LHead, [LTail, ...R]> : L extends readonly [...infer LHead, (infer LTail)?] ? FixedTupleSplits<LHead, [LTail?, ...R]> : never);
/**
 * `never[]` and `[]` are not the same type, and in some cases they aren't
 * interchangeable.
 *
 * This type makes it easier to use the result of TupleParts when the input is a
 * fixed-length tuple but we still want to spread the rest of the array. e.g.
 * `[...CoercedArray<TupleParts<T>["item"]>, ...TupleParts<T>["suffix"]]`.
 *
 */
type CoercedArray<T> = IfNever<T, [], Array<T>>;
/**
 * The result of running a function that would dedupe an array (`unique`,
 * `uniqueBy`, and `uniqueWith`).
 *
 * There are certain traits of the output which are unique to a deduped array
 * that allow us to create a better type; see comments inline.
 *
 * !Note: We can build better types for each of the unique functions
 * _separately_ by taking advantage of _other_ characteristics that are unique
 * to each one (e.g. in `unique` we know that each item that has a disjoint type
 * to all previous items would be part of the output, even when it isn't the
 * first), but to make this utility the most useful we kept it simple and
 * generic for now.
 */
type Deduped<T extends IterableContainer> = T extends readonly [] ? [
] : T extends readonly [infer Head, ...infer Rest] ? [
    Head,
    ...Array<Rest[number]>
] : T extends readonly [...Array<unknown>, unknown] ? NonEmptyArray<T[number]> : Array<T[number]>;

export type { CoercedArray as C, Deduped as D, EnumerableStringKeyedValueOf as E, GuardType as G, IterableContainer as I, Mapped as M, NTuple as N, RemedaTypeError as R, TupleParts as T, UpsertProp as U, NonEmptyArray as a, EnumerableStringKeyOf as b, ExactRecord as c, NarrowedTo as d, IsUnion as e, NonEmptyReadonlyArray as f, IfBoundedRecord as g, ReconstructedRecord as h, TupleSplits as i, ReorderedArray as j };
