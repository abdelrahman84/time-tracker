import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

interface ForgotPasswordFormProps {
  inputEmail: string;
  isDisabled: boolean;
  onHandleForgotSubmit(): void;
}

function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  async function handleSubmit() {
    props.onHandleForgotSubmit();
  }

  return (
    <div>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          id="email"
          aria-label="email"
          name="email"
          type="email"
          value={props.inputEmail}
          placeholder="email"
          disabled
        />
      </FormControl>

      <Button
        colorScheme="green"
        variant="solid"
        isLoading={props.isDisabled}
        isDisabled={props.isDisabled}
        type="submit"
        data-testid="forgot-password-btn"
        onClick={handleSubmit}
      >
        Send reset password email
      </Button>
    </div>
  );
}

export default ForgotPasswordForm;
