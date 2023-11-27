import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COMMENT_API = "/comment";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: (postData) => ({
        url: `${COMMENT_API}/`,
        method: "POST",
        data: postData,
      }),
      invalidatesTags: [tagTypes.post],
    }),

    // get all posts
    comments: build.query({
      query: () => ({
        url: `${COMMENT_API}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    }),

    // get single post
    comment: build.query({
      query: (id) => ({
        url: `${COMMENT_API}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    }),

    //update post
    updateComment: build.mutation({
      query: ({ data, id }) => ({
        url: `${COMMENT_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.post],
    }),

    //delete post
    deleteComment: build.mutation({
      query: (id) => ({
        url: `${COMMENT_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.post],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useCommentsQuery,
  useCommentQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
