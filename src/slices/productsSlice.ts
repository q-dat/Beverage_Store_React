// src/slices/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../types/Products';

// Định nghĩa kiểu trạng thái của sản phẩm
export interface ProductsState {
  products: Products[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Products>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Products>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
