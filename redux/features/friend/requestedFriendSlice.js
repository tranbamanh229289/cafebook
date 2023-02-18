import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { baseURL } from "../../../utils/axiosClient";

const initialState = {
  data: { "request": [], "total": "0"},
  loading: false,
  code: "",
};

export const getRequestedFriend = createAsyncThunk(
  "friend/get_requested_friends",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}friend/get_requested_friends`,
        {},
        { params: { token: params.token, index: params.index, count: 10 } }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const requestedFriendSlice = createSlice({
  name: "requestedFriend",
  initialState: initialState,
  reducers: {
    resetRequestedFriend: (state) => {
      state.data = { "request": [], "total": "0"};
      state.loading = false;
      state.code = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRequestedFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRequestedFriend.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getRequestedFriend.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      });
  },
});

export const {resetRequestedFriend} = requestedFriendSlice.actions;
export default requestedFriendSlice.reducer;

