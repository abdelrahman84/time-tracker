import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TimerCountdownInitialState {
  seconds: number;
  minutes: number;
  hours: number;
  isLoopEnabled: boolean;
  loopCount: number;
}

const initialState: TimerCountdownInitialState = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  isLoopEnabled: false,
  loopCount: 1,
};

export const timerCountdownSlice = createSlice({
  name: 'timerCountdown',
  initialState,
  reducers: {
    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },
    setMinutes: (state, action: PayloadAction<number>) => {
      state.minutes = action.payload;
    },
    setHours: (state, action: PayloadAction<number>) => {
      state.hours = action.payload;
    },
    setIsLoopEnabled: (state, action: PayloadAction<boolean>) => {
      state.isLoopEnabled = action.payload;
    },
    setLoopCount: (state, action: PayloadAction<number>) => {
      state.loopCount = action.payload;
    },
  },
});

export const {
  setSeconds,
  setMinutes,
  setHours,
  setIsLoopEnabled,
  setLoopCount,
} = timerCountdownSlice.actions;

export default timerCountdownSlice.reducer;
