import { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";

import styles from "./NodesInfoCardsGrid.module.scss";
import NodesInfoCard from "../NodesInfoCard/NodesInfoCard";

const NodesInfoCardsGrid = () => {
  const [data] = useContext(AppContext);
  const { nodes, activeNodes, readyNodes, standbyNodes } = data;
  return (
    <div className={styles.nodesInfoCardsGrid}>
      <NodesInfoCard title="Total Nodes" value={nodes.length} />
      <NodesInfoCard title="Active Nodes" value={activeNodes.length} />
      <NodesInfoCard title="Ready Nodes" value={readyNodes.length} />
      <NodesInfoCard title="Standby Nodes" value={standbyNodes.length} />
    </div>
  );
};

export default NodesInfoCardsGrid;
