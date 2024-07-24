import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/index.tsx";
import { ShoppingProvider } from "./context/ShoppingContext.tsx";

import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ShoppingProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ShoppingProvider>
    </Provider>
  </React.StrictMode>
);
