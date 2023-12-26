import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  tagTypes: ["order"],
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: (userId) => ({
        url: `/order/user-orders/${userId}`,
      }),
      providesTags: ["order"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/order/all-orders",
      }),
      providesTags: ["order"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["order"],
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: `/order/post-order`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    statusUpdate: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useStatusUpdateMutation,
} = orderApi;
