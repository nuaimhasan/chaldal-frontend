import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => ({
        url: "/order/my-orders",
      }),
    }),
  }),
});

export const { useGetMyOrdersQuery } = orderApi;
