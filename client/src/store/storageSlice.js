import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  user: null,
  viewState: {
    latitude: 49.98116900406845,
    longitude: 36.27474511029263,
    zoom: 9.802041876073677,
  },
  mapStyle: "mapbox://styles/mapbox/outdoors-v11",
};

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
    setViewState: (state, action) => {
      state.viewState = action.payload;
    },
  },
});

export const { setTheme, setLogin, setLogout, setFavCourts, setViewState } =
  storageSlice.actions;
export default storageSlice.reducer;
