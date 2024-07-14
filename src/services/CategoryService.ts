// src/services/apiService.ts
import { Catalogs, Products } from "../types/Products";

// Lấy tất cả sản phẩm
export const fetchAllProducts = async (): Promise<Products[]> => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) {
    throw new Error("Lỗi khi lấy tất cả sản phẩm");
  }
  return response.json();
};

// Lấy danh mục
export const fetchCategories = async (): Promise<Catalogs[]> => {
  const response = await fetch("http://localhost:3000/catalog");
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục");
  }
  return response.json();
};

// Lấy sản phẩm theo danh mục
export const fetchProductsByCategory = async (categoryId: number): Promise<Products[]> => {
  const response = await fetch(`http://localhost:3000/products/catalog/${categoryId}`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy sản phẩm theo danh mục");
  }
  return response.json();
};
