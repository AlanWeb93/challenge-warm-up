import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        posts: [],
        post: null
    },
    reducers: {
        addAll: (state, action) => {
          state.posts = action.payload;
        },
        add: (state, action) => {
            state.posts.payload = [action.payload, ...state.posts.payload]
        },
        postToUpdate: (state, action) => {
            state.post = action.payload;
        },
    }
});

export const { addAll, add, postToUpdate } = appSlice.actions;

export const selectPosts = (state) => state.app.posts;
export const selectPost = (state) => state.app.post;

export default appSlice.reducer;
