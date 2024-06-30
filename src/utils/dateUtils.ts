export const getDateDifference = (startDate: Date, endDate: Date) => {
  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;
  const msInMonth = msInDay * 30; // Approximation
  const msInYear = msInDay * 365; // Approximation

  const diffInMs = endDate.getTime() - startDate.getTime();
  const years = Math.floor(diffInMs / msInYear);
  const months = Math.floor((diffInMs % msInYear) / msInMonth);
  const days = Math.floor((diffInMs % msInMonth) / msInDay);
  const hours = Math.floor((diffInMs % msInDay) / msInHour);

  return { years, months, days, hours };
};
