import { useFormik } from 'formik';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export interface PasswordValues {
  password: string;
}

interface PasswordFormProps {
  onHandlePassword(values: PasswordValues): Promise<void>;
  onHandleForgotPassword(): void;
}

function PasswordForm(props: PasswordFormProps) {
  async function handleSubmit(values: PasswordValues) {
    try {
      await props.onHandlePassword(values);
    } finally {
      formik.setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      let errors: any = {};
      if (!values.password) {
        errors.password = 'Password is required';
        return errors;
      }

      return errors;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={!!formik.errors.password && formik.touched.password}
        >
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            aria-label="password"
            name="password"
            type="password"
            value={formik.values.password}
            placeholder="password"
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="blue"
          variant="link"
          onClick={props.onHandleForgotPassword}
        >
          Forgot password?
        </Button>

        <Button
          colorScheme="green"
          variant="solid"
          isLoading={formik.isSubmitting}
          isDisabled={!formik.values.password || !!formik.errors.password}
          type="submit"
          data-testid="password-btn"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PasswordForm;
