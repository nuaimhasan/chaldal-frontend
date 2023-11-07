import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: (userId) => ({
        url: `/order/user-orders/${userId}`,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/order/all-orders",
      }),
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
    }),
  }),
});

export const { useGetMyOrdersQuery, useGetAllOrdersQuery, useGetOrderQuery } =
  orderApi;
