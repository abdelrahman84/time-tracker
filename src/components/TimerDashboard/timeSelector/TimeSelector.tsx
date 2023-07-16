import { useState } from "react";

import styles from './TimeSelector.module.scss';
import { Button, Checkbox, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface TimeSelectorProps {
    onHandleStartTimer(): void;
}

function TimeSelector(props: TimeSelectorProps) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isLoopEnabled, setIsLoopEnabled] = useState(false);
    const [loopCount, setLoopCount] = useState(0);

    const handleMinutesChange = (event: any) => {
        if (event.target.value.length <= 2 && event.target.value >= 0) {
            setMinutes(event.target.value)
        };
    }

    const handleSecondsChange = (event: any) => {
        if (event.target.value.length <= 2 && event.target.value >= 0) {
            setSeconds(event.target.value)
        };
    }

    const handleToggleLoop = (event: any) => {
        setIsLoopEnabled(!isLoopEnabled)
    }

    const handleLoopChange = (event: any) => {
        if (event.target.value.length <= 2 && event.target.value >= 0) {
            setLoopCount(event.target.value)
        };
    }

    const handleStart = (): void => {
        // tbd set minutes, seconds, loop count
        props.onHandleStartTimer();
    }

    const isButtonDisabled = (): boolean => {
        return (minutes <= 0) && (seconds <= 0);
    }

    return (
        <Container>
            <div className={styles.timeSelector}>
                <FormControl>
                    <FormLabel>Input minutes</FormLabel>
                    <Input type="number" onChange={handleMinutesChange} value={minutes} aria-label="minutes-input" />
                </FormControl>

                <FormControl>
                    <FormLabel>Input seconds:</FormLabel>
                    <Input type="number" onChange={handleSecondsChange} value={seconds} aria-label="seconds-input" />
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

export default TimeSelector;