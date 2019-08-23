export const EMAIL_REGEXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z]+(\.[a-z]+)*\.[a-z]{2,6}$/gi;

export function parseArray<T>(value: string): Array<T> {
  if (!value.length) return [];
const result = JSON.parse(value);

return Array.isArray(result) ? result : [];
}