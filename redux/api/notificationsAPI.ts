import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Notifications_API = "/notification";

export const notificationsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all notifications
    notifications: build.query({
      query: () => ({
        url: `${Notifications_API}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
    // update notification status
    updateNotification: build.mutation({
      query: (data) => ({
        url: `${Notifications_API}/update/${data.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const { useNotificationsQuery, useUpdateNotificationMutation } =
  notificationsAPI;
