import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/usersSlice";
import { postsSlice } from "./slices/postsSlice";
export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
