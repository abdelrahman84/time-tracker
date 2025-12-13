import { fireEvent, render, screen } from '@testing-library/react';

import RegisterForm from './RegisterForm';

test('RegisterForm should render correctly', () => {
  const handleRegister = jest.fn();

  render(<RegisterForm onHandleRegister={handleRegister} isDisabled={false} />);

  fireEvent.click(screen.getByTestId('register-btn'));
  expect(handleRegister).not.toHaveBeenCalled();

  const nameInput = screen.getByLabelText('name') as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: 'test name' } });
  expect(nameInput.value).toBe('test name');

  const emailInput = screen.getByLabelText('email') as HTMLInputElement;

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  expect(emailInput.value).toBe('test@test.com');

  const passwordInput = screen.getByLabelText('password') as HTMLInputElement;
  fireEvent.change(passwordInput, { target: { value: '1234qQwW3#' } });
  expect(passwordInput.value).toBe('1234qQwW3#');

  fireEvent.click(screen.getByTestId('register-btn'));
  expect(handleRegister).toHaveBeenCalled();
});
