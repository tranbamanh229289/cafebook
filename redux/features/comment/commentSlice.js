import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";

const initialState = {
    listComment: [],
    loading: false,
    error: "",
    code: "",
};

export const sendComment = createAsyncThunk(
    "comment/sendComment",
    async (params, thunkAPI) => {
        console.log(params);
        try {
            const res = await axiosClient(
                "post",
                "comment/set_comment",
                {},
                {
                    id: params.id,
                    token: params.token,
                    comment: params.comment,
                }
            );
            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getComment = createAsyncThunk(
    "comment/getComment",
    async (params, thunkAPI) => {
        try {
            const res = await axiosClient(
                "post",
                "comment/get_comment",
                {},
                {
                    id: params.id,
                    token: params.token,
                }
            );
            return res.data;
        } catch (error) {
            console.log(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(sendComment.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(sendComment.rejected, (state, action) => {
                console.log("error");
                state.loading = false;
                state.code = action.payload.code;
                state.error = action.payload.message;
            })
            .addCase(sendComment.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.listComment = action.payload.data;
            })
            .addCase(getComment.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(getComment.rejected, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.error = action.payload.message;
                if (action.payload.code == "9994") {
                    state.listComment = [];
                }
            })
            .addCase(getComment.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.listComment = action.payload.data;
            });
    },
});

export default commentSlice.reducer;
