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
    addCategory: builder.mutation({
      query: (formData) => ({
        url: `/category/addcategory`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["category"],
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
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
