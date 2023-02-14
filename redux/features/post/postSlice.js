import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { baseURL } from "../../../utils/axiosClient";

const initialState = {
  data: {
    posts: [],
    new_items: "",
    last_id: "",

  },
  loading: false,
  code: "",
  images: [],
  text: "",
};

export const getListPost = createAsyncThunk(
    "post/get_list_posts",
    async (params, thunkAPI) => {
        try {
            const res = await axiosClient("post","post/get_list_posts",{}, {token: params.token, index: 0 ,count: 5 , last_id: params.last_id});
            return res.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const AppendListPost = createAsyncThunk(
    "post/append_get_list_post",
    async (params, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.data.token;
            const res = await axiosClient("post","post/get_list_posts",{}, {token, index: params.index ,count: 5 , last_id: params.last_id});
            console.log(res.data)
            return res.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const addPost = createAsyncThunk(
  "post/add_post",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const formData = new FormData();
    try {
      state.post.images.map((image) => {
        formData.append("image", {
          uri: image.uri,
          name: "post-image",
          type: "image/jpeg",
        });
      });

      const res = await axios.post(
        `${baseURL}post/add_post`,
        state.post.images.length > 0 ? formData : {},
        {
          params: {
            token: state.auth.data.token,
            described: state.post.text,
          },
          headers: {
            "Content-Type": "multi-part/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    discardPost: (state) => {
      state.loading = false;
      state.code = "";
      state.images = [];
      state.text = "";
    },
    changeText: (state, action) => {
      state.text = action.payload;
    },
    selectImages: (state, action) => {
      console.log(action.payload);
      state.images = action.payload;
    },
    appendImage: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    appendListImage: (state, action) => {
      state.images = [...state.images, ...action.payload];
    },
    closeImage: (state, action) => {
      state.images = [
        ...state.images.slice(0, action.payload),
        ...state.images.slice(action.payload + 1),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
        state.images = [];
        state.text = "";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(AppendListPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(AppendListPost.fulfilled, (state, action) => {
        state.code = action.payload.code;
        state.data.posts = [...state.data.posts, ...action.payload.data.posts];
        state.data.new_items = action.payload.data.new_items;
        state.data.last_id = action.payload.data.last_id;
        state.loading = false;
      })
      .addCase(AppendListPost.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getListPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListPost.fulfilled, (state, action) => {
        console.log(action.payload)
        state.code = action.payload.code;
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getListPost.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      });
  },
});

export const {
  discardPost,
  changeText,
  selectImages,
  appendImage,
  appendListImage,
  closeImage,
} = postSlice.actions;
export default postSlice.reducer;
