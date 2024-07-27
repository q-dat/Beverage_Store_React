// import axios from "axios";

// const API_URL = "http://localhost:3000/products";

// export const getProducts = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     throw error;
//   }
// };

// export const getProduct = async (productId: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/${productId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     throw error;
//   }
// };

import axios from "axios";
import { Catalogs, ICatalogResponse, IProductResponse, Products } from "../types/Products";

// Định nghĩa URL API
const API_URL = "http://localhost:3000/products";
const CATALOG_URL = "http://localhost:3000/catalog";
const SALE_URL = "http://localhost:3000/sale";

// Định nghĩa kiểu dữ liệu cho productData và catalogData
interface ProductData {
  id_catalog: number;
  name: string;
  img: string;
  img_child: string;
  price: number;
  sale: number;
  status: number;
  views: number;
  description: string;
}

interface CatalogData {
  name: string;
  img?: string;
  description?: string;
}

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};
// Lấy chi tiết một sản phẩm theo ID
export const getProduct = async (productId: string) => {
  try {
    const response = await axios.get<Products>(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw new Error("Failed to fetch product");
  }
};

// Tạo mới một sản phẩm
export const createProduct = async (productData: ProductData) => {
  try {
    const response = await axios.post<Products>(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product: ", error);
    throw new Error("Failed to create product");
  }
};
// Cập nhật một sản phẩm theo ID
export const updateProduct = async (productId: string, productData: Products): Promise<Products> => {
  try {
    const response = await axios.put<Products>(`${API_URL}/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw new Error("Failed to update product");
  }
};

// Xóa một sản phẩm theo ID
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${productId}`);
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw new Error("Failed to delete product");
  }
};


// Lấy sản phẩm giảm giá
export const getSaleProducts = async () => {
  try { 
    const response = await axios.get<IProductResponse>(SALE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sale products: ", error);
    throw new Error("Failed to fetch sale products");
  }
};

// Lấy danh mục sản phẩm
export const getCatalogs = async () => {
  try {
    const response = await axios.get<ICatalogResponse>(CATALOG_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching catalogs: ", error);
    throw new Error("Failed to fetch catalogs");
  }
};

// Tạo mới danh mục sản phẩm
export const createCatalog = async (catalogData: CatalogData) => {
  try {
    const response = await axios.post<Catalogs>(CATALOG_URL, catalogData);
    return response.data;
  } catch (error) {
    console.error("Error creating catalog: ", error);
    throw new Error("Failed to create catalog");
  }
};

// Lấy chi tiết một danh mục theo ID
export const getCatalog = async (categoryId: string) => {
  try {
    const response = await axios.get<Catalogs>(`${CATALOG_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching catalog: ", error);
    throw new Error("Failed to fetch catalog");
  }
};

// Lấy sản phẩm theo danh mục
export const getProductsByCatalog = async (idCatalog: string) => {
  try {
    const response = await axios.get<IProductResponse>(`${API_URL}/catalog/${idCatalog}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by catalog: ", error);
    throw new Error("Failed to fetch products by catalog");
  }
};

// Tìm kiếm sản phẩm theo tên
export const searchProducts = async (name: string) => {
  try {
    const response = await axios.get<IProductResponse>(`${API_URL}/search/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error searching products: ", error);
    throw new Error("Failed to search products");
  }
};
