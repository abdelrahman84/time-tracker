import { ChangeEvent, useState } from "react";
import TimerCountdown from "./timerCountdown";
import { Container, Select } from "@chakra-ui/react";

import styles from './TimerDashboard.module.scss';

const COUNTDOWN = 'countdown';
const STOPWATCH = 'stopwatch';

function TimerDashboard() {

    const [timerStarted, setTimerStarted] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    const handleTimeStarted = () => {
        setTimerStarted(true)
    }

    const handleSelectTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value)
    }

    return (
        <Container className={styles.timerDashboard}>
            <Select
                value={selectedType}
                onChange={handleSelectTypeChange}
                placeholder="Select type">
                <option value={COUNTDOWN}>countdown</option>
                <option value={STOPWATCH}>stopwatch</option>
            </Select>

            {selectedType === COUNTDOWN &&
                <TimerCountdown onHandleStartTimer={handleTimeStarted} />
            }
        </Container>
    )
}

export default TimerDashboard;