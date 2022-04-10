import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import NodeCardList from "./components/NodeCardList";
import { NodeCardProps } from "./components/NodeCard";

const App = () => {
  const [nodes, setNodes] = useState<null | NodeCardProps[]>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://thornode.ninerealms.com/thorchain/nodes"
        );
        setNodes(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  let [activeNodes, standbyNodes, disabledNodes]: Array<
    null | NodeCardProps[]
  > = [null, null, null];

  if (nodes) {
    const filteredNodes = nodes.reduce<Array<NodeCardProps[]>>(
      (acc, cur) => {
        if (cur.status === "Active") {
          acc[0].push(cur);
        } else if (
          cur.status === "Standby" ||
          cur.preflight_status.status === "Ready"
        ) {
          acc[1].push(cur);
        } else if (cur.status === "Disabled") {
          acc[2].push(cur);
        }
        return acc;
      },
      [[], [], []]
    );
    [activeNodes, standbyNodes, disabledNodes] = filteredNodes;
  }

  return (
    <div>
      <Container>
        <Tabs variant="unstyled">
          <TabList>
            <Tab _selected={{ color: "white", bg: "green.500" }}>Active</Tab>
            <Tab _selected={{ color: "white", bg: "yellow.500" }}>Ready</Tab>
            <Tab _selected={{ color: "white", bg: "red.500" }}>Disabled</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <NodeCardList nodes={activeNodes} />
            </TabPanel>
            <TabPanel>
              <NodeCardList nodes={standbyNodes} />
            </TabPanel>
            <TabPanel>
              <NodeCardList nodes={disabledNodes} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
};

export default App;
