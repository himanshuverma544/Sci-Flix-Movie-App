import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_USER, CNAME_SIGNED_IN_USER } from "../constants";
import { getCustomCookieValue } from "../customFunctions";


const currentSignedInUser = getCustomCookieValue(CNAME_SIGNED_IN_USER);
const existingLocalUsers = localStorage.getItem("users");


const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: existingLocalUsers ? JSON.parse(existingLocalUsers) : [DEFAULT_USER],
    signedInUser: currentSignedInUser ?? DEFAULT_USER.username
  },
  reducers: {
    signUp(state, action) {
      return {
        users: [...state.users, action.payload],
        signedInUser: action.payload.username
      }
    },
    signIn(state, action) {
      return {
        users: state.users,
        signedInUser: action.payload.username
      }
    },
    signOut(state, action) {
      return {
        users: state.users,
        signedInUser: DEFAULT_USER.username
      }
    }
  }
});

export const { signUp, signIn, signOut } = usersSlice.actions;
export default usersSlice.reducer;