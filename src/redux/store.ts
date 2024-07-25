import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from 'redux-form';
// import { productsApi } from "../services/admin/products.services";
// export const store = configureStore({
//   reducer: {
//     [productsApi.reducerPath]: productsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(productsApi.middleware),
// });

const productsReducer = (state = [], _action: any) => {
    return state;
  };
  
  const usersReducer = (state = [], _action: any) => {
    return state;
  };
  
  export const store = configureStore({
    reducer: {
      products: productsReducer,
      users: usersReducer,
      form: formReducer,
    },
  });
  
