import { ChangeEvent, useState } from "react";
import { Container, Select } from "@chakra-ui/react";

import TimerCountdown from "./TimerCountdown";

import styles from './TimerDashboard.module.scss';
import TimerDisplay from "./TimerDisplay";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../redux";
import { setIsLoopEnabled, setLoopCount, setMinutes, setSeconds } from "../../redux/TimerCountdownReducer";

export const COUNTDOWN = 'countdown';
export const STOPWATCH = 'stopwatch';


function TimerDashboard() {
    const seconds = useSelector((state: RootState) => state.timerCountdown.seconds);
    const minutes = useSelector((state: RootState) => state.timerCountdown.minutes);
    const loopCount = useSelector((state: RootState) => state.timerCountdown.loopCount);
    const [timerStarted, setTimerStarted] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    const dispatch: AppDispatch = useAppDispatch();

    const handleTimeStarted = () => {
        setTimerStarted(true)
    }

    const handleSelectTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value)
    }

    const handleSecondsChange = (seconds: number) => {
        dispatch(setSeconds(seconds));
    }

    const handleMinutesChange = (minutes: number) => {
        dispatch(setMinutes(minutes));
    }

    const handleSetIsLoopEnabled = ($status: boolean) => {
        dispatch(setIsLoopEnabled($status));
    }

    const handleSetLoopCount = (loopCount: number) => {
        dispatch(setLoopCount(loopCount))
    }

    return (
        <Container className={styles.timerDashboard}>
            {!selectedType && (
                <Select
                    value={selectedType}
                    onChange={handleSelectTypeChange}
                    placeholder="Select type">
                    <option value={COUNTDOWN}>countdown</option>
                    <option value={STOPWATCH}>stopwatch</option>
                </Select>
            )}


            {selectedType === COUNTDOWN && timerStarted === false &&
                <TimerCountdown
                    onHandleStartTimer={handleTimeStarted}
                    onHandleSecondsChange={handleSecondsChange}
                    onHandleMinutesChange={handleMinutesChange}
                    setIsLoopEnabled={handleSetIsLoopEnabled}
                    setLoopCount={handleSetLoopCount}
                />
            }


            {timerStarted &&
                <TimerDisplay
                    type={selectedType}
                    seconds={seconds}
                    minutes={minutes}
                    initialLoops={loopCount}
                />
            }

        </Container>
    )
}

export default TimerDashboard;