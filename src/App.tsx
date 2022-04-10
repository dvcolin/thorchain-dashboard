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
import { IThorNode } from "./types";
import { filterNodesByStatus } from "./util";

const App = () => {
  const [nodes, setNodes] = useState<[] | IThorNode[]>([]);

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

  let [activeNodes, standbyNodes, disabledNodes]: Array<[] | IThorNode[]> = [
    [],
    [],
    [],
  ];

  if (nodes) {
    [activeNodes, standbyNodes, disabledNodes] = filterNodesByStatus(nodes);
  }

  return (
    <div>
      <Container py="8">
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab _selected={{ color: "white", bg: "green.500" }}>Active</Tab>
            <Tab _selected={{ color: "white", bg: "orange.500" }}>Ready</Tab>
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
