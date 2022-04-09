import { VStack, Tag, Text } from "@chakra-ui/react";

interface NodeCardPropertyGroupProps {
  labelText: string;
  value: string | number;
}

const NodeCardPropertyGroup = ({
  labelText,
  value,
}: NodeCardPropertyGroupProps) => {
  return (
    <VStack align="flex-start">
      <Tag colorScheme="blue">{labelText}</Tag>
      <Text>{value}</Text>
    </VStack>
  );
};

export default NodeCardPropertyGroup;
