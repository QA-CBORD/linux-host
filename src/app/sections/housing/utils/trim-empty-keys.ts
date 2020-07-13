import { isDefined } from './is-defined';

/**
 * Removes properties which values are null or undefined
 *
 * @param collection {*} - Collection to trim
 *
 * @returns {*} - Trimmed collection
 */
export function trimEmptyKeys(collection: any): any {
  return Object.keys(collection)
    .filter((key: string) => isDefined(collection[key]))
    .reduce((accumulator: any, key: string) => ({ ...accumulator, [key]: collection[key] }), {});
}
