import { fireEvent, render, screen } from "@testing-library/react"

import LoginForm from "./LoginForm"

test('Login should render correctly', () => {
    const handleLogin = jest.fn();
    const handleGuest = jest.fn();

    render(
        <LoginForm onHandleLogin={handleLogin} onHandleGuest={handleGuest} />
    )

    const loginButton = screen.getByTestId('login-btn');
    fireEvent.click(loginButton);
    expect(handleLogin).toHaveBeenCalled();

    const guestButton = screen.getByTestId('guest-btn');
    fireEvent.click(guestButton);
    expect(handleGuest).toHaveBeenCalled();
})