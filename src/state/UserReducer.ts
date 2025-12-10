import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

import { User } from '../types/user';
import client from '../utils/client';
import apiRoutes from '../apiRoutes';
import { RegisterFormValues } from '../components/Auth/Register/RegisterForm/RegisterForm';
import routes from '../routes';
import { LoginValues } from '../components/Auth/Login/Login';

export const register = createAsyncThunk(
  'user/register',
  async (
    {
      values,
      navigate,
    }: { values: RegisterFormValues; navigate: NavigateFunction },
    thunkAPI,
  ) => {
    try {
      const response = await client.post(apiRoutes.user.register, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate(routes.timerDashboard.main);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to register');
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async ({ values }: { values: LoginValues }, thunkAPI) => {
    try {
      const response = await client.post(apiRoutes.user.login, {
        email: values.email,
        password: values.password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to login');
    }
  },
);

export interface UserInitialState {
  user: User;
  loadingUser: boolean;
  error: string | null;
}

const initialState: UserInitialState = {
  user: {
    id: -1,
    name: '',
    email: '',
    email_verified: false,
    created_at: new Date().toISOString(),
    access_tokens: { access: '', refresh: '' },
  },
  loadingUser: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserInitialState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: any) => {
        state.loadingUser = false;
        state.user = action.payload;

        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(login.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.loadingUser = false;
        state.user = action.payload;

        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
