import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../config";

export const courtsApi = createApi({
  reducerPath: "courts",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Courts"],
  endpoints: (builder) => ({
    getMarkers: builder.query({
      query: () => "/markers",
      providesTags: ["Courts"],
    }),
    addCourt: builder.mutation({
      query: (court) => ({
        url: "/courts",
        method: "POST",
        body: court,
      }),
      invalidatesTags: ["Courts"],
    }),
    getCourt: builder.query({
      query: (id) => `/courts/${id}`,
    }),
  }),
});

export const { useGetMarkersQuery, useAddCourtMutation, useGetCourtQuery } =
  courtsApi;
