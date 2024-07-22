import { Products } from "../types/Products";

// Tìm kiếm sản phẩm theo tên
export const searchProductsByName = async (name: string): Promise<Products[]> => {
    const response = await fetch(`http://localhost:3000/products/search/${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error("Lỗi khi tìm kiếm sản phẩm");
    }
    return response.json();
  };