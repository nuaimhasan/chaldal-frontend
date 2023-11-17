import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  tagTypes: ["users"],
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "/user/allUsers",
      }),
    }),
    allCustomers: builder.query({
      query: () => ({
        url: "/user/allCustomers",
      }),
    }),
    allAdministrator: builder.query({
      query: () => ({
        url: "/user/allAdmins",
      }),
      providesTags: ["users"],
    }),
    addAdministrator: builder.mutation({
      query: (info) => ({
        url: `/user/add-admin`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["users"],
    }),
    deleteAdministrator: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useAllCustomersQuery,
  useAllAdministratorQuery,
  useDeleteAdministratorMutation,
  useAddAdministratorMutation,
} = userApi;
