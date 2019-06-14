export const determineDate = (date?: string) => (date ? new Date(date) : new Date());

export const toISOString = () => new Date().toISOString();

export const toLocaleString = (date?: string) => determineDate(date).toLocaleString();

export const getTime = (date?: string) => determineDate(date).getTime();
