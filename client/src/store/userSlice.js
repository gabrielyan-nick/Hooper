import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light", user: null };

const userSlice = createSlice({
  name: "user",
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
  },
});

export const { setTheme, setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
