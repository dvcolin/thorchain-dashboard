import { Flex, Text } from "@chakra-ui/react";

interface NodeCardPropertyTitleProps {
  children: React.ReactNode;
}

const NodeCardPropertyTitle = ({ children }: NodeCardPropertyTitleProps) => {
  return (
    <Flex flex="1" justify="center">
      <Text fontSize="sm" textTransform="uppercase" fontWeight="bold">
        {children}
      </Text>
    </Flex>
  );
};

export default NodeCardPropertyTitle;
