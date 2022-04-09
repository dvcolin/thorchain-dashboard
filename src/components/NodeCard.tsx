import { Flex } from "@chakra-ui/react";
import NodeCardPropertyGroup from "./NodeCardPropertyGroup";

export interface NodeCardProps {
  node_address: string;
  status: string;
  pub_key_set: object;
  validator_cons_pub_key: string;
  bond: string;
  active_block_height: number;
  bond_address: string;
  status_since: number;
  signer_membership: null;
  requested_to_leave: boolean;
  forced_to_leave: boolean;
  leave_height: number;
  ip_address: string;
  version: string;
  slash_points: number;
  jail: object;
  current_award: string;
  observe_chains: null;
  preflight_status: {
    status: string;
    reason: string;
    code: number;
  };
  bond_providers: {
    node_operator_fee: string;
    providers: null;
  };
}

const NodeCard = ({
  node_address,
  version,
  ip_address,
  current_award,
  slash_points,
  bond,
  active_block_height,
}: NodeCardProps) => {
  return (
    <Flex w="full" justify="space-between" bg="gray.50" p="4">
      <NodeCardPropertyGroup labelText="Address" value={node_address} />
      <NodeCardPropertyGroup labelText="Version" value={version} />
      <NodeCardPropertyGroup labelText="IP" value={ip_address} />
      <NodeCardPropertyGroup labelText="Rewards" value={current_award} />
      <NodeCardPropertyGroup labelText="Slash" value={slash_points} />
      <NodeCardPropertyGroup labelText="Bond" value={bond} />
      <NodeCardPropertyGroup
        labelText="Active Block"
        value={active_block_height}
      />
    </Flex>
  );
};

export default NodeCard;
