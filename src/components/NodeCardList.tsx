import { VStack } from "@chakra-ui/react";
import NodeCard, { NodeCardProps } from "./NodeCard";

interface NodeCardListProps {
  nodes: NodeCardProps[];
}

const NodeCardList = ({ nodes }: NodeCardListProps) => {
  return (
    <VStack spacing="4">
      {nodes.map((node) => (
        <NodeCard {...node} />
      ))}
    </VStack>
  );
};

export default NodeCardList;
