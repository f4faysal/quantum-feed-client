import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Login
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/sing-in`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userRegister: build.mutation({
      query: (registerData) => ({
        url: `${AUTH_URL}/sing-up`,
        method: "POST",
        data: registerData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //update user
    updateUser: build.mutation({
      query: ({ username, ...changes }) => ({
        url: `${AUTH_URL}/${username}`,
        method: "PATCH",
        data: changes,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // My Profile
    myProfile: build.query({
      query: (username) => ({
        url: `${AUTH_URL}/profile/${username}`,
        method: "GET",
      }),

      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUpdateUserMutation,
  useMyProfileQuery,
} = authApi;
