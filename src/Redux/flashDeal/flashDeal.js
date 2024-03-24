import { apiSlice } from "../api/apiSlice";

export const flashDealApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFlashDeal: builder.mutation({
      query: (flashDealInfo) => ({
        url: `/flash-deal/add-flashDeal`,
        method: "POST",
        body: flashDealInfo,
      }),
      invalidatesTags: ["flashDeal"],
    }),

    getFlashDeal: builder.query({
      query: () => ({
        url: "/flash-deal/all",
      }),
      providesTags: ["flashDeal"],
    }),
  }),
});

export const { useAddFlashDealMutation, useGetFlashDealQuery } = flashDealApi;
