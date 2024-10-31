import { b as EnumerableStringKeyOf, E as EnumerableStringKeyedValueOf, c as ExactRecord } from './types-B6Nc-8hG.cjs';
import 'type-fest';

/**
 * Maps keys of `object` and keeps the same values.
 *
 * @param data - The object to map.
 * @param keyMapper - The mapping function.
 * @signature
 *    R.mapKeys(object, fn)
 * @example
 *    R.mapKeys({a: 1, b: 2}, (key, value) => key + value) // => { a1: 1, b2: 2 }
 * @dataFirst
 * @category Object
 */
declare function mapKeys<T extends {}, S extends PropertyKey>(data: T, keyMapper: (key: EnumerableStringKeyOf<T>, value: EnumerableStringKeyedValueOf<T>, data: T) => S): ExactRecord<S, EnumerableStringKeyedValueOf<T>>;
/**
 * Maps keys of `object` and keeps the same values.
 *
 * @param keyMapper - The mapping function.
 * @signature
 *    R.mapKeys(fn)(object)
 * @example
 *    R.pipe({a: 1, b: 2}, R.mapKeys((key, value) => key + value)) // => { a1: 1, b2: 2 }
 * @dataLast
 * @category Object
 */
declare function mapKeys<T extends {}, S extends PropertyKey>(keyMapper: (key: EnumerableStringKeyOf<T>, value: EnumerableStringKeyedValueOf<T>, data: T) => S): (data: T) => ExactRecord<S, EnumerableStringKeyedValueOf<T>>;

export { mapKeys };
