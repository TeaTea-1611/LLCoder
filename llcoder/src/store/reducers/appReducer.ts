import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../";
import config from "../../config";

interface IinitialState {
  language: string;
  theme: string;
}

const initialState: IinitialState = {
  language: config.options.language,
  theme: config.options.theme,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

//Selectors
export const selectLanguage = (state: AppState) => state.app.language;
export const selectTheme = (state: AppState) => state.app.theme;

//Actions
export const { changeTheme, changeLanguage } = appSlice.actions;

export default appSlice.reducer;
