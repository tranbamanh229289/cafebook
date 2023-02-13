import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../utils/axiosClient";

const initialState = {
    user: {
        username: "",
        gender: "",
        birthday: "",
        avatar: "",
    },
    account: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        birthday: new Date(),
        gender: 1,
    },
    verifyCode: "",
    isVerified: false,
    loading: false,
    error: "",
    code: "",
    data: {},
};

export const login = createAsyncThunk(
    "auth/login",
    async (params, thunkAPI) => {
        const newParams = {
            phonenumber: params.phoneNumber,
            password: params.password,
        };
        try {
            const res = await axiosClient("post", "/auth/login", {}, newParams);
            return res.data;
        } catch (error) {
            console.log(error.response.data)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (params, thunkAPI) => {
        const newParams = {
            token: params.token
        };
        try {
            const res = await axiosClient("post", "/auth/logout", {}, newParams);
            return res.data;
        } catch (error) {
            console.log(error.response.data)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async (params, thunkAPI) => {
        const newParams = {
            phonenumber: params.phoneNumber,
            password: params.password,
            firstname: params.firstName,
            lastname: params.lastName,
            gender: params.gender,
            birthday: params.birthday,
        };
        console.log(newParams);
        try {
            const res = await axiosClient(
                "post",
                "/auth/signup",
                {},
                newParams
            );
            return res.data;
        } catch (error) {
            console.log(error.response.data)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getVerifyCode = createAsyncThunk(
    "auth/getVerifyCode",
    async (params, thunkAPI) => {
        const state = thunkAPI.getState();
        try {
            const res = await axiosClient(
                "post",
                "/auth/get_verify_code",
                {},
                {
                    phonenumber: state.auth.account.phoneNumber,
                }
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const checkVerifyCode = createAsyncThunk(
    "auth/checkVerifyCode",
    async (params, thunkAPI) => {
        const state = thunkAPI.getState();
        try {
            const res = await axiosClient(
                "post",
                "auth/check_verify_code",
                {},
                {
                    phonenumber: state.auth.account.phoneNumber,
                    code_verify: params.verifyCode,
                }
            );
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        inputAccount: (state, action) => {
            state.account = {
                ...state.account,
                ...action.payload,
            };
        },
        resetAccount: (state) => {
            state.account = {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                password: "",
                birthday: new Date(),
                gender: 1,
            };
        },
        resetError: (state) => {
            state.code = "";
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.data = {
                    id: action.payload.data.id,
                    token: action.payload.data.token,
                    username: action.payload.data.username,
                    birthday: action.payload.data.birthday,
                    gender: action.payload.data.gender,
                    avatar: action.payload.data.avatar,
                };
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.rejected, (state, action) => {
                console.log("error", action.payload);
                state.loading = false;
                state.code = action.payload.code;
                state.error = action.payload.message;
            })
            .addCase(signup.fulfilled, (state, action) => {
                console.log("success", action.payload);
                state.loading = false;
                state.code = action.payload.code;
                state.verifyCode = action.payload.data.verifyCode;
                state.isVerified = action.payload.data.isVerified;
                state.user = {
                    username: `${state.account.firstName} ${state.account.lastName}`,
                    gender: state.account.gender,
                    birthday: state.account.birthday,
                    avatar: null,
                }
            })
            .addCase(getVerifyCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVerifyCode.rejected, (state, action) => {
                console.log(action.payload);
                state.loading = false;
            })
            .addCase(getVerifyCode.fulfilled, (state, action) => {
                console.log("success");
                state.loading = false;
                state.verifyCode = action.payload.data.verifyCode;
            })
            .addCase(checkVerifyCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkVerifyCode.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(checkVerifyCode.fulfilled, (state, action) => {
                console.log("check ok");
                state.loading = false;
                state.code = action.payload.code;
                state.isVerified = true;
                state.data.token = action.payload.data.token;
            })
            .addCase(logout.pending, (state)=>{
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action)=>{
                state.loading = false;
                state.account = {};
                state.code = "";
                state.data = {};
                state.user = {};
                state.isVerified = false;
                state.verifyCode = "";
                state.error = "";
            })
            .addCase(logout.rejected , (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
            });
    },
});

export const { inputAccount, resetAccount, resetError } = authSlice.actions;
export default authSlice.reducer;
