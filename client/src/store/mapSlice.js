import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewState: {
    latitude: 49.98116900406845,
    longitude: 36.27474511029263,
    zoom: 9.802041876073677,
  },
  mapStyle: "mapbox://styles/mapbox/outdoors-v11",
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setViewState: (state, action) => {
      state.viewState = action.payload;
    },
  },
});

export const { setViewState } = mapSlice.actions;
export default mapSlice.reducer;
