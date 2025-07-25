import { act, fireEvent, render, screen } from "@testing-library/react"

import TimerDisplay from "./TimerDisplay"
import { COUNTDOWN } from "../TimerDashboard"

test('TimerDisplayCountDown should render correctly', async () => {
    const handleTimerFinished = jest.fn();

    render(
        <TimerDisplay
            seconds={1}
            minutes={0}
            hours={0}
            type={COUNTDOWN}
            onHandleTimerFinished={handleTimerFinished}
        />
    )

    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(screen.getByText('Timer countdown Finished')).not.toBeNull();

    await act(() => {
        fireEvent.keyDown(screen.getByText('Timer countdown Finished'), {
            key: 'Escape',
            code: 'Escape'
        });
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(screen.queryByText('Timer countdown Finished')).toBeNull();

    expect(handleTimerFinished).toHaveBeenCalled();
});