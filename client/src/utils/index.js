export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString("ru-RU", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${timeString}  ${dateString}`;
};
