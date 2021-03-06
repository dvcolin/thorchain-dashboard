import { useContext } from "react";
import NodeCardProperty from "../NodeCardProperty/NodeCardProperty";
import styles from "./NodeCard.module.scss";
import {
  formatNodeAddress,
  formatNumber,
  calculateBond,
  calculateAge,
  calculateRewards,
} from "../../util";
import { IThorNode, ChainKey } from "../../types";
import { AppContext } from "../../contexts/AppContextProvider";

interface INodeCard extends IThorNode {
  idx: number;
  isActiveNode?: boolean;
}

const NodeCard = ({
  idx,
  isActiveNode,
  node_address,
  version,
  ip_address,
  current_award,
  slash_points,
  bond,
  active_block_height,
  observe_chains,
}: INodeCard) => {
  const [data] = useContext(AppContext);
  const {
    latestBlockHeight,
    lowestBondNode,
    oldestNode,
    highestSlashNode,
    top5ReadyNodes,
    maxHeights,
  } = data;

  function displayChainStatus(chain: ChainKey) {
    const obj = observe_chains?.find((n) => n.chain === chain);
    if (obj) {
      if (obj.height < maxHeights[chain] - 10) {
        const num = obj.height - maxHeights[chain];
        return <span className={styles.negativeChainStatus}>{num}</span>;
      } else {
        return <span>OK</span>;
      }
    }

    return "*";
  }

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
      {isActiveNode ? (
        <NodeCardProperty>{calculateRewards(current_award)}</NodeCardProperty>
      ) : null}
      <NodeCardProperty>{formatNumber(slash_points)}</NodeCardProperty>
      <NodeCardProperty>{version}</NodeCardProperty>
      {isActiveNode ? (
        <>
          <NodeCardProperty centered>
            {displayChainStatus("BNB")}
          </NodeCardProperty>
          <NodeCardProperty centered>
            {displayChainStatus("BTC")}
          </NodeCardProperty>
          <NodeCardProperty centered>
            {displayChainStatus("ETH")}
          </NodeCardProperty>
          <NodeCardProperty centered>
            {displayChainStatus("LTC")}
          </NodeCardProperty>
          <NodeCardProperty centered>
            {displayChainStatus("BCH")}
          </NodeCardProperty>
          <NodeCardProperty centered>
            {displayChainStatus("DOGE")}
          </NodeCardProperty>
          <NodeCardProperty centered>
            {displayChainStatus("TERRA")}
          </NodeCardProperty>
        </>
      ) : null}
      <NodeCardProperty centered>{displayChurnStatus()}</NodeCardProperty>
    </tr>
  );
};

export default NodeCard;
