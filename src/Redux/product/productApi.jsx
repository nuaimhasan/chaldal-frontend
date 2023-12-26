import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getFlashProducts: builder.query({
      query: () => ({
        url: "/product/flash-products",
      }),
      providesTags: ["product"],
    }),
    getAllProducts: builder.query({
      query: (query) => ({
        url: `/product/all-products`,
        method: "GET",
        params: query,
      }),
      providesTags: ["product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/product/getbyslug/${slug}`,
      }),
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: `/product/add-product`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetFlashProductsQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
