import { fireEvent, render, screen } from "@testing-library/react"

import TimerDisplay from "./TimerDisplay"
import { COUNTDOWN } from "../TimerDashboard"


test('TimerDisplay should display props correctly', () => {
    const handleTimerFinished = jest.fn();

    render(
        <TimerDisplay
            seconds={1}
            minutes={2}
            type={COUNTDOWN}
            initialLoops={2}
            onHandleTimerFinished={handleTimerFinished}
        />
    )

    expect(screen.getByText('Pause')).toBeInTheDocument();

    const timerButton = screen.getByTestId('timer-btn');
    expect(timerButton).toBeInTheDocument();
    fireEvent.click(timerButton);

    expect(screen.getByText('Start')).toBeInTheDocument();

    expect(screen.getByText('2 of 2 loops remaining')).toBeInTheDocument();

    // assert minutes
    expect(screen.getByText('02')).toBeInTheDocument();

    // assert seconds
    expect(screen.getByText('01')).toBeInTheDocument();
});

