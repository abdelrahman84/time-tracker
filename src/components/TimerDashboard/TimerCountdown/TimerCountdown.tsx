import { ReactNode, useEffect, useState } from "react";
import { Button, Checkbox, Container, FormControl, FormErrorMessage, FormLabel, Input, Select } from "@chakra-ui/react";

import styles from './TimerCountdown.module.scss';

interface TimerCountdownProps {
    onHandleStartTimer(): void;
    onHandleSecondsChange(seconds: number): void;
    onHandleMinutesChange(minutes: number): void;
    setIsLoopEnabled(checked: boolean): void;
    setLoopCount(loopCount: number): void;
    onTimerTypeChange(): void;
    seconds?: number;
    minutes?: number;
    initialLoops?: number;
    isLoopEnabled?: boolean;
}

function TimerCountdown(props: TimerCountdownProps) {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [isLoopEnabled, setIsLoopEnabled] = useState(false);
    const [loopCount, setLoopCount] = useState(1);

    useEffect(() => {
        if (props.seconds) {
            setSeconds(props.seconds);
        }

        if (props.minutes) {
            setMinutes(props.minutes);
        }

        if (props.isLoopEnabled) {
            setIsLoopEnabled(props.isLoopEnabled);
        }

        if (props.initialLoops) {
            setLoopCount(props.initialLoops);
        }

    }, []);

    const handleSecondsChange = (event: any) => {
        setSeconds(event.target.value);
        props.onHandleSecondsChange(event.target.value);
    }

    const handleMinutesChange = (event: any) => {
        setMinutes(event.target.value);
        props.onHandleMinutesChange(event.target.value);
    }

    const handleToggleLoop = (event: any) => {
        setIsLoopEnabled(event.target.checked);
        props.setIsLoopEnabled(event.target.checked)
    }

    const handleLoopChange = (event: any) => {
        if (event.target.value.length <= 2 && event.target.value >= 0) {
            setLoopCount(event.target.value);
            props.setLoopCount(event.target.value)
        };
    }

    const handleStart = (): void => {
        if (isLoopEnabled && loopCount <= 0) {
            return;
        }

        props.onHandleStartTimer();
    }

    const isButtonDisabled = (): boolean => {
        return (minutes <= 0) && (seconds <= 0);
    }

    const timerOptions = (): ReactNode => {
        const timerOptions = Array.from(
            { length: 60 },
            (value, index) => 1 + index * 1
        );

        return timerOptions.map(option => {
            return <option value={option} key={option}>{option}</option>
        });
    }

    const handleTimerTypeChange = (): void => {
        props.onHandleSecondsChange(0);
        props.onHandleMinutesChange(0);
        props.setIsLoopEnabled(false);
        props.setLoopCount(1);
        props.onTimerTypeChange();
    }

    return (
        <Container>
            <div className={styles.timerCountdown}>
                <FormControl>
                    <FormLabel>Seconds</FormLabel>
                    <Select
                        value={seconds}
                        onChange={handleSecondsChange}
                        placeholder="Select seconds"
                        aria-label="seconds-select"
                    >
                        {timerOptions()}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Minutes</FormLabel>
                    <Select
                        value={minutes}
                        onChange={handleMinutesChange}
                        placeholder="Select minutes"
                        aria-label="minutes-select">
                        {timerOptions()}
                    </Select>
                </FormControl>

                <Checkbox defaultChecked={isLoopEnabled} onChange={handleToggleLoop} aria-label="repeat-checkbox">Repeat</Checkbox>

                {isLoopEnabled && (
                    <FormControl isInvalid={loopCount <= 0}>
                        <FormLabel>Loop for:</FormLabel>
                        <Input type="number" onChange={handleLoopChange} value={loopCount} aria-label="loop-input" />
                        <FormErrorMessage>Loop count must be greater than 0</FormErrorMessage>
                    </FormControl>
                )}

                <Button colorScheme="teal" onClick={handleStart} isDisabled={isButtonDisabled()} data-testid="start-btn">Start</Button>
                <Button colorScheme="red" variant="solid" onClick={handleTimerTypeChange}>Change timer type</Button>
            </div>
        </Container>
    )
}

export default TimerCountdown;