import { I as IterableContainer, j as ReorderedArray } from './types-B6Nc-8hG.cjs';
import 'type-fest';

/**
 * Shuffles the input array, returning a new array with the same elements in a random order.
 *
 * @param items - The array to shuffle.
 * @signature
 *    R.shuffle(array)
 * @example
 *    R.shuffle([4, 2, 7, 5]) // => [7, 5, 4, 2]
 * @dataFirst
 * @category Array
 */
declare function shuffle<T extends IterableContainer>(items: T): ReorderedArray<T>;
/**
 * Shuffles the input array, returning a new array with the same elements in a random order.
 *
 * @signature
 *    R.shuffle()(array)
 * @example
 *    R.pipe([4, 2, 7, 5], R.shuffle()) // => [7, 5, 4, 2]
 * @dataLast
 * @category Array
 */
declare function shuffle(): <T extends IterableContainer>(items: T) => ReorderedArray<T>;

export { shuffle };
