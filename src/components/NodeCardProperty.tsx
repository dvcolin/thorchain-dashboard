import { Flex, Text } from "@chakra-ui/react";

interface NodeCardPropertyProps {
  children: React.ReactNode;
}

const NodeCardProperty = ({ children }: NodeCardPropertyProps) => {
  return (
    <Flex flex="1" justify="center">
      <Text>{children}</Text>
    </Flex>
  );
};

export default NodeCardProperty;
