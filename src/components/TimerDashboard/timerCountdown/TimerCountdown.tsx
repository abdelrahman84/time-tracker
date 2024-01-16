import { useSelector } from "react-redux";

import styles from './TimerCountdown.module.scss';
import { Button, Checkbox, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux";
import { setIsLoopEnabled, setLoopCount, setMinutes, setSeconds } from "../../../redux/TimerCountdownReducer";

interface TimerCountdownProps {
    onHandleStartTimer(): void;
}

function TimerCountdown(props: TimerCountdownProps) {
    const seconds = useSelector((state: RootState) => state.timerCountdown.seconds);
    const minutes = useSelector((state: RootState) => state.timerCountdown.minutes);
    const isLoopEnabled = useSelector((state: RootState) => state.timerCountdown.isLoopEnabled);
    const loopCount = useSelector((state: RootState) => state.timerCountdown.loopCount);
    const dispatch: AppDispatch = useAppDispatch();

    const handleSecondsChange = (event: any) => {
        if (event.target.value.length <= 2 && event.target.value >= 0) {
            dispatch(setSeconds(event.target.value))
        };
    }

    const handleMinutesChange = (event: any) => {
        if (event.target.value.length <= 2 && event.target.value >= 0) {
            dispatch(setMinutes(event.target.value));
        };
    }

    const handleToggleLoop = (event: any) => {
        dispatch(setIsLoopEnabled(event.target.checked))
    }

    const handleLoopChange = (event: any) => {
        if (event.target.value.length <= 2 && event.target.value >= 0) {
            dispatch(setLoopCount(event.target.value))
        };
    }

    const handleStart = (): void => {
        props.onHandleStartTimer();
    }

    const isButtonDisabled = (): boolean => {
        return (minutes <= 0) && (seconds <= 0);
    }

    return (
        <Container>
            <div className={styles.timerCountdown}>
                <FormControl>
                    <FormLabel>Input seconds:</FormLabel>
                    <Input type="number" onChange={handleSecondsChange} value={seconds} aria-label="seconds-input" />
                </FormControl>

                <FormControl>
                    <FormLabel>Input minutes</FormLabel>
                    <Input type="number" onChange={handleMinutesChange} value={minutes} aria-label="minutes-input" />
                </FormControl>

                <Checkbox defaultChecked={isLoopEnabled} onChange={handleToggleLoop} aria-label="repeat-input">Repeat</Checkbox>

                {isLoopEnabled && (
                    <FormControl>
                        <FormLabel>Loop for:</FormLabel>
                        <Input type="number" onChange={handleLoopChange} value={loopCount} aria-label="loop-input" />
                    </FormControl>
                )}

                <Button colorScheme="teal" onClick={handleStart} isDisabled={isButtonDisabled()} data-testid="start-btn">Start</Button>
            </div>
        </Container>
    )
}

export default TimerCountdown;