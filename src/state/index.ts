import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import UserReducer from "./UserReducer";
import TimerCountdownReducer from "./TimerCountdownReducer";

export const store = configureStore({
    reducer: {
        user: UserReducer,
        timerCountdown: TimerCountdownReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
