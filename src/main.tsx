import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/index.tsx";
import { ShoppingProvider } from "./context/ShoppingContext.tsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { productsApi } from "./services/admin/products.services.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={productsApi}>  */}
      <ShoppingProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ShoppingProvider>
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
);
