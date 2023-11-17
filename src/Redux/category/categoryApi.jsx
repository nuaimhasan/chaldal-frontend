import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category/allCategories",
      }),
      providesTags: ["category"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/category/updateCategory/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
