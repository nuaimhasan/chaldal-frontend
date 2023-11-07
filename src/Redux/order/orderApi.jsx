import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: (uuid) => ({
        url: `/order/user-orders/${uuid}`,
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
