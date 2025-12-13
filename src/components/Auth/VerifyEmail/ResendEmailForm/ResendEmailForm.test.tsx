import { fireEvent, render, screen } from '@testing-library/react';
import ResendEmailForm from './ResendEmailForm';

test('ResendEmailForm should render correctly', async () => {
  const handleSubmit = jest.fn();

  render(<ResendEmailForm onHandleSubmit={handleSubmit} />);

  // test invalid input
  const emailInput = screen.getByLabelText('email') as HTMLInputElement;
  await (() => {
    fireEvent.change(emailInput, { target: { value: 'wrong_input' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
  });

  expect(handleSubmit).not.toHaveBeenCalled();

  // test correct input
  await (() => {
    fireEvent.change(emailInput, {
      target: { value: 'correct_input@test.com' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
  });

  expect(handleSubmit).toHaveBeenCalled();
});
