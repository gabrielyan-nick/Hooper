import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  user: null,
  viewState: {
    latitude: 49.98116900406845,
    longitude: 36.27474511029263,
    zoom: 9.802041876073677,
  },
  mapStyle: "mapbox://styles/mapbox/outdoors-v12",
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (state.theme === "dark") {
        state.mapStyle = "mapbox://styles/mapbox/dark-v11";
      } else if (state.theme === "light") {
        state.mapStyle = "mapbox://styles/mapbox/outdoors-v12";
      }
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
    setMapSatellite: (state) => {
      state.mapStyle = "mapbox://styles/mapbox/satellite-streets-v12";
    },
    setMapDark: (state) => {
      state.mapStyle = "mapbox://styles/mapbox/dark-v11";
    },
    setMapLight: (state) => {
      state.mapStyle = "mapbox://styles/mapbox/outdoors-v12";
    },
  },
});

export const {
  setTheme,
  setLogin,
  setLogout,
  setFavCourts,
  setViewState,
  setMapStyle,
  setMapSatellite,
  setMapDark,
  setMapLight,
} = storageSlice.actions;
export default storageSlice.reducer;
