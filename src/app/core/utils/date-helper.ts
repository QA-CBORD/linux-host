export const determineDate = (date?: string) => (date ? new Date(date) : new Date());

export const toISOString = () => new Date().toISOString();

export const toLocaleString = (date?: string) => determineDate(date).toLocaleString();

export const getTime = (date?: string) => determineDate(date).getTime();

export const isSameDay = (c, n): boolean => {
  const current = new Date(c);
  const next = new Date(n);

  return (
    current.getFullYear() === next.getFullYear() &&
    current.getDate() === next.getDate() &&
    current.getMonth() === next.getMonth()
  );
};
