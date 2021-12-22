import "../../Calendar.css";
import "../../Card.css";
import "../../DatePicker.css";
import theme from "../theme";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
