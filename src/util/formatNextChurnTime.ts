export const formatNextChurnTime = (milliseconds: number) => {
  const daysInMilliseconds = 1000 * 60 * 60 * 24;
  const hoursInMilliseconds = 1000 * 60 * 60;
  const minutesInMilliseconds = 1000 * 60;

  let days = 0;
  let hours = 0;
  let minutes = 0;

  while (milliseconds >= daysInMilliseconds) {
    milliseconds -= daysInMilliseconds;
    days++;
  }

  while (milliseconds >= hoursInMilliseconds) {
    milliseconds -= hoursInMilliseconds;
    hours++;
  }

  while (milliseconds >= minutesInMilliseconds) {
    milliseconds -= minutesInMilliseconds;
    minutes++;
  }

  return `${days} days, ${hours} hours, ${minutes} minutes`;
};
