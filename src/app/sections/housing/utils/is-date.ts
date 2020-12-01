export function isDate(date: string) {
  // matches 11/25/2020 and 2019-01-01T00:00:00
  const expression = "(\\d{2,4})(-|\\/)(\\d{2})(-|\\/)(\\d{2,4})"
  const re = new RegExp(expression)
  return re.test(date)
}
