import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: () => ({
        url: "/contact",
      }),
      providesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, contactInfo }) => ({
        url: `/contact/update-contact/${id}`,
        method: "PUT",
        body: contactInfo,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const { useGetContactQuery, useUpdateContactMutation } = contactApi;
