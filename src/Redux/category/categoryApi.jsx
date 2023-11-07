import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category/allCategories",
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
