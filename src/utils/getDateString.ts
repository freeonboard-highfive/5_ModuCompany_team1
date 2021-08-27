export const getDateString = (date = new Date()): string => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  const dateString = `${y}/${m < 10 ? `0${m}` : m}/${d < 10 ? `0${d}` : d}`;
  const timeString = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  return `${dateString}/${timeString}`;
};
