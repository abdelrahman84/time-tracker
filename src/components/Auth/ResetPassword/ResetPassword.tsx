import { Alert, AlertIcon, Button, Card, Container, FormControl, FormErrorMessage, FormLabel, Input, Stack, Toast, position, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

import styles from './ResetPassword.module.scss';
import SwitchPage from "../SwitchPage";
import routes from "../../../routes";
import { AuthApi } from "../../../api/authApi";
import { useState } from "react";

interface ResetPasswordValues {
    password: string;
    confirm_password: string;
    reset_token: string;
}

function ResetPassword() {
    const toast = useToast();
    const { token } = useParams();
    const [isPasswordReset, setIsPasswordReset] = useState(false);

    async function handleSubmit(values: ResetPasswordValues) {
        formik.setSubmitting(true);

        await AuthApi.resetPassword(values).then(response => {
            if (response.data.status === 1) {
                setIsPasswordReset(true);
            }

            if (response.data.status === 2) {
                toast({
                    title: 'Error',
                    description: 'Password reset failed. Link is invalid, or user does not exist',
                    status: 'error',
                    duration: 3000,
                    position: 'bottom-right'
                })
            }
        }).catch(error => {
            toast({
                title: 'Error',
                description: error?.response?.data?.password?.[0] ?? 'Password reset failed. Please try again later',
                status: 'error',
                duration: 3000,
                position: 'bottom-right'
            })
        }).finally(() => {
            formik.setSubmitting(false);
        });
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: '',
            reset_token: token || ''
        },
        onSubmit: handleSubmit,
        validate: values => {
            let errors: any = {};
            if (!values.password) {
                errors.password = 'Password is required';
                return errors;
            }

            if (values.password && (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/i.test(values.password))) {
                errors.password = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
            }

            if (!values.confirm_password) {
                errors.confirm_password = 'Confirm password is required';
                return errors;
            }

            if (values.password !== values.confirm_password) {
                errors.confirm_password = 'Passwords do not match';
                return errors;
            }

            return errors;
        }
    });

    return (
        <Container className={styles.resetPassword}>
            {!isPasswordReset && (
                <Card>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
                            <FormLabel>Password</FormLabel>
                            <Input id="password" name="password" type="password" value={formik.values.password} placeholder="password" onChange={formik.handleChange} />
                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!formik.errors.confirm_password && formik.touched.confirm_password}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input id="confirm_password" name="confirm_password" type="password" value={formik.values.confirm_password} placeholder="confirm password" onChange={formik.handleChange} />
                            <FormErrorMessage>{formik.errors.confirm_password}</FormErrorMessage>
                        </FormControl>

                        <Button
                            colorScheme="green"
                            variant='solid'
                            isLoading={formik.isSubmitting}
                            isDisabled={formik.isSubmitting}
                            type='submit'
                            data-testid="reset-password-btn"
                        >
                            Reset Password
                        </Button>


                    </form>
                </Card>
            )}

            {isPasswordReset && (
                <Stack spacing={3}>
                    <Alert status="success" variant='solid'>
                        <AlertIcon />
                        Password reset successful. Please login with your new password
                    </Alert>
                </Stack>
            )}

            <SwitchPage className={styles.switchPage} title="Return to login" linkTitle="Login" linkUrl={routes.auth.login} />

        </Container>
    )
}

export default ResetPassword;