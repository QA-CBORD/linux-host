/**
 * Checking if some property or variable has value
 *
 * @param {*} value - Value to check
 *
 * @returns {Boolean}
 */
export function hasValue(value: any): boolean {
  return Array.isArray(value)
    ? !value.some((item: any) => item == null || item === '')
    : !(value == null || value === '');
}
