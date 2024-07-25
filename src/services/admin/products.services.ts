import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProductResponse } from "../../types/Products";

export const productsApi = createApi({
  reducerPath: "listApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProductResponse, void>({
      query: () => "/products",
    }),
    DeleteProducts: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useDeleteProductsMutation } =
  productsApi;