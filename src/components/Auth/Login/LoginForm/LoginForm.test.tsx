import { fireEvent, render, screen, act } from "@testing-library/react"

import LoginForm from "./LoginForm"

test('Login should render correctly', async () => {
    const handleLogin = jest.fn();
    const handleGuest = jest.fn();

    render(
        <LoginForm onHandleLogin={handleLogin} onHandleGuest={handleGuest} />
    )

    const loginButton = screen.getByTestId('login-btn');
    fireEvent.click(loginButton);
    expect(handleLogin).not.toHaveBeenCalled();

    const emailInput = screen.getByLabelText('email') as HTMLInputElement;

    await act(() => {
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    });

    expect(emailInput.value).toBe('test@test.com');

    await act(() => {
        fireEvent.click(loginButton);
    })
    expect(handleLogin).toHaveBeenCalled();

    const guestButton = screen.getByTestId('guest-btn');
    fireEvent.click(guestButton);
    expect(handleGuest).toHaveBeenCalled();
})