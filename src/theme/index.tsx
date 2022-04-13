import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Container } from "./component-styles";

const customTheme = extendTheme({
  components: {
    Container,
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.300",
      },
    },
  },
});

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
};

export default Theme;
