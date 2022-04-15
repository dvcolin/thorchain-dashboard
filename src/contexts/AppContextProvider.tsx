import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { sortNodesByBond } from "../util";
import { IThorNode } from "../types";

interface AppContextState {
  nodes: IThorNode[] | [];
  activeNodes: IThorNode[] | [];
  readyNodes: IThorNode[] | [];
  disabledNodes: IThorNode[] | [];
  latestBlockHeight: number | null;
  lowestBondNode: IThorNode | null;
  oldestNode: IThorNode | null;
  highestSlashNode: IThorNode | null;
  top5ReadyNodes: IThorNode[] | [];
}

export const AppContext = createContext<
  [AppContextState, Dispatch<SetStateAction<AppContextState>>]
>([
  {
    nodes: [],
    activeNodes: [],
    readyNodes: [],
    disabledNodes: [],
    latestBlockHeight: null,
    lowestBondNode: null,
    oldestNode: null,
    highestSlashNode: null,
    top5ReadyNodes: [],
  },
  () => {},
]);

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const dataHook = useState<AppContextState>({
    nodes: [],
    activeNodes: [],
    readyNodes: [],
    disabledNodes: [],
    latestBlockHeight: null,
    lowestBondNode: null,
    oldestNode: null,
    highestSlashNode: null,
    top5ReadyNodes: [],
  });

  async function fetchData() {
    const setData = dataHook[1];
    try {
      const nodesData: { data: IThorNode[] } = await axios.get(
        "https://thornode.ninerealms.com/thorchain/nodes"
      );

      const latestBlockHeightData = await axios.get(
        "https://thornode.ninerealms.com/thorchain/lastblock/THORCHAIN"
      );

      // Filter nodes by status
      const [activeNodes, readyNodes, disabledNodes] = nodesData.data.reduce<
        Array<IThorNode[]>
      >(
        (acc, cur) => {
          if (cur.status === "Active") {
            acc[0].push(cur);
          } else if (cur.status === "Standby") {
            acc[1].push(cur);
          } else if (cur.status === "Disabled") {
            acc[2].push(cur);
          }
          return acc;
        },
        [[], [], []]
      );

      // Find lowest bond, oldest, and highest slash node
      const firstNode = activeNodes[0];
      const [lowestBondNode, oldestNode, highestSlashNode] = activeNodes.reduce<
        Array<IThorNode>
      >(
        (acc, cur) => {
          if (+cur.bond < +acc[0].bond) {
            acc[0] = cur;
          } else if (cur.status_since > acc[1].status_since) {
            acc[1] = cur;
          } else if (cur.slash_points > acc[2].slash_points) {
            acc[2] = cur;
          }
          return acc;
        },
        [firstNode, firstNode, firstNode]
      );

      setData({
        nodes: nodesData.data,
        activeNodes,
        readyNodes,
        disabledNodes,
        latestBlockHeight: latestBlockHeightData.data[0].thorchain,
        lowestBondNode,
        oldestNode,
        highestSlashNode,
        top5ReadyNodes: sortNodesByBond(readyNodes).slice(0, 5),
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return <AppContext.Provider value={dataHook}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
