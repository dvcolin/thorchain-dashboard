import { useState } from "react";
import AppContextProvider from "./contexts/AppContextProvider";
import Container from "./components/Container/Container";
import NodeCardList from "./components/NodeCardList/NodeCardList";
import NodesInfoCardsGrid from "./components/NodesInfoCardsGrid/NodesInfoCardsGrid";

const App = () => {
  const [displayedNodeStatus, setDisplayedNodeStatus] = useState<
    "active" | "ready" | "disabled"
  >("active");
  return (
    <AppContextProvider>
      <Container>
        <NodesInfoCardsGrid />
        <button onClick={() => setDisplayedNodeStatus("active")}>Active</button>
        <button onClick={() => setDisplayedNodeStatus("ready")}>Standby</button>
        <button onClick={() => setDisplayedNodeStatus("disabled")}>
          Disabled
        </button>
        <NodeCardList status={displayedNodeStatus} />
      </Container>
    </AppContextProvider>
  );
};

export default App;
