import { useState } from "react";
import TimeSelector from "../timeSelector";

function TimerDashboard() {

    const [timerStarted, setTimerStarted] = useState(false);

    const handleTimeStarted = () => {
        setTimerStarted(true)
    }

    return (
        <div>
            <TimeSelector onHandleStartTimer={handleTimeStarted} />
        </div>
    )
}

export default TimerDashboard;