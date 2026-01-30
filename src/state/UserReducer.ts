import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

import { User } from '../types/user';
import client from '../utils/client';
import apiRoutes from '../apiRoutes';
import { RegisterFormValues } from '../components/Auth/Register/RegisterForm/RegisterForm';
import routes from '../routes';
import { LoginValues } from '../components/Auth/Login/Login';
import { AuthApi } from '../api/authApi';

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

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, thunkAPI) => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        return thunkAPI.rejectWithValue('No user found');
      }

      const user: User = JSON.parse(userStr);
      const refreshTokenValue = user.access_tokens?.refresh;

      if (!refreshTokenValue) {
        return thunkAPI.rejectWithValue('No refresh token found');
      }

      const response = await AuthApi.refreshToken(refreshTokenValue);

      // Update the user with new tokens
      const updatedUser: User = {
        ...user,
        access_tokens: {
          access: response.data.access,
          refresh: refreshTokenValue, // Keep the same refresh token
        },
      };

      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to refresh token');
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
        // Extract only user object, ignoring other keys
        const userData = action.payload.user
          ? typeof action.payload.user === 'string'
            ? JSON.parse(action.payload.user)
            : action.payload.user
          : action.payload;
        state.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
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
        // Extract only user object from response, ignoring refresh/access keys
        const userData = action.payload.user
          ? typeof action.payload.user === 'string'
            ? JSON.parse(action.payload.user)
            : action.payload.user
          : action.payload;
        state.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message || 'Something went wrong';
      });

    builder
      .addCase(refreshToken.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action: any) => {
        state.loadingUser = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message || 'Failed to refresh token';
        // Clear user data if refresh fails
        localStorage.removeItem('user');
        state.user = initialState.user;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
