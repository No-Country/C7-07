import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
<<<<<<< HEAD
import { theme } from "./themes";
=======
>>>>>>> 83ce6775aaea0fd929396a502909ba7c761d784f
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Provider store={store}>
<<<<<<< HEAD
      <ChakraProvider theme={theme}>
=======
      <ChakraProvider>
>>>>>>> 83ce6775aaea0fd929396a502909ba7c761d784f
        <App />
      </ChakraProvider>
    </Provider>
  </>
);
