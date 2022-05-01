import { useContext } from "react";
import NodeCardProperty from "../NodeCardProperty/NodeCardProperty";
import styles from "./NodeCard.module.scss";
import {
  formatNodeAddress,
  formatNumber,
  calculateBond,
  calculateAge,
} from "../../util";
import { IThorNode } from "../../types";
import { AppContext } from "../../contexts/AppContextProvider";

interface INodeCard extends IThorNode {
  idx: number;
}

const NodeCard = ({
  idx,
  node_address,
  version,
  ip_address,
  current_award,
  slash_points,
  bond,
  active_block_height,
}: INodeCard) => {
  const [data] = useContext(AppContext);
  const {
    latestBlockHeight,
    lowestBondNode,
    oldestNode,
    highestSlashNode,
    top5ReadyNodes,
  } = data;

  function displayChurnStatus() {
    if (node_address === lowestBondNode?.node_address) {
      return "LOW";
    } else if (node_address === oldestNode?.node_address) {
      return "OLD";
    } else if (node_address === highestSlashNode?.node_address) {
      return "BAD";
    } else if (
      top5ReadyNodes.find((node) => node.node_address === node_address)
    ) {
      return "IN";
    }
    return "*";
  }

  return (
    <tr className={styles.nodeCard}>
      <NodeCardProperty centered nodeNumberCell>
        {idx}
      </NodeCardProperty>
      <NodeCardProperty>{formatNodeAddress(node_address)}</NodeCardProperty>
      <NodeCardProperty>{ip_address}</NodeCardProperty>
      <NodeCardProperty>
        {calculateAge(latestBlockHeight, active_block_height)}
      </NodeCardProperty>
      <NodeCardProperty>{formatNumber(calculateBond(bond))}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(current_award)}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(slash_points)}</NodeCardProperty>
      <NodeCardProperty>{version}</NodeCardProperty>
      {}
      <NodeCardProperty centered>{displayChurnStatus()}</NodeCardProperty>
    </tr>
  );
};

export default NodeCard;
