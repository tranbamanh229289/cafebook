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
  mapData: {},
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
            const res = await axiosClient("post","post/get_list_posts",{}, {token: params.token, index: 0 ,count: 5 });
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
            const res = await axiosClient("post","post/get_list_posts",{}, {token, index: params.index ,count: 5});
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

export const likePost = createAsyncThunk(
  "post/like_post",
  async (params, thunkAPI) => {
      try {
          const res = await axiosClient(
            "post",
            "/like/like",
            {},
            {token: params.token, id: params.postId}
          );
          return {...res.data, id: params.postId};
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
        const posts = action.payload.data.posts;
        for (let i = 0 ; i < posts.length ; i ++) {
          state.mapData = {...state.mapData, [posts[i].id] : posts[i]}
        }
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
        const posts = action.payload.data.posts;
        for (let i = 0 ; i < posts.length ; i ++) {
          state.mapData = {...state.mapData, [posts[i].id] : posts[i]}
        }
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
        const posts = action.payload.data.posts;
        for (let i = 0 ; i < posts.length ; i ++) {
          state.mapData = {...state.mapData, [posts[i].id] : posts[i]}
        }
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
        const post = action.payload.data;
        const author = post.author;
        const username = author.name;
        state.mapData = {...state.mapData, [post.id] : {...post, author: {...author, username: username}}};
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
        const posts = action.payload.data.posts;
        for (let i = 0 ; i < posts.length ; i ++) {
          state.mapData = {...state.mapData, [posts[i].id] : posts[i]}
        }
      })
      .addCase(appendMyListPost.rejected, (state, action) => {
        state.code = action.payload.code;
        state.loading = false;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const id = action.payload.id;
        const post = state.mapData[id];
        const like = parseInt(action.payload.data.like);
        const is_liked = post.is_liked;
        state.mapData = {...state.mapData, [id] : {...post, is_liked: is_liked === "0" ? "1" : "0" , like}}
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
  selectEmoji,
} = postSlice.actions;
export default postSlice.reducer;
