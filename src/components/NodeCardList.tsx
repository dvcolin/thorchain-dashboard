import { VStack } from "@chakra-ui/react";
import NodeCard, { NodeCardProps } from "./NodeCard";

interface NodeCardListProps {
  nodes: null | NodeCardProps[];
}

const NodeCardList = ({ nodes }: NodeCardListProps) => {
  return (
    <VStack spacing="4">
      {nodes && nodes.map((node) => <NodeCard {...node} />)}
    </VStack>
  );
};

export default NodeCardList;
