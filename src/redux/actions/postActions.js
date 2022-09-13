import * as types from "../types";

export const updatePostLikes = (data = {}) => ({
  type: types.UPDATE_POST_LIKES,
  payload: data
});

export const updatePostReplyLikes = (data = {}) => ({
  type: types.UPDATE_POST_REPLY_LIKES,
  payload: data
});