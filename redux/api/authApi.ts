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
      query: ({ data, id }) => ({
        url: `${AUTH_URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // My Profile
    myProfile: build.query({
      query: (id) => ({
        url: `${AUTH_URL}/profile/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.user],
    }),

    // get user by username
    userByUsername: build.query({
      query: (username) => ({
        url: `${AUTH_URL}/${username}`,
        method: "GET",
      }),

      providesTags: [tagTypes.user],
    }),

    // follow user
    followUser: build.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/follow/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //follow-count
    followCount: build.query({
      query: (username) => ({
        url: `${AUTH_URL}/follow-count/${username}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // forgot password
    forgotPassword: build.mutation({
      query: (email) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: email,
      }),
    }),
    // reset password
    resetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUpdateUserMutation,
  useMyProfileQuery,
  useUserByUsernameQuery,
  useFollowUserMutation,
  useFollowCountQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
