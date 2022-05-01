export const formatNodeAddress = (address: string) => {
  const formattedAddress = `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;

  return formattedAddress;
};
