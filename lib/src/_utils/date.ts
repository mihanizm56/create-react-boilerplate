export const getFormattedDate = (date: string): string =>
  new Intl.DateTimeFormat('ru').format(new Date(date));

export const getFormattedTime = (date: string): string =>
  new Date(date).toLocaleString('ru').split(', ')[1];

export const stringTime = (date: string) =>
  date ? new Date(date).toLocaleTimeString('ru-Ru') : '';
