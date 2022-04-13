import { Flex } from "@chakra-ui/react";
import NodeCardProperty from "./NodeCardProperty";
import { formatNodeAddress, formatNumber, calculateBond } from "../util";
import { IThorNode } from "../types";

const NodeCard = ({
  node_address,
  version,
  ip_address,
  current_award,
  slash_points,
  bond,
  active_block_height,
}: IThorNode) => {
  return (
    <Flex
      w="full"
      justify="space-between"
      bg="whiteAlpha.100"
      p="4"
      cursor="pointer"
      _notLast={{
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "blackAlpha.500",
      }}
      _hover={{
        bg: "whiteAlpha.300",
      }}
    >
      <NodeCardProperty>{formatNodeAddress(node_address)}</NodeCardProperty>
      <NodeCardProperty>{version}</NodeCardProperty>
      <NodeCardProperty>{ip_address}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(current_award)}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(slash_points)}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(calculateBond(bond))}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(active_block_height)}</NodeCardProperty>
      <NodeCardProperty>N/A</NodeCardProperty>
    </Flex>
  );
};

export default NodeCard;
