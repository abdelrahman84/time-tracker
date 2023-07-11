import { useState } from "react";

import styles from './TimeSelector.module.scss';

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
        <div className={styles.timeSelector}>
            <div className={styles.inputItem}>
                <label>
                    Input minutes:
                </label>
                <input type="number" onChange={handleMinutesChange} value={minutes} aria-label="minutes-input"></input>
            </div>

            <div className={styles.inputItem}>
                <label>
                    Input seconds:
                </label>
                <input type="number" onChange={handleSecondsChange} value={seconds} aria-label="seconds-input"></input>
            </div>

            <div>
                <label>
                    Repeat:
                </label>
                <input type="checkbox" defaultChecked={isLoopEnabled} onChange={handleToggleLoop} aria-label="repeat-input"></input>
            </div>

            {isLoopEnabled && (
                <div className={styles.inputItem}>
                    <label>
                        Loop for:
                    </label>
                    <input type="number" onChange={handleLoopChange} value={loopCount} aria-label="loop-input"></input>
                </div>
            )}

            <button onClick={handleStart} disabled={isButtonDisabled()} data-testid="start-btn">Start</button>
        </div>
    )
}

export default TimeSelector;