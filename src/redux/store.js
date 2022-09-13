import { combineReducers, configureStore } from '@reduxjs/toolkit';

import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  postReducer,
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
