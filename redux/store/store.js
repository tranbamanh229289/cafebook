import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import createPostReducer from "../features/createPost/createPostSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    createPost: createPostReducer
  },
});
