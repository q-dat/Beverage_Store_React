import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/index.tsx";
import { ShoppingProvider } from "./context/ShoppingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ShoppingProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    </ShoppingProvider>
  </React.StrictMode>
);
