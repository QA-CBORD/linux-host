/**
 * Check if value is not null or undefined
 * and then set to fallback otherwise set to null
 *
 * @param value {*} - Value to check if not null or undefined
 * @param fallback {*} - Set this value if not null or undefined
 *
 * @returns {*}
 */
export function define<T>(value: any, fallback: any = value): T {
  return value != null ? fallback : null;
}
