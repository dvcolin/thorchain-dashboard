export const calculateRewards = (rewards: string): string => {
  const rewardsNum = +rewards / 100000000;

  if (rewardsNum !== 0) {
    return rewardsNum.toFixed(2);
  } else {
    return rewardsNum.toString();
  }
};
