import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../config";

export const courtsApi = createApi({
  reducerPath: "courts",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Courts", "Players", "Markers"],
  endpoints: (builder) => ({
    getMarkers: builder.query({
      query: () => "/markers",
      providesTags: ["Markers"],
    }),
    addCourt: builder.mutation({
      query: (court) => ({
        url: "/courts",
        method: "POST",
        body: court,
      }),
      invalidatesTags: ["Courts", "Markers"],
    }),
    getCourt: builder.query({
      query: (id) => `/courts/${id}`,
      providesTags: ["Courts"],
    }),
    getCourtPlayers: builder.query({
      query: (courtId) => `/courts/${courtId}/players`,
      providesTags: ["Players"],
    }),
    checkIn: builder.mutation({
      query(data) {
        const { courtId, formData, token } = data;
        return {
          url: `/courts/${courtId}/checkin`,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidateTags: ["Players", "Courts"],
    }),
    checkOut: builder.mutation({
      query(data) {
        const { courtId, formData, token } = data;
        return {
          url: `/courts/${courtId}/checkout`,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidateTags: ["Players", "Courts"],
    }),
  }),
});

export const {
  useGetMarkersQuery,
  useAddCourtMutation,
  useGetCourtQuery,
  useCheckInMutation,
  useGetCourtPlayersQuery,
  useCheckOutMutation,
} = courtsApi;
