  // src/store.ts
  import { configureStore } from '@reduxjs/toolkit';
  import { reducer as formReducer } from 'redux-form';
  import productsReducer from '../slices/productsSlice';
  import { ProductsState } from '../slices/productsSlice';

  // Định nghĩa kiểu cho RootState
  export type RootState = {
    products: ProductsState;
    form: ReturnType<typeof formReducer>;
  };

  // Định nghĩa kiểu cho AppDispatch
  export type AppDispatch = typeof store.dispatch;

  // Tạo store
  export const store = configureStore({
    reducer: {
      products: productsReducer,
      form: formReducer,
    },
  });

  // Export store để sử dụng ở nơi khác trong ứng dụng
  export default store;
