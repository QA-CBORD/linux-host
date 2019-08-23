export const EMAIL_REGEXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z]+(\.[a-z]+)*\.[a-z]{2,6}$/gi;

export function transformStringToArray(value: string): Array<unknown> {
  if (!value.length) return [];
const result = JSON.parse(value);

return Array.isArray(result) ? result : [];
}