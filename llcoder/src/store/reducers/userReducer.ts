import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../";

interface IinitialState {
  user: object | null;
  isLoggedIn: boolean;
}

const initialState: IinitialState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

//Selectors
export const selectUser = (state: AppState) => state.user.user;
export const selectIsLoggedIn = (state: AppState) => state.user.isLoggedIn;

export default userSlice.reducer;
