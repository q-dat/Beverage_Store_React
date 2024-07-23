// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//   IProductDetailResponse,
//   IProductResponse,
//   Products,
// } from "../../types/Products";

// export const productApi = createApi({
//   reducerPath: "productApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//   }),
//   endpoints: (builder) => ({
//     getProduct: builder.query<IProductResponse, void>({
//       query: () => "/products",
//     }),

//     createProduct: builder.mutation<IProductDetailResponse, Products>({
//       query: (listData) => ({
//         url: "/products",
//         method: "POST",
//         body: listData,
//       }),
//     }),
//     deleteProduct: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProductQuery,
//   useCreateProductMutation,
//   useDeleteProductMutation,
// } = productApi;
