import { useFormik } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

import styles from './LoginForm.module.scss';
import { EmailValue } from "../Login";

interface LoginFormProps {
    onHandleLogin(values: EmailValue): void;
}

function LoginForm(props: LoginFormProps) {

    async function handleSubmit(values: EmailValue) {
        formik.setSubmitting(false);
        props.onHandleLogin(values)
    }

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: handleSubmit,
        validate: values => {
            let errors: any = {};
            if (!values.email) {
                errors.email = 'Email is required';
                return errors;
            }

            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            return errors;
        },
    })

    return (
        <div className={styles.LoginForm}>
            <form
                onSubmit={formik.handleSubmit}
            >

                <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input id="emil" aria-label="email" name="email" type="email" value={formik.values.email} placeholder="email" onChange={formik.handleChange} />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                <Button
                    colorScheme="green"
                    variant='solid'
                    isLoading={formik.isSubmitting}
                    isDisabled={!formik.values.email || !!formik.errors.email}
                    type='submit'
                    data-testid="login-btn"
                >
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm;