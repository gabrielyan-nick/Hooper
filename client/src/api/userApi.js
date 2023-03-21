import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../config";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  endpoints: (builder) => ({
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
  }),
});

export const { useAddRemoveFavMutation } = userApi;
