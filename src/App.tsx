import AppContextProvider from "./contexts/AppContextProvider";
import Container from "./components/Container/Container";
import NodesInfoCardsGrid from "./components/NodesInfoCardsGrid/NodesInfoCardsGrid";
import NodeCardLists from "./components/NodeCardLists/NodeCardLists";

const App = () => {
  return (
    <AppContextProvider>
      <Container>
        <NodesInfoCardsGrid />
        <NodeCardLists />
      </Container>
    </AppContextProvider>
  );
};

export default App;
