import { useState } from "react";

import styles from './TimeSelector.module.scss';


function TimeSelector() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isLoopEnabled, setIsLoopEnabled] = useState(false);
    const [loopCount, setLoopCount] = useState(0);

    const handleMinutesChange = (event: any) => {
        if (event.target.value.length <= 2) {
            setMinutes(event.target.value)
        };
    }

    const handleSecondsChange = (event: any) => {
        if (event.target.value.length <= 2) {
            setSeconds(event.target.value)
        };
    }

    const handleToggleLoop = (event: any) => {
        setIsLoopEnabled(!isLoopEnabled)
    }

    const handleLoopChange = (event: any) => {
        if (event.target.value.length <= 2) {
            setLoopCount(event.target.value)
        };
    }

    const handleStart = (): void => {
    }

    const isButtonDisabled = (): boolean => {
        return (!minutes || minutes === 0) && (!seconds || seconds === 0);
    }

    return (
        <div className={styles.timeSelector}>
            <div className={styles.inputItem}>
                <label>
                    Input minutes:
                </label>
                <input type="number" onChange={handleMinutesChange} value={minutes}></input>
            </div>

            <div className={styles.inputItem}>
                <label>
                    Input seconds:
                </label>
                <input type="number" onChange={handleSecondsChange} value={seconds}></input>
            </div>

            <div>
                <label>
                    Repeat:
                </label>
                <input type="checkbox" defaultChecked={isLoopEnabled} onChange={handleToggleLoop}></input>
            </div>

            {isLoopEnabled && (
                <div className={styles.inputItem}>
                    <label>
                        Loop for:
                    </label>
                    <input type="number" onChange={handleLoopChange} value={loopCount}></input>
                </div>
            )}

            <button onClick={handleStart} disabled={isButtonDisabled()}>Start</button>
        </div>
    )
}

export default TimeSelector;