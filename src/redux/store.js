import { combineReducers, configureStore } from '@reduxjs/toolkit';

import postReducer from "./reducers/postReducer";

const rootReducer = combineReducers({
  postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  },
);
