import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PropLogOut, PropLogin, currentUserProps } from "../../type";

const login: PropLogin = {
  currentUser: undefined,
  isFetching: false,
  error: false,
};

const logOut: PropLogOut = {
  isFetching: false,
  error: false,
};
type initialStateType = {
  login: PropLogin;
  logOut: PropLogOut;
};

const initialState: initialStateType = {
  login,
  logOut,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Login
    signInStart: (state) => {
      state.login.isFetching = true;
    },
    signInSuccess: (state, action: PayloadAction<currentUserProps>) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    signInFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    //
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = undefined;
      state.login.error = false;
    },
    logOutFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} = authSlice.actions;
export default authSlice.reducer;
