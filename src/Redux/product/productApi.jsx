import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlashProducts: builder.query({
      query: () => ({
        url: "/product/flash-products",
      }),
    }),
    getProducts: builder.query({
      query: ({ category = "" }) => ({
        url: `/product/all-products?category=${category}`,
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
  }),
});

export const {
  useGetFlashProductsQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = productApi;
