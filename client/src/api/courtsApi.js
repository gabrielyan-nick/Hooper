import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverUrl } from "../config";

export const courtsApi = createApi({
  reducerPath: "courts",
  baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
  tagTypes: ["Courts", "Players", "Markers"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getMarkers: builder.query({
      query: () => "/markers",
      refetchOnFocus: true,
      providesTags: (result, error, id) => [{ type: "Markers", id }],
    }),
    addCourt: builder.mutation({
      query: (court) => ({
        url: "/courts",
        method: "POST",
        body: court,
      }),
      invalidatesTags: ["Markers"],
    }),
    getCourt: builder.query({
      query: (id) => `/courts/${id}`,
      providesTags: (result, error, id) => [{ type: "Courts", id }],
      keepUnusedDataFor: 20,
    }),
    updateCourtInfo: builder.mutation({
      query(data) {
        const { courtId, formData, token } = data;
        return {
          url: `/courts/${courtId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
      },
      invalidatesTags: (result, error, { courtId }) => [
        { type: "Courts", courtId },
        { type: "Markers", courtId },
      ],
    }),
    getCourtPlayers: builder.query({
      query: (id) => `/courts/${id}/players`,
      providesTags: (result, error, id) => [{ type: "Players", id }],
      keepUnusedDataFor: 30,
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
      invalidatesTags: (result, error, { courtId }) => [
        { type: "Players", courtId },
        { type: "Markers" },
      ],
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
      invalidatesTags: (result, error, { courtId }) => [
        { type: "Players", courtId },
        { type: "Markers" },
      ],
    }),
    getChatMessages: builder.query({
      query: ({ courtId, chatId, offset, limit }) =>
        `/courts/${courtId}/chat/${chatId}?offset=${offset}&limit=${limit}`,
      keepUnusedDataFor: 1,
      refetchOnFocus: false,
    }),
    postChatMessage: builder.mutation({
      query(data) {
        const { courtId, chatId, formData, token } = data;
        return {
          url: `/courts/${courtId}/chat/${chatId}/messages`,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: (result, error, { courtId }) => [
        { type: "Courts", courtId },
      ],
    }),
    deleteChatMessage: builder.mutation({
      query(data) {
        const { courtId, chatId, messageId, token } = data;
        return {
          url: `/courts/${courtId}/chat/${chatId}/messages/${messageId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: (result, error, { courtId }) => [
        { type: "Courts", courtId },
      ],
    }),
    updateChatMessage: builder.mutation({
      query(data) {
        const { courtId, chatId, messageId, formData, token } = data;
        return {
          url: `/courts/${courtId}/chat/${chatId}/messages/${messageId}`,
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: (result, error, { courtId }) => [
        { type: "Courts", courtId },
      ],
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
  useUpdateCourtInfoMutation,
  useGetChatMessagesQuery,
  usePostChatMessageMutation,
  useDeleteChatMessageMutation,
  useUpdateChatMessageMutation,
} = courtsApi;
