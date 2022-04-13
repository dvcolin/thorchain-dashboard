export const calculateBond = (bond: string) => {
  return Math.floor(+bond / 100000000);
};
