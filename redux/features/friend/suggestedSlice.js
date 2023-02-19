import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { baseURL } from "../../../utils/axiosClient";

const initialState = {
  data: { list_users: [], total: "0" },
  loading: false,
  code: "",
};

export const getSuggestedFriend = createAsyncThunk(
  "friend/get_list_suggested_friends",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}friend/get_list_suggested_friends`,
        {},
        {
          params: {
            token: params.token,
            index: params.index,
            count: 10,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const suggestedFriendSlice = createSlice({
  name: "suggestedFriend",
  initialState: initialState,
  reducers: {
    resetSuggestedFriend: (state) => {
      state.data = { list_users: [], total: "0" };
      state.loading = false;
      state.code = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSuggestedFriend.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuggestedFriend.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getSuggestedFriend.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      });
  },
});

export const { resetSuggestedFriend } = suggestedFriendSlice.actions;
export default suggestedFriendSlice.reducer;
