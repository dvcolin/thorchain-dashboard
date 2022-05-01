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
    <table className={styles.nodeCardList}>
      <tr className={styles.header}>
        <td></td>
        <NodeCardPropertyTitle>Node</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>IP</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Age</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Bond</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Rewards</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Slash</NodeCardPropertyTitle>
        <NodeCardPropertyTitle>Version</NodeCardPropertyTitle>
        <NodeCardPropertyTitle centered>Churn Status</NodeCardPropertyTitle>
      </tr>
      {nodes.length
        ? sortNodesByBond(nodes).map((node, idx) => (
            <NodeCard key={node.node_address} idx={idx + 1} {...node} />
          ))
        : null}
    </table>
  );
};

export default NodeCardList;
