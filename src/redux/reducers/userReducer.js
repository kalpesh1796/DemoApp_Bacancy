import { createReducer } from "@reduxjs/toolkit";

const currentUser = {
  id: 2,
  avatar: "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png",
  full_name: "Jason Shrensky"
};
const initialState = {
  user: currentUser,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addDefaultCase((state) => {
      state.user = currentUser;
    })
});

export default userReducer;