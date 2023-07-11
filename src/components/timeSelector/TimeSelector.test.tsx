import { fireEvent, render, screen } from "@testing-library/react";

import TimeSelector from "./TimeSelector";

test('TimeSelector should render correctly', () => {
    const handleTimeStarted = jest.fn();

    render(
        <TimeSelector onHandleStartTimer={handleTimeStarted} />
    );

    const startButton = screen.getByTestId('start-btn');
    expect(startButton).toBeDisabled();

    // assert minutes input
    const minutesInput = screen.getByLabelText('minutes-input') as HTMLInputElement;
    fireEvent.change(minutesInput, { target: { value: '00' } });
    expect(minutesInput.value).toBe('00')
    expect(startButton).toBeDisabled();

    // add accepted value for minutes
    fireEvent.change(minutesInput, { target: { value: '01' } });
    expect(startButton).toBeEnabled();

    // set input value for minutes back to 0
    fireEvent.change(minutesInput, { target: { value: '00' } });
    expect(minutesInput.value).toBe('00')
    expect(startButton).toBeDisabled();

    // assert seconds input
    const secondsInput = screen.getByLabelText('seconds-input') as HTMLInputElement;
    fireEvent.change(secondsInput, { target: { value: '00' } });
    expect(secondsInput.value).toBe('00')
    expect(startButton).toBeDisabled();

    // add accepted value for minutes
    fireEvent.change(secondsInput, { target: { value: '01' } });
    expect(secondsInput).toBeEnabled();

    // assert loop item to be hidden by default
    expect(screen.queryByText('Loop for')).toBeNull();

    // assert repeat input
    const repeatInput = screen.getByLabelText('repeat-input');
    fireEvent.click(repeatInput);

    // expect loop item to be visible
    expect(screen.getByLabelText('loop-input')).toBeInTheDocument();

})