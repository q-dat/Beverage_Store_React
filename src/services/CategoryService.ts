// src/services/CategoryService.ts
import { Catalogs, Products } from '../types/Products';

// Lấy tất cả sản phẩm
export const fetchAllProducts = async (): Promise<Products[]> => {
  const response = await fetch('http://localhost:3000/products');
  if (!response.ok) {
    throw new Error('Lỗi khi lấy tất cả sản phẩm');
  }
  return response.json();
};

// Lấy danh mục
export const fetchCategories = async (): Promise<Catalogs[]> => {
  const response = await fetch('http://localhost:3000/catalog');
  if (!response.ok) {
    throw new Error('Lỗi khi lấy danh mục');
  }
  return response.json();
};

// Lấy sản phẩm theo danh mục
export const fetchProductsByCategory = async (categoryId: number): Promise<Products[]> => {
  const response = await fetch(`http://localhost:3000/products/catalog/${categoryId}`);
  if (!response.ok) {
    throw new Error('Lỗi khi lấy sản phẩm theo danh mục');
  }
  return response.json();
};

// Thêm danh mục
export const addCategory = async (category: { name: string; description?: string }): Promise<void> => {
  const response = await fetch('http://localhost:3000/catalog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error('Lỗi khi thêm danh mục');
  }
};

// Cập nhật danh mục
export const updateCategory = async (id: number, category: { name: string; description?: string }): Promise<void> => {
  const response = await fetch(`http://localhost:3000/catalog/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error('Lỗi khi cập nhật danh mục');
  }
};

// Xóa danh mục
export const deleteCategory = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:3000/catalog/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Lỗi khi xóa danh mục');
  }
};
