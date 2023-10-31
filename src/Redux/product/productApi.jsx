import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlashProducts: builder.query({
      query: () => ({
        url: "/product/flash-products",
      }),
    }),
    getProducts: builder.query({
      query: ({ limit, page, category = "" }) => ({
        url: `/product/all-products?limit=${limit}&page=${page}&category=${category}`,
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
