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
import userReducer from "./userSlice";
import { courtsApi } from "../api/courtsApi";
import { authApi } from "../api/authApi";

const persistConfig = {
  key: "hoop",
  storage,
  version: 1,
};

const persistedThemeReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({
  user: persistedThemeReducer,
  [courtsApi.reducerPath]: courtsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(courtsApi.middleware, authApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistedStore = persistStore(store);
