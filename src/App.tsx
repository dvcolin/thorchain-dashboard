import { useState } from "react";
import AppContextProvider from "./contexts/AppContextProvider";
import Container from "./components/Container/Container";
import StatusButton from "./components/StatusButton/StatusButton";
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
        <StatusButton
          variant="active"
          isActive={displayedNodeStatus === "active"}
          onClick={() => setDisplayedNodeStatus("active")}
        >
          Active
        </StatusButton>
        <StatusButton
          variant="ready"
          isActive={displayedNodeStatus === "ready"}
          onClick={() => setDisplayedNodeStatus("ready")}
        >
          Standby
        </StatusButton>
        <StatusButton
          variant="disabled"
          isActive={displayedNodeStatus === "disabled"}
          onClick={() => setDisplayedNodeStatus("disabled")}
        >
          Disabled
        </StatusButton>
        <NodeCardList status={displayedNodeStatus} />
      </Container>
    </AppContextProvider>
  );
};

export default App;
