import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../types/user';
import client from '../utils/client';
import apiRoutes from '../apiRoutes';
import { RegisterFormValues } from '../components/Auth/Register/RegisterForm/RegisterForm';

export const register = createAsyncThunk("user/register",
    async (values: RegisterFormValues, thunkAPI) => {
        try {
            const response = await client.post(apiRoutes.user.register, { name: values.name, email: values.email, password: values.password });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to register")
        }
    }
)

export interface UserInitialState {
    user: User,
    loading: boolean,
    error: string | null,
}

const initialState: UserInitialState = {
    user: { id: -1, name: '', email: '', email_verified: false, created_at: new Date().toISOString() },
    loading: false, error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(register.fulfilled, (state, action: any) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export default userSlice.reducer