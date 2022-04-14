import { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import NodeCardPropertyTitle from "../NodeCardPropertyTitle/NodeCardPropertyTitle";
import NodeCard from "../NodeCard/NodeCard";
import styles from "./NodeCardList.module.scss";
import { sortNodesByBond } from "../../util";

interface NodeCardListProps {
  status: "active" | "ready" | "disabled";
}

const NodeCardList = ({ status }: NodeCardListProps) => {
  const [data] = useContext(AppContext);
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
      {!!data[`${status}Nodes`].length &&
        sortNodesByBond(data[`${status}Nodes`]).map((node) => (
          <NodeCard key={node.node_address} {...node} />
        ))}
    </div>
  );
};

export default NodeCardList;
