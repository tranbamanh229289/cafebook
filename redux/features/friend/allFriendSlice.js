import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { baseURL } from "../../../utils/axiosClient";

const initialState = {
  data: { friends: [], total: "0" },
  loading: false,
  code: "",
};

export const getAllFriend = createAsyncThunk(
  "friend/get_user_friends",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}friend/get_user_friends`,
        {},
        {
          params: {
            token: params.token,
            user_id: params.user_id,
            index: params.index,
            count: 10,
          },
        }
      );
      // console.log(res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const allFriendSlice = createSlice({
  name: "allFriend",
  initialState: initialState,
  reducers: {
    resetAllFriend: (state) => {
      state.data = { friends: [], total: "0" };
      state.loading = false;
      state.code = "";
    },
    setFriend: (state, action) => {
      state.data.friends = action.payload.data;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFriend.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getAllFriend.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      });
  },
});

export const { resetAllFriend, setFriend } = allFriendSlice.actions;
export default allFriendSlice.reducer;
