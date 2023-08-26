import { fireEvent, render, screen, act } from "@testing-library/react";

import RegisterForm from "./RegisterForm";

test('RegisterForm should render correctly', async () => {
    const handleRegister = jest.fn();

    render(
        <RegisterForm onHandleRegister={handleRegister} />
    )

    await act(() => {
        fireEvent.click(screen.getByTestId("register-btn"));
    })
    expect(handleRegister).not.toHaveBeenCalled();

    const nameInput = screen.getByLabelText('name') as HTMLInputElement;
    await act(() => {
        fireEvent.change(nameInput, { target: { value: 'test name' } });
    });
    expect(nameInput.value).toBe('test name');

    const emailInput = screen.getByLabelText('email') as HTMLInputElement;
    await act(() => {
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    });
    expect(emailInput.value).toBe('test@test.com');

    const passwordInput = screen.getByLabelText('password') as HTMLInputElement;
    await act(() => {
        fireEvent.change(passwordInput, { target: { value: '1234qQwW3#' } });
    });
    expect(passwordInput.value).toBe('1234qQwW3#');

    await act(() => {
        fireEvent.click(screen.getByTestId("register-btn"));
    });
    expect(handleRegister).toHaveBeenCalled();
})