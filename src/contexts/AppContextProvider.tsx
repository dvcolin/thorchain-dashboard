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
  nextChurnTime: number;
  latestBlockHeight: number | null;
  lowestBondNode: IThorNode | null;
  oldestNode: IThorNode | null;
  highestSlashNode: IThorNode | null;
  top5ReadyNodes: IThorNode[] | [];
  maxHeights: {
    BNB: number;
    BTC: number;
    ETH: number;
    LTC: number;
    BCH: number;
    DOGE: number;
    TERRA: number;
  };
}

export const AppContext = createContext<
  [AppContextState, Dispatch<SetStateAction<AppContextState>>]
>([
  {
    nodes: [],
    activeNodes: [],
    readyNodes: [],
    standbyNodes: [],
    nextChurnTime: 0,
    latestBlockHeight: null,
    lowestBondNode: null,
    oldestNode: null,
    highestSlashNode: null,
    top5ReadyNodes: [],
    maxHeights: {
      BNB: 0,
      BTC: 0,
      ETH: 0,
      LTC: 0,
      BCH: 0,
      DOGE: 0,
      TERRA: 0,
    },
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
    nextChurnTime: 0,
    latestBlockHeight: null,
    lowestBondNode: null,
    oldestNode: null,
    highestSlashNode: null,
    top5ReadyNodes: [],
    maxHeights: {
      BNB: 0,
      BTC: 0,
      ETH: 0,
      LTC: 0,
      BCH: 0,
      DOGE: 0,
      TERRA: 0,
    },
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

      const constants = await axios.get(
        "https://thornode.ninerealms.com/thorchain/constants"
      );

      const status = await axios.get("https://rpc.ninerealms.com/status");

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

      // Next churn time
      let newestActiveNode = activeNodes[0];

      activeNodes.forEach((node) => {
        if (node.active_block_height > newestActiveNode.active_block_height) {
          newestActiveNode = node;
        }
      });

      const nextChurnBlock =
        newestActiveNode.active_block_height +
        constants.data.int_64_values.ChurnInterval;
      console.log(nextChurnBlock);

      const latestBlockHeight =
        status.data.result.sync_info.latest_block_height;

      const nextChurnTime = (nextChurnBlock - latestBlockHeight) * 6000;

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

      let maxBTCHeight = 0;
      let maxETHHeight = 0;
      let maxLTCHeight = 0;
      let maxDOGEHeight = 0;
      let maxBCHHeight = 0;
      let maxBNBHeight = 0;
      let maxTERRAHeight = 0;

      activeNodes.forEach((node) => {
        if (node.observe_chains) {
          node.observe_chains.forEach((obj) => {
            if (obj.chain === "BTC" && obj.height > maxBTCHeight) {
              maxBTCHeight = obj.height;
            }
            if (obj.chain === "ETH" && obj.height > maxETHHeight) {
              maxETHHeight = obj.height;
            }
            if (obj.chain === "LTC" && obj.height > maxLTCHeight) {
              maxLTCHeight = obj.height;
            }
            if (obj.chain === "DOGE" && obj.height > maxDOGEHeight) {
              maxDOGEHeight = obj.height;
            }
            if (obj.chain === "BCH" && obj.height > maxBCHHeight) {
              maxBCHHeight = obj.height;
            }
            if (obj.chain === "BNB" && obj.height > maxBNBHeight) {
              maxBNBHeight = obj.height;
            }
            if (obj.chain === "TERRA" && obj.height > maxTERRAHeight) {
              maxTERRAHeight = obj.height;
            }
          });
        }
      });

      setData({
        nodes: nodesData.data,
        activeNodes,
        readyNodes,
        standbyNodes,
        nextChurnTime,
        latestBlockHeight: latestBlockHeightData.data[0].thorchain,
        lowestBondNode,
        oldestNode,
        highestSlashNode,
        top5ReadyNodes: sortNodesByBond(readyNodes).slice(0, 5),
        maxHeights: {
          BNB: maxBNBHeight,
          BTC: maxBTCHeight,
          ETH: maxETHHeight,
          LTC: maxLTCHeight,
          BCH: maxBCHHeight,
          DOGE: maxDOGEHeight,
          TERRA: maxTERRAHeight,
        },
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
