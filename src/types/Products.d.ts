// Product interface
export interface Products {
  category: ReactNode;
  id: string;
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
// src/types/Products.ts
export interface ProductsState {
  products: Products[];
  loading: boolean;
  error: string | null;
}

// Catalog interface
export interface Catalogs {
  id: number;
  name: string;
  img: string ;
  description?: string;
}

interface IResponse<T> {
  [x: string]: any;
  status: number;
  message: string;
  length: number;
  data: T;
}

export type IProductResponse = IResponse<Products[]>;
export type IProductDetailResponse = Products;
export type ICatalogResponse = IResponse<Catalogs[]>;