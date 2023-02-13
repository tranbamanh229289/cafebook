import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";

const initialState = {
  user: {},
  loading: false,
  code: "",
};

export const getUserInfo = createAsyncThunk(
  "user/get_user_info",
  async (params, thunkAPI) => {
    try {
      const res = await axiosClient(
        "post",
        "/user/get_user_info",
        {},
        { token: params.token, user_id: params.userId }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    deleteUser: (state) => {
      state.user = {};
      state.loading = false;
      state.code = "" 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled,(state, action) => {
        state.user = action.payload.data;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      });
  },
});

export const {deleteUser} = userSlice.actions;
export default userSlice.reducer;
