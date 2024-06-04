import { ChangeEvent, useState } from "react";
import { Container, Select } from "@chakra-ui/react";

import TimerCountdown from "./TimerCountdown";

import styles from './TimerDashboard.module.scss';
import TimerDisplay from "./TimerDisplay";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../redux";
import { setIsLoopEnabled, setLoopCount, setMinutes, setSeconds } from "../../redux/TimerCountdownReducer";
import TimerStopWatch from "./TimerStopWatch";

export const COUNTDOWN = 'countdown';
export const STOPWATCH = 'stopwatch';


function TimerDashboard() {
    const seconds = useSelector((state: RootState) => state.timerCountdown.seconds);
    const minutes = useSelector((state: RootState) => state.timerCountdown.minutes);
    const loopCount = useSelector((state: RootState) => state.timerCountdown.loopCount);
    const isLoopEnabled = useSelector((state: RootState) => state.timerCountdown.isLoopEnabled);
    const [timerEnabled, setTimerEnabled] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    const dispatch: AppDispatch = useAppDispatch();

    const handleTimeStarted = () => {
        setTimerEnabled(true)
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

    const handleTimerFinished = () => {
        setTimerEnabled(false);
    }

    const handleTimerTypeChange = () => {
        setSelectedType('');
    }

    return (
        <Container className={styles.timerDashboard}>
            {!selectedType && (
                <div className={styles.changeTypeContainer}>
                    <Select
                        value={selectedType}
                        onChange={handleSelectTypeChange}
                        placeholder="Select type">
                        <option value={COUNTDOWN}>countdown</option>
                        <option value={STOPWATCH}>stopwatch</option>
                    </Select>
                </div>
            )}


            {selectedType === COUNTDOWN && timerEnabled === false &&
                <TimerCountdown
                    onHandleStartTimer={handleTimeStarted}
                    onHandleSecondsChange={handleSecondsChange}
                    onHandleMinutesChange={handleMinutesChange}
                    setIsLoopEnabled={handleSetIsLoopEnabled}
                    setLoopCount={handleSetLoopCount}
                    seconds={seconds}
                    minutes={minutes}
                    initialLoops={loopCount}
                    isLoopEnabled={isLoopEnabled}
                    onTimerTypeChange={handleTimerTypeChange}
                />
            }

            {selectedType === STOPWATCH && timerEnabled === false &&
                <TimerStopWatch
                />}


            {timerEnabled &&
                <TimerDisplay
                    type={selectedType}
                    seconds={seconds}
                    minutes={minutes}
                    initialLoops={loopCount}
                    onHandleTimerFinished={handleTimerFinished}
                />
            }

        </Container>
    )
}

export default TimerDashboard;