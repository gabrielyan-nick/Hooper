import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light", user: null };

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setFavCourts: (state, action) => {
      state.user.favouriteCourts = action.payload;
    },
  },
});

export const { setTheme, setLogin, setLogout, setFavCourts } =
  storageSlice.actions;
export default storageSlice.reducer;
