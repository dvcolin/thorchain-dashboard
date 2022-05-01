import { Helmet } from "react-helmet";
import AppContextProvider from "./contexts/AppContextProvider";
import Container from "./components/Container/Container";
import NodeCardLists from "./components/NodeCardLists/NodeCardLists";

const App = () => {
  return (
    <>
      <Helmet>
        <title>THORmon</title>
      </Helmet>
      <AppContextProvider>
        <Container>
          <NodeCardLists />
        </Container>
      </AppContextProvider>
    </>
  );
};

export default App;
