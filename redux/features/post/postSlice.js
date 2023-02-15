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
  myPosts: [],
};

export const appendMyListPost = createAsyncThunk(
  "post/append_my_list_posts",
  async (params, thunkAPI) => {
      try {
          const res = await axios.post(`${baseURL}post/get_my_list_posts`,{},{params: {token: params.token, page: params.page, limit: 3}});
          return res.data;
      }
      catch (err) {
          return thunkAPI.rejectWithValue(err.response.data);
      }
  }
);

export const getMyListPost = createAsyncThunk(
  "post/get_my_list_posts",
  async (params, thunkAPI) => {
      try {
          const res = await axios.post(`${baseURL}post/get_my_list_posts`,{},{params: {token: params.token, page: params.page, limit: 3}});
          return res.data;
      }
      catch (err) {
          return thunkAPI.rejectWithValue(err.response.data);
      }
  }
);

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

export const AppendAfterPost = createAsyncThunk(
  "post/append_after_post",
  async (params, thunkAPI) => {
      try {
          const res = await axiosClient("post","post/get_post",{}, {token: params.token, id: params.id});
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
    selectEmoji: (state, action) => {
      state.text += action.payload;
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
        console.log(action.payload);
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
        state.code = action.payload.code;
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getListPost.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getMyListPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyListPost.fulfilled, (state , action) => {
        state.myPosts = action.payload.data.posts;
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(getMyListPost.rejected, (state, action) => {
        state.code = action.payload.code;
        state.loading = false;
      })
      .addCase(AppendAfterPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(AppendAfterPost.fulfilled, (state, action) => {
        state.code = action.payload.code;
        state.loading = false;
        state.myPosts = [action.payload.data, ...state.myPosts];
        state.data.posts = [action.payload.data, ...state.data.posts];
        state.data.last_id = action.payload.data.id;
      }).addCase(AppendAfterPost.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
      }).addCase(appendMyListPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(appendMyListPost.fulfilled, (state , action) => {
        state.myPosts = [...state.myPosts, ...action.payload.data.posts];
        state.loading = false;
        state.code = action.payload.code;
      })
      .addCase(appendMyListPost.rejected, (state, action) => {
        state.code = action.payload.code;
        state.loading = false;
      })
  },
});

export const {
  discardPost,
  changeText,
  selectImages,
  appendImage,
  appendListImage,
  closeImage,
  selectEmoji,
} = postSlice.actions;
export default postSlice.reducer;
