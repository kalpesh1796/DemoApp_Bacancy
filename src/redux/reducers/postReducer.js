import { createReducer } from "@reduxjs/toolkit";
import data from "../../utils/data.json";

import * as types from "../types";

const initialState = {
  posts: data,
};

const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(types.UPDATE_POST, (state) => {
      state.posts = [];
    })
    .addCase(types.UPDATE_POST_LIKES, (state, action) => {
      const postInd = state.posts.findIndex(p => p.id === action.payload.postId);
      state.posts[postInd].likes = action.payload.likes;
    })
    .addCase(types.UPDATE_POST_REPLY_LIKES, (state, action) => {
      const postInd = state.posts.findIndex(p => p.id === action.payload.postId);
      const repInd = state.posts[postInd].replies.findIndex(r => r.id === action.payload.replyId);
      state.posts[postInd].replies[repInd].likes = action.payload.likes;
    })
    .addDefaultCase((state) => {
      state.posts = data;
    })
});

export default postReducer;