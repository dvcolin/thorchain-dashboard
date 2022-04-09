import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({});

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
};

export default Theme;
