export function hasDatePassed(date: Date): boolean {
  const now = new Date();
  return (date < now);
}
