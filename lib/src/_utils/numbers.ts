export const getFloatWithComma = (value: number | string) =>
  typeof value !== 'number' && typeof value !== 'string'
    ? '0'
    : `${value}`.replace(/\./, ',');
