import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courtsApi = createApi({
  reducerPath: "courts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
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
  }),
});

export const { useGetMarkersQuery, useAddCourtMutation } = courtsApi;
