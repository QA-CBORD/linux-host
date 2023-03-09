/**
 * Checks if value is null or empty string
 *
 * @param value {*} - Value to check
 *
 * @returns {Boolean}
 */
 export function isEmptyOrNullString(value: string): boolean {
    return value == '' || value == 'null' || value == null;
  }
