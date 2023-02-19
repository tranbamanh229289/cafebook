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

export const setRequestFriend  = createAsyncThunk(
  "friend/set_request_friend",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}friend/set_request_friend`,
        {},
        { params: { token: params.token, user_id: params.user_id} }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const setAcceptFriend  = createAsyncThunk(
  "friend/set_accept_friend",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}friend/set_accept_friend`,
        {},
        { params: { token: params.token, user_id: params.user_id, is_accept: params.is_accept}}
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const setBlock  = createAsyncThunk(
  "friend/set_block",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}friend/set_block`,
        {},
        { params: { token: params.token, user_id: params.user_id, type: params.type}}
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

const requestedFriendSlice = createSlice({
  name: "requestedFriend",
  initialState: initialState,
  reducers: {
    resetRequestedFriend: (state) => {
      state.data = { request: [], total: "0"};
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
      })

      .addCase(setAcceptFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(setAcceptFriend.fulfilled, (state, action) => {
        state.data.total -=1
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(setAcceptFriend.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })

      .addCase(setRequestFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(setRequestFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(setRequestFriend.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })

      .addCase(setBlock.pending, (state) => {
        state.loading = true;
      })
      .addCase(setBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(setBlock.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
  },
});

export const {resetRequestedFriend} = requestedFriendSlice.actions;
export default requestedFriendSlice.reducer;

