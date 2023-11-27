import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const POST_API = "/post";

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation({
      query: (postData) => ({
        url: `${POST_API}/`,
        method: "POST",
        data: postData,
      }),
      invalidatesTags: [tagTypes.post],
    }),

    // get all posts
    posts: build.query({
      query: () => ({
        url: `${POST_API}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    }),

    // get all posts by user
    postsByUser: build.query({
      query: (id) => ({
        url: `${POST_API}/my-post/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    }),

    // get single post
    post: build.query({
      query: (id) => ({
        url: `${POST_API}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    }),

    //update post
    updatePost: build.mutation({
      query: ({ data, id }) => ({
        url: `${POST_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.post],
    }),

    //delete post
    deletePost: build.mutation({
      query: (id) => ({
        url: `${POST_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.post],
    }),
  }),
});

export const {
  useCreatePostMutation,
  usePostsQuery,
  usePostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  usePostsByUserQuery,
} = postApi;
