import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { baseURL } from "../../../utils/axiosClient";

const initialState = {
  data: [],
  loading: false,
  code: "",
};

export const getSavedSearch = createAsyncThunk(
  "search/get_saved_search",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}search/get_saved_search`,
        {},
        {
          params: {
            token: params.token,
            index: params.index,
            count: 40,
          },
        }
      );
      // console.log(res.data);
      return res.data;
    } catch (err) {
      // console.log(err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const appendSavedSearch = createAsyncThunk(
  "search/append_saved_search",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}search/get_saved_search`,
        {},
        {
          params: {
            token: params.token,
            index: params.index,
            count: 10,
          },
        }
      );
      // console.log(res.data);
      return res.data;
    } catch (err) {
      // console.log(err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteSavedSearch = createAsyncThunk(
  "search/del_saved_search",
  async (params, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}search/del_saved_search`,
        {},
        {
          params: {
            token: params.token,
            all: params.all,
            search_id: params.search_id,
          },
        }
      );
      // console.log(res.data);
      return res.data;
    } catch (err) {
      // console.log(err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
      resetSearch: (state) => {
        state.data = [];
        state.loading = false;
        state.code = "";
      }
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(getSavedSearch.pending, (state) => {
          state.loading = true;
        })
        .addCase(getSavedSearch.fulfilled, (state, action) => {
          state.data = action.payload.data;
          // console.log(state.data);
          state.loading = false;
        })
        .addCase(getSavedSearch.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(deleteSavedSearch.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteSavedSearch.fulfilled, (state, action) => {
          if(action.payload.data === null){
            state.data = []
          }else{
            const idToDelete = action.payload.data
            state.data= state.data.filter(obj => obj.id !== idToDelete);
          }
          state.loading = false;
        })
        .addCase(deleteSavedSearch.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(appendSavedSearch.pending, (state) => {
          state.loading = true;
        })
        .addCase(appendSavedSearch.fulfilled, (state, action) => {
          state.data = [...state.data,...action.payload.data];
          state.loading = false;
        })
        .addCase(appendSavedSearch.rejected, (state, action) => {
          state.loading = false;
        });
    },
  });
  
  export const { resetSearch } = searchSlice.actions;
  export default searchSlice.reducer;
