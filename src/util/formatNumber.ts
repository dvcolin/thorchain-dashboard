export const formatNumber = (num: number | string) => {
  if (typeof num === "string") {
    num = Number(num);
  }
  const formattedNumber = new Intl.NumberFormat("en-US").format(num);
  return formattedNumber;
};
