import { Helmet } from "react-helmet";
import AppContextProvider from "./contexts/AppContextProvider";
import Container from "./components/Container/Container";
import NodeCardLists from "./components/NodeCardLists/NodeCardLists";
import NextChurnTimeDisplay from "./components/NextChurnTimeDisplay/NextChurnTimeDisplay";

const App = () => {
  return (
    <>
      <Helmet>
        <title>THORmon</title>
      </Helmet>
      <AppContextProvider>
        <Container>
          <NextChurnTimeDisplay />
          <NodeCardLists />
        </Container>
      </AppContextProvider>
    </>
  );
};

export default App;
