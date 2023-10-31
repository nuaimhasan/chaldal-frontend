import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("WorkStation_jwt", result?.data?.data?.token);

          dispatch(
            userLoggedIn({
              token: result?.data?.data?.token,
              loading: false,
              status: true,
              data: result?.data?.data?.user,
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
