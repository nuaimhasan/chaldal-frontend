import { apiSlice } from "../api/apiSlice";

export const couponApi = apiSlice.injectEndpoints({
  tagTypes: ["contact"],

  endpoints: (builder) => ({
    addCoupon: builder.mutation({
      query: (coupon) => ({
        url: "/coupon/add",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["contact"],
    }),
    getCoupons: builder.query({
      query: () => ({
        url: "/coupon/all",
      }),
      providesTags: ["contact"],
    }),
    getCouponById: builder.query({
      query: (id) => ({
        url: `/coupon/single/${id}`,
      }),
      providesTags: ["contact"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
    editCoupon: builder.mutation({
      query: ({ id, coupon }) => ({
        url: `/coupon/edit/${id}`,
        method: "PATCH",
        body: coupon,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useAddCouponMutation,
  useGetCouponsQuery,
  useDeleteCouponMutation,
  useGetCouponByIdQuery,
  useEditCouponMutation,
} = couponApi;
