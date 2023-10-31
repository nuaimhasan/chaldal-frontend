import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlashProducts: builder.query({
      query: () => ({
        url: "/product/flash-products",
      }),
    }),
    getProducts: builder.query({
      query: ({ limit, page }) => ({
        url: `/product/all-products?limit=${limit}&page=${page}`,
      }),
    }),
  }),
});

export const { useGetFlashProductsQuery, useGetProductsQuery } = productApi;
