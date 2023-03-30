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
import storageReducer from "./storageSlice";
import navigateReducer from "./navigateSlice";
import { courtsApi } from "../api/courtsApi";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";

const persistConfig = {
  key: "hoop",
  storage,
  version: 1,
};

const persistedStorageReducer = persistReducer(persistConfig, storageReducer);

const rootReducer = combineReducers({
  storage: persistedStorageReducer,
  navigate: navigateReducer,
  [courtsApi.reducerPath]: courtsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(courtsApi.middleware, authApi.middleware, userApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistedStore = persistStore(store);
