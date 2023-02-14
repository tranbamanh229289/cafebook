import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient, { baseURL } from "../../../utils/axiosClient";
import * as FileSystem from 'expo-file-system'

const initialState = {
  data: {},
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setAvatar = createAsyncThunk(
  "user/set_avatar",
  async (params, thunkAPI) => {
      const res = await FileSystem.uploadAsync(
        `${baseURL}user/set_user_info?token=${params.token}`,
        params.uri,
        {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'avatar',
        },
      );
      const body = JSON.parse(res.body);
      if (res.status === 200) {
        return body;
      }
      else {
        return thunkAPI.rejectWithValue(body);
      }
  }
);

export const setCoverImage = createAsyncThunk(
  "user/set_cover_image",
  async (params, thunkAPI) => {
      const res = await FileSystem.uploadAsync(
        `${baseURL}user/set_user_info?token=${params.token}`,
        params.uri,
        {
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: 'cover_image',
        },
      );
      const body = JSON.parse(res.body);
      if (res.status === 200) {
        return body;
      }
      else {
        return thunkAPI.rejectWithValue(body);
      }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    deleteUser: (state) => {
      state.data = {
        avatar: null,
        username: ""
      };
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
        state.data = action.payload.data;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(setAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(setAvatar.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(setAvatar.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(setCoverImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCoverImage.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(setCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      });
  },
});

export const {deleteUser} = userSlice.actions;
export default userSlice.reducer;
