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
      query: ({ category = "" }) => ({
        url: `/product/all-products?category=${category}`,
      }),
      providesTags: ["product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
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
  useAddProductMutation,
  useDeleteProductMutation,
} = productApi;
