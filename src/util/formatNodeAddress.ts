export const formatNodeAddress = (address: string) => {
  const formattedAddress = `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;

  return formattedAddress;
};
