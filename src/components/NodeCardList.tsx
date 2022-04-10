import { Flex } from "@chakra-ui/react";
import NodeCard from "./NodeCard";
import { IThorNode } from "../types";
import NodeCardPropertyTitle from "./NodeCardPropertyTitle";

interface NodeCardListProps {
  nodes: null | IThorNode[];
}

const NodeCardList = ({ nodes }: NodeCardListProps) => {
  return (
    <Flex direction="column" py="4">
      <Flex p="4" bg="gray.900">
        <NodeCardPropertyTitle>Address</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Version</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>IP</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Rewards</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Slash</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Bond</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Active Block</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Churn Status</NodeCardPropertyTitle>
      </Flex>
      {nodes &&
        nodes.map((node) => <NodeCard key={node.node_address} {...node} />)}
    </Flex>
  );
};

export default NodeCardList;
