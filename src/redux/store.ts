import { configureStore, Reducer } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import { Catalogs, Products } from "../types/Products";

const productsReducer: Reducer<Products[]> = (state = [], _action) => {
  return state;
};

const catalogsReducer: Reducer<Catalogs[]> = (state = [], _action) => {
  return state;
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    users: catalogsReducer,
    form: formReducer,
  },
});

export default store;
