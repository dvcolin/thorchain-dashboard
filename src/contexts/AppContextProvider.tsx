import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { IThorNode } from "../types";

interface AppContextState {
  nodes: IThorNode[] | [];
  activeNodes: IThorNode[] | [];
  readyNodes: IThorNode[] | [];
  disabledNodes: IThorNode[] | [];
  latestBlockHeight: number | null;
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
      setData({
        nodes: nodesData.data,
        activeNodes,
        readyNodes,
        disabledNodes,
        latestBlockHeight: latestBlockHeightData.data[0].thorchain,
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
