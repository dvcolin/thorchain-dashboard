import { useContext } from "react";
import { AppContext } from "../../contexts/AppContextProvider";
import NodeCardList from "../NodeCardList/NodeCardList";

const NodeCardLists = () => {
  const [data] = useContext(AppContext);
  const { activeNodes, readyNodes, standbyNodes } = data;
  return (
    <div>
      <NodeCardList nodes={activeNodes} />
      <NodeCardList nodes={readyNodes} />
      <NodeCardList nodes={standbyNodes} />
    </div>
  );
};

export default NodeCardLists;
