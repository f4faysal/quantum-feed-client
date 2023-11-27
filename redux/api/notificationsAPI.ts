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
      providesTags: [tagTypes.post],
    }),
  }),
});

export const {} = notificationsAPI;
