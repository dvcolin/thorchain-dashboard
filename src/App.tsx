import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import NodeCardList from "./components/NodeCardList";

const App = () => {
  const [nodes, setNodes] = useState([]);

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
  return (
    <div>
      <Container>
        <NodeCardList nodes={nodes} />
      </Container>
    </div>
  );
};

export default App;
