import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
      }),
    }),
  }),
});

export const { useAllUsersQuery } = userApi;
