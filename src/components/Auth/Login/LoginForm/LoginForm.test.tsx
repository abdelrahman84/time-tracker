import { fireEvent, render, screen } from '@testing-library/react';

import LoginForm from './LoginForm';

test('Login should render correctly', async () => {
  const handleLogin = jest.fn();

  render(<LoginForm onHandleLogin={handleLogin} />);

  const loginButton = screen.getByTestId('login-btn');
  fireEvent.click(loginButton);
  expect(handleLogin).not.toHaveBeenCalled();

  const emailInput = screen.getByLabelText('email') as HTMLInputElement;

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

  expect(emailInput.value).toBe('test@test.com');

  fireEvent.click(loginButton);
  expect(handleLogin).toHaveBeenCalled();
});
