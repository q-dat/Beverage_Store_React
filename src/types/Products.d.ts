// Product interface
export interface Products {
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

// Catalog interface
export interface Catalogs {
  id: number;
  name: string;
  img: string | null;
  description: string | null;
}

interface IResponse<T> {
  status: number;
  message: string;
  length: number;
  data: T;
}

export type IProductResponse = IResponse<Products[]>;
export type IProductDetailResponse = Products;