import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
