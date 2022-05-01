export const calculateAge = (
  latestBlockHeight: number | null,
  activeBlockHeight: number
) => {
  if (latestBlockHeight) {
    return (
      ((latestBlockHeight - activeBlockHeight) * 5600) /
      (1000 * 60 * 60 * 24)
    ).toFixed(2);
  } else {
    return "N/A";
  }
};
