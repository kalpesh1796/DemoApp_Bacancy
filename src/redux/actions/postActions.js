import * as types from "../types";

export const updatePostLikes = (data = {}) => ({
  type: types.UPDATE_POST_LIKES,
  payload: data,
});

export const updatePostReplyLikes = (data = {}) => ({
  type: types.UPDATE_POST_REPLY_LIKES,
  payload: data,
});

export const updatePostsSubReplyLikes = (data = {}) => ({
  type: types.UPDATE_POSTS_SUBREPLY_LIKES,
  payload: data,
});

export const addPostComment = (data = {}) => ({
  type: types.ADD_POST_COMMENT,
  payload: data,
});

export const addPostSubComment = (data = {}) => ({
  type: types.ADD_POST_SUB_COMMENT,
  payload: data,
});