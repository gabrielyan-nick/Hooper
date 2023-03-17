import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./themeSlice";
import { courtsApi } from "../api/courtsApi";

const persistConfig = {
  key: "hoop",
  storage,
  version: 1,
};

const persistedThemeReducer = persistReducer(persistConfig, themeReducer);

const rootReducer = combineReducers({
  theme: persistedThemeReducer,
  [courtsApi.reducerPath]: courtsApi.reducer,
  // ...reducers
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(courtsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistedStore = persistStore(store);
