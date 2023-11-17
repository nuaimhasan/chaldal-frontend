import { apiSlice } from "../api/apiSlice";

export const aboutApi = apiSlice.injectEndpoints({
  tagTypes: ["about"],
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/about",
      }),
      providesTags: ["about"],
    }),
    updateAbout: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/about/update-about/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation } = aboutApi;
