export const getTodayDate = (): string => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const dateString = `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
  return dateString;
};
