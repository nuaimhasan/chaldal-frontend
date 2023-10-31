import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/v1",
    // baseUrl: "https://eshop-server-api.onrender.com/v1",
    baseUrl: "https://eshop-server-api.onrender.com/v1",
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("eshop_jwt");
      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
