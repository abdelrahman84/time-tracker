import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';

import styles from './ResendEmailForm.module.scss';

export interface ResendEmailValues {
  email: string;
}

interface ResendEmailFormProps {
  onHandleSubmit(values: ResendEmailValues): void;
}

function ResendEmailForm(props: ResendEmailFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: props.onHandleSubmit,
    validate: (values) => {
      let errors: any = {};

      if (!values.email) {
        errors.email = 'Email is required';
        return errors;
      }

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.resendEmailForm}>
      <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
        <Input
          aria-label="email"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          placeholder="Please enter your email address"
          onChange={formik.handleChange}
        ></Input>
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="green"
        variant="solid"
        isLoading={formik.isSubmitting}
        type="submit"
        isDisabled={formik.isSubmitting}
        data-testid="submit-btn"
      >
        Resend verification email
      </Button>
    </form>
  );
}

export default ResendEmailForm;
