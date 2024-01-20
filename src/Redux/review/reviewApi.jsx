import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  tagTypes: ["review"],
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: `/review/add-review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    getReviews: builder.query({
      query: (productId) => `/review/get-reviews/${productId}`,
      providesTags: ["review"],
    }),

    deleteReview: builder.mutation({
      query: ({ reviewId, data }) => ({
        url: `/review/delete-review/${reviewId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = reviewApi;
