import { createReducer } from "@reduxjs/toolkit";
import data from "../../utils/data.json";

import * as types from "../types";

const initialState = {
  posts: data,
};

const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(types.ADD_POST_COMMENT, (state, action) => {
      const postInd = state.posts.findIndex(p => p.id === action.payload.postId);
      if (postInd > -1) {
        state.posts[postInd].replies = [action.payload.commentData, ...state.posts[postInd].replies];
      }
    })
    .addCase(types.ADD_POST_SUB_COMMENT, (state, action) => {
      const postInd = state.posts.findIndex(p => p.id === action.payload.postId);
      const replyInd = state.posts[postInd].replies.findIndex(r => r.id === action.payload.replyId);
      if (postInd > -1 && replyInd > -1) {
        state.posts[postInd].replies[replyInd].replies =
          [action.payload.commentData, ...state.posts[postInd].replies[replyInd].replies];
      }
    })
    .addCase(types.UPDATE_POST_LIKES, (state, action) => {
      const postInd = state.posts.findIndex(p => p.id === action.payload.postId);
      if (postInd > -1) {
        state.posts[postInd].likes = action.payload.likes;
        if (action.payload.liked) {
          state.posts[postInd].liked_by = [action.payload.currentUser, ...state.posts[postInd].liked_by];
        } else {
          state.posts[postInd].liked_by = state.posts[postInd].liked_by.filter(u => u?.id !== action?.payload?.currentUser?.id);
        }
      }
    })
    .addCase(types.UPDATE_POST_REPLY_LIKES, (state, action) => {
      const postInd = state.posts.findIndex(p => p.id === action.payload.postId);
      const repInd = state.posts[postInd].replies.findIndex(r => r.id === action.payload.replyId);
      if (postInd > -1 && repInd > -1) {
        state.posts[postInd].replies[repInd].likes = action.payload.likes;
        if (action.payload.liked) {
          state.posts[postInd].replies[repInd].liked_by =
            [action.payload.currentUser, ...state.posts[postInd].replies[repInd].liked_by];
        } else {
          state.posts[postInd].replies[repInd].liked_by =
            state.posts[postInd].replies[repInd].liked_by.filter(u => u?.id !== action?.payload?.currentUser?.id);
        }
      }
    })
    .addCase(types.UPDATE_POSTS_SUBREPLY_LIKES, (state, action) => {
      const postInd = state.posts.findIndex(p => p.id === action.payload.postId);
      const repInd = state.posts[postInd].replies.findIndex(r => r.id === action.payload.replyId);
      const subRepInd = state.posts[postInd].replies[repInd].replies.findIndex(r => r.id === action.payload.subReplyId);
      if (postInd > -1 && repInd > -1 && subRepInd > -1) {
        state.posts[postInd].replies[repInd].replies[subRepInd].likes = action.payload.likes;
        if (action.payload.liked) {
          state.posts[postInd].replies[repInd].replies[subRepInd].liked_by =
            [action.payload.currentUser, ...state.posts[postInd].replies[repInd].replies[subRepInd].liked_by];
        } else {
          state.posts[postInd].replies[repInd].replies[subRepInd].liked_by =
            state.posts[postInd].replies[repInd].replies[subRepInd].liked_by.filter(u => u?.id !== action?.payload?.currentUser?.id);
        }
      }
    })
    .addDefaultCase((state) => {
      state.posts = data;
    })
});

export default postReducer;