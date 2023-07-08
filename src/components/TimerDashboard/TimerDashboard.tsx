import { useState } from "react";
import TimeSelector from "../timeSelector";

function TimerDashboard() {

    const [timerStarted, setTimerStarted] = useState(false);

    const onHandleTimeStarted = () => {
        setTimerStarted(true)
    }

    return (
        <div>
            <TimeSelector handleStartTimer={onHandleTimeStarted}/>
        </div>
    )
}

export default TimerDashboard;