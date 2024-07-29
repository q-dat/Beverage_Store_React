// src/slices/categoriesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Catalogs } from '../types/Products';

// Define the state type for categories
export interface CategoriesState {
  categories: Catalogs[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Catalogs>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Catalogs>) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
    setCategories: (state, action: PayloadAction<Catalogs[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
