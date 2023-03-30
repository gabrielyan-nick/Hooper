import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../config";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (id) => `/users/${id}`,
    }),
    addRemoveFav: builder.mutation({
      query(data) {
        const { _id, courtId, token } = data;
        const reqBody = JSON.stringify({ _id: _id });
        return {
          url: `/courts/${courtId}/fav`,
          method: "PATCH",
          body: reqBody,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    updateUserInfo: builder.mutation({
      query(data) {
        const { _id, token, formData } = data;
        return {
          url: `/users/${_id}`,
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useAddRemoveFavMutation, useUpdateUserInfoMutation, useGetUserInfoQuery } = userApi;
