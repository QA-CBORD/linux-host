/**
 *  Converts a plain object to a map
 * @param item any object
 */
export function convertObjectToMap(item: Object): Map<any,any> {
  return new Map(Object.entries(item))
}
