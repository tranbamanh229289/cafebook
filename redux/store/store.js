import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import createPostReducer from "../features/createPost/createPostSlice";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";
import requestedFriendReducer from "../features/friend/requestedFriendSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        createPost: createPostReducer,
        user: userReducer,
        post: postReducer,
        requestedFriend: requestedFriendReducer,    
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
