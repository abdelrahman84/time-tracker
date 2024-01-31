import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"

import TimerDisplay from "./TimerDisplay"
import { COUNTDOWN } from "../TimerDashboard"


test('TimerDisplay should render correctly', () => {

    render(
        <TimerDisplay
            seconds={1}
            minutes={2}
            type={COUNTDOWN}
            initialLoops={2}
        />
    )

    const timerButton = screen.getByTestId('timer-btn');
    expect(timerButton).toBeInTheDocument();

    expect(screen.getByText('Start')).toBeInTheDocument();

    fireEvent.click(timerButton);
    expect(screen.getByText('Pause')).toBeInTheDocument();

    expect(screen.getByText('2 of 2 loops remaining')).toBeInTheDocument();
})