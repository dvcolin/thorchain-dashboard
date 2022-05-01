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
  standbyNodes: IThorNode[] | [];
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
    standbyNodes: [],
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
    standbyNodes: [],
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
      const [activeNodes, readyNodes, standbyNodes] = nodesData.data.reduce<
        Array<IThorNode[]>
      >(
        (acc, cur) => {
          if (cur.status === "Active") {
            acc[0].push(cur);
          } else if (
            cur.status === "Standby" &&
            cur.preflight_status.status === "Ready"
          ) {
            acc[1].push(cur);
          } else if (
            cur.status === "Standby" &&
            cur.preflight_status.status === "Standby"
          ) {
            acc[2].push(cur);
          }
          return acc;
        },
        [[], [], []]
      );

      // Find lowest bond, oldest, highest slash node, and maximum block height node
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
        standbyNodes,
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
