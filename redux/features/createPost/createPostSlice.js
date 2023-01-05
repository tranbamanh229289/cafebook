import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    submit: (state) => {
      // Call API
      console.log("submit post : "  + state.value);
    },
    onChange: (state, action) => {
      state.value = action.payload;
    },
    onPressIcon: (state, action) => {
      state.value += action.payload;
    },
    discardPost: (state) => {
      state.value = "";
    }
  },
});

// Action creators are generated for each case reducer function
export const { submit, onChange, onPressIcon, discardPost } = createPostSlice.actions

export default createPostSlice.reducer