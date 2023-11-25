import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
