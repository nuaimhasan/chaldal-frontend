import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  loggedUser: {
    status: false,
    loading: true,
    data: undefined,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.loggedUser.status = action.payload.status;
      state.loggedUser.loading = action.payload.loading;
      state.loggedUser.data = action.payload.data;
    },
    userLogout: (state) => {
      state.token = "";
      state.loggedUser.status = false;
      state.loggedUser.data = undefined;
    },
  },
});

export const { userLoggedIn, userLogout } = authSlice.actions;
export default authSlice.reducer;
