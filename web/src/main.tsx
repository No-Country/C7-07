import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { theme } from "./themes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>
);
