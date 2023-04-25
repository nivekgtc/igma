export const cleanStringDigits = (data: string): string =>
  data.replace(/[^\d]+/g, '');
