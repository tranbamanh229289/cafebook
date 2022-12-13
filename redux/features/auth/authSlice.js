import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosClient from '../../../utils/axiosClient'
import { loginMessage } from '../../../utils/message/responseMessage'

const initialState = {
    data:{},
    loading: false,
    error: {}, 
    code: '',
}

export const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
    const newParams = {
        phonenumber: params.phoneNumber,
        password: params.password
    }
    try {
        const res = await axiosClient('post', '/auth/login', {}, newParams)
        return res
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response.data)
    } 
})

export const signup = createAsyncThunk('auth/signup', async (params, thunkAPI) => {
    const res = await axiosClient('post', '/auth/signup', params=params)
    return res
})

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        getAccount: (state) => state
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            return {
                ...state,
                loading: true
            }
        }).addCase(login.rejected, (state, action) => {
            let newState = {...state}
            newState.loading = false
            newState.code = action.payload.code
            if(action.payload.code == 1004){
                if(action.payload.details == "phoneNumber") {
                    newState.error = loginMessage.USER_INVALID
                }
                if(action.payload.details == "password") {
                    newState.error = loginMessage.PASSWORD_INVALID
                }
            }
            return newState
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.code = action.payload.code
            state.data = action.payload.data
        })
    }
})

export const {getAccount} = authSlice.actions
export default authSlice.reducer