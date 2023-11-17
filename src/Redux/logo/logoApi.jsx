import { apiSlice } from "../api/apiSlice";

export const logoApi = apiSlice.injectEndpoints({
  tagTypes: ["mainLogo", "dashboardLogo"],
  endpoints: (builder) => ({
    getMainLogo: builder.query({
      query: () => ({
        url: "/logo/main-logo",
      }),
      providesTags: ["mainLogo"],
    }),
    updateMainLogo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/logo/update-logo/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["mainLogo"],
    }),
    getDashboardLogo: builder.query({
      query: () => ({
        url: "/logo/dashboard-logo",
      }),
      providesTags: ["dashboardLogo"],
    }),
    updateDashboardLogo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/logo/update-logo/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["dashboardLogo"],
    }),
  }),
});

export const {
  useGetMainLogoQuery,
  useUpdateMainLogoMutation,
  useGetDashboardLogoQuery,
  useUpdateDashboardLogoMutation,
} = logoApi;
