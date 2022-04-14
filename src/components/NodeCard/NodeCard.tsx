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

const NodeCard = ({
  node_address,
  version,
  ip_address,
  current_award,
  slash_points,
  bond,
  active_block_height,
}: IThorNode) => {
  const [data] = useContext(AppContext);
  const { latestBlockHeight } = data;
  return (
    <div className={styles.nodeCard}>
      <NodeCardProperty>{formatNodeAddress(node_address)}</NodeCardProperty>
      <NodeCardProperty>{version}</NodeCardProperty>
      <NodeCardProperty>{ip_address}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(current_award)}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(slash_points)}</NodeCardProperty>
      <NodeCardProperty>{formatNumber(calculateBond(bond))}</NodeCardProperty>
      <NodeCardProperty>
        {calculateAge(latestBlockHeight, active_block_height)}
      </NodeCardProperty>
      <NodeCardProperty>N/A</NodeCardProperty>
    </div>
  );
};

export default NodeCard;
