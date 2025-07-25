import { fireEvent, render, screen } from "@testing-library/react";

import TimerCountdown from "./TimerCountdown";

test('TimerCountdown should render correctly', () => {
    const handleTimeStarted = jest.fn();
    const handleSecondsChange = jest.fn();
    const handleMinutesChange = jest.fn();
    const handleHoursChange = jest.fn();
    const handleSetIsLoopEnabled = jest.fn();
    const handleSetLoopCount = jest.fn();
    const handleTimerTypeChange = jest.fn();

    render(
        <TimerCountdown
            onHandleStartTimer={handleTimeStarted}
            onHandleSecondsChange={handleSecondsChange}
            onHandleMinutesChange={handleMinutesChange}
            onHandleHoursChange={handleHoursChange}
            setIsLoopEnabled={handleSetIsLoopEnabled}
            setLoopCount={handleSetLoopCount}
            onTimerTypeChange={handleTimerTypeChange}
        />
    );

    const startButton = screen.getByTestId('start-btn');
    expect(startButton).toBeDisabled();

    // assert minutes select
    const minutesSelect = screen.getByLabelText('minutes-select') as HTMLInputElement;
    fireEvent.change(minutesSelect, { target: { value: "" } });
    expect(handleMinutesChange).toHaveBeenCalled();
    expect(startButton).toBeDisabled();

    // add accepted value for minutes
    fireEvent.change(minutesSelect, { target: { value: 1 } });
    expect(handleMinutesChange).toHaveBeenCalled();
    expect(startButton).toBeEnabled();

    // set minutes back to 0
    fireEvent.change(minutesSelect, { target: { value: "" } });
    expect(startButton).toBeDisabled();

    // assert seconds input
    const secondsSelect = screen.getByLabelText('seconds-select') as HTMLInputElement;
    fireEvent.change(secondsSelect, { target: { value: "" } });
    expect(handleSecondsChange).toHaveBeenCalled();
    expect(startButton).toBeDisabled();

    // add accepted value for seconds
    fireEvent.change(secondsSelect, { target: { value: 3 } });
    expect(startButton).toBeEnabled();

    // assert loop item to be hidden by default
    expect(screen.queryByText('Loop for')).toBeNull();

    // assert repeat checkbox
    const repeatCheckBox = screen.getByLabelText('repeat-checkbox');
    fireEvent.click(repeatCheckBox);
    expect(handleSetIsLoopEnabled).toHaveBeenCalled();
    expect(screen.getByLabelText('loop-input')).toBeInTheDocument();

    // assert repeat input
    const repeatInput = screen.getByLabelText('loop-input') as HTMLInputElement;
    fireEvent.change(repeatInput, { target: { value: 3 } });
    expect(handleSetLoopCount).toHaveBeenCalled();
})