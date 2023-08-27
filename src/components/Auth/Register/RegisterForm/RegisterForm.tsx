import { useEffect } from "react";
import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from "formik";

import styles from './RegisterForm.module.scss';

export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

interface RegisterFormProps {
    onHandleRegister(values: RegisterFormValues): void;
    isDisabled: boolean;
}

function RegisterForm(props: RegisterFormProps) {

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get("email");

        if (email) {
            formik.setFieldValue("email", email);
        }
    }, []);

    async function handleSubmit(values: RegisterFormValues) {
        formik.setSubmitting(false);
        props.onHandleRegister(values);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: handleSubmit,
        validate: values => {
            let errors: any = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }

            if (!values.email) {
                errors.email = 'Email is required';
                return errors;
            }

            if (values.email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Password is required'
            }

            if (values.password && (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/i.test(values.password))) {
                errors.password = 'Password needs to be at least 8 characters, with one lower case, one upper case, and one special character'
            }

            return errors;
        },
    })

    return (
        <div>
            <Container>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
                        <FormLabel>Name</FormLabel>
                        <Input aria-label="name" id="name" name="name" type="text" value={formik.values.name} placeholder="name" onChange={formik.handleChange}></Input>
                        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!formik.errors.email && formik.touched.email} className={styles.formControl}>
                        <FormLabel>Email address</FormLabel>
                        <Input aria-label="email" id="email" name="email" type="email" value={formik.values.email} placeholder="email" onChange={formik.handleChange}></Input>
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!formik.errors.password && formik.touched.password} className={styles.formControl}>
                        <FormLabel>Password</FormLabel>
                        <Input aria-label="password" id="password" name="password" type="password" value={formik.values.password} placeholder="password" onChange={formik.handleChange}></Input>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button
                        colorScheme="green"
                        variant="solid"
                        isLoading={formik.isSubmitting || props.isDisabled}
                        type="submit"
                        data-testid="register-btn"
                        isDisabled={props.isDisabled}
                    >
                        Register
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default RegisterForm;