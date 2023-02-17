/**
 *  Converts a plain object to a map
 * @param item any object
 */
export function convertObjectToMap<T>(item: object): Map<string, T>{
  return new Map(Object.entries(item))
}
