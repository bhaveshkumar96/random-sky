import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { CartProvider } from "./context/CartProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider value={defaultSystem}>
      <CartProvider>
        <App />
      </CartProvider>
    </ChakraProvider>
  </BrowserRouter>,
);
