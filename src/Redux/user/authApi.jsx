import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/user/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("eshop_jwt", result?.data?.token);

          dispatch(
            userLoggedIn({
              token: result?.data?.token,
              data: result?.data,
            })
          );
        } catch (error) {
          // Do not any thing , handel error from ui
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
