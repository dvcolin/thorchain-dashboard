export const calculateRewards = (rewards: string): string => {
  return (+rewards / 100000000).toFixed(2);
};
