export function isObjectEmpty(obj: Object): boolean  {
  return (obj.constructor === Object &&  Object.keys(obj).length === 0);

}
