import { isDefined } from './is-defined';

/**
 * Check if value is not null or undefined
 * and then set to value otherwise set to fallback
 *
 * @param value {*} - Value to check if not null or undefined
 * @param fallback {*} - Set this value if not null or undefined
 *
 * @returns {*}
 */
export function define<T>(value: T, fallback: T = value): T {
  return isDefined(value) ? value : fallback;
}
