import { createSlice } from "@reduxjs/toolkit";

const initialState = { modalType: "", courtId: "", userId: "" };

const navigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    setCourtIdForNav: (state, action) => {
      state.courtId = action.payload;
    },
    setUserIdForNav: (state, action) => {
      state.userId = action.payload;
    },
    setModalTypeForNav: (state, action) => {
      state.modalType = action.payload;
    },
  },
});

export const { setUserIdForNav, setCourtIdForNav, setModalTypeForNav } =
  navigateSlice.actions;
export default navigateSlice.reducer;
