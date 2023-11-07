import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "/user/allUsers",
      }),
    }),
  }),
});

export const { useAllUsersQuery } = userApi;
