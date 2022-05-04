import NodeCardPropertyTitle from "../NodeCardPropertyTitle/NodeCardPropertyTitle";
import NodeCard from "../NodeCard/NodeCard";
import styles from "./NodeCardList.module.scss";
import { sortNodesByBond } from "../../util";
import { IThorNode } from "../../types";

interface NodeCardListProps {
  nodes: IThorNode[];
  isActiveNodeList?: boolean;
}

const NodeCardList = ({ nodes, isActiveNodeList }: NodeCardListProps) => {
  return (
    <table className={styles.nodeCardList}>
      <thead className={styles.header}>
        <tr>
          <th></th>
          <NodeCardPropertyTitle>Node</NodeCardPropertyTitle>
          <NodeCardPropertyTitle>IP</NodeCardPropertyTitle>
          <NodeCardPropertyTitle>Age</NodeCardPropertyTitle>
          <NodeCardPropertyTitle>Bond</NodeCardPropertyTitle>
          {isActiveNodeList ? (
            <NodeCardPropertyTitle>Rewards</NodeCardPropertyTitle>
          ) : null}
          <NodeCardPropertyTitle>Slash</NodeCardPropertyTitle>
          <NodeCardPropertyTitle>Version</NodeCardPropertyTitle>
          {isActiveNodeList ? (
            <>
              <NodeCardPropertyTitle centered>BNB</NodeCardPropertyTitle>
              <NodeCardPropertyTitle centered>BTC</NodeCardPropertyTitle>
              <NodeCardPropertyTitle centered>ETH</NodeCardPropertyTitle>
              <NodeCardPropertyTitle centered>LTC</NodeCardPropertyTitle>
              <NodeCardPropertyTitle centered>BCH</NodeCardPropertyTitle>
              <NodeCardPropertyTitle centered>DOGE</NodeCardPropertyTitle>
              <NodeCardPropertyTitle centered>TERRA</NodeCardPropertyTitle>
            </>
          ) : null}
          <NodeCardPropertyTitle centered>Churn Status</NodeCardPropertyTitle>
        </tr>
      </thead>
      <tbody>
        {nodes.length
          ? sortNodesByBond(nodes).map((node, idx) => (
              <NodeCard
                key={node.node_address}
                idx={idx + 1}
                isActiveNode={isActiveNodeList}
                {...node}
              />
            ))
          : null}
      </tbody>
    </table>
  );
};

export default NodeCardList;
