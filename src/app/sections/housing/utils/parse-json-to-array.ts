/**
 * Tries to parse json and returns parsed array
 * or empty array
 *
 * @param json {String} - json string to parse
 *
 * @returns {Array}
 */
export function parseJsonToArray<T>(json: string): T[] {
  try {
    const parsedArray = JSON.parse(json);

    return Array.isArray(parsedArray) ? parsedArray : [];
  } catch (error) {
    return [];
  }
}
