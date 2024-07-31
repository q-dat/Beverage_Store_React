import { ReactNode } from 'react';

// Các loại đã có
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

export interface ProductsState {
  products: Products[];
  loading: boolean;
  error: string | null;
}

export interface Catalogs {
  id: number;
  name: string;
  img: string;
  description?: string;
}

export interface Orders {
  id: number;
  createAt: string;
  status: string;
  total: number;
  user_id: number;
  payment_id: number;
}

export interface OrderDetail {
  id: number;
  order_id: number; 
  product_id: string;
  price: number;
  quantity: number;
  total: number;
  status: number;
}



interface IResponse<T> {
  [x: string]: any;
  status: number;
  message: string;
  length: number;
  data: T;
}

// Các loại phản hồi cho đơn hàng
export type IOrderResponse = IResponse<Orders[]>;
export type IOrderDetailResponse = IResponse<OrderDetail[]>;

export type IProductResponse = IResponse<Products[]>;
export type IProductDetailResponse = Products;
export type ICatalogResponse = IResponse<Catalogs[]>;
