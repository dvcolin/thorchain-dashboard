import NodeCardPropertyTitle from "../NodeCardPropertyTitle/NodeCardPropertyTitle";
import NodeCard from "../NodeCard/NodeCard";
import styles from "./NodeCardList.module.scss";
import { sortNodesByBond } from "../../util";
import { IThorNode } from "../../types";

interface NodeCardListProps {
  nodes: IThorNode[];
}

const NodeCardList = ({ nodes }: NodeCardListProps) => {
  return (
    <div className={styles.nodeCardList}>
      <div className={styles.header}>
        <NodeCardPropertyTitle>Address</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Version</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>IP</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Rewards</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Slash</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Bond</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Age (Days)</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Churn Status</NodeCardPropertyTitle>
      </div>
      {nodes.length
        ? sortNodesByBond(nodes).map((node) => (
            <NodeCard key={node.node_address} {...node} />
          ))
        : null}
    </div>
  );
};

export default NodeCardList;
