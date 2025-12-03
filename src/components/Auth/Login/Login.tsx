import { useNavigate } from "react-router-dom";
import { Button, Card, Container, useToast } from "@chakra-ui/react";

import styles from './Login.module.scss';
import LoginForm from "./LoginForm";
import routes from "../../../routes";
import { AuthApi } from "../../../api/authApi";
import SwitchPage from "../SwitchPage";
import React, { useState } from "react";
import PasswordForm from "./PasswordForm";
import { PasswordValues } from "./PasswordForm/PasswordForm";
import { useAppDispatch } from "state";
import { login } from "state/UserReducer";
import ForgotPasswordForm from "./ForgotPasswordForm";

export interface LoginValues {
    email: string;
    password: string;
}

export interface EmailValue {
    email: string;
}

function Login() {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [isSendingForgotPassword, setIsSendingForgotPassword] = useState(false)

    const handleLogin = async (values: EmailValue): Promise<void> => {
        await AuthApi.checkEmailBeforeLogin(values.email).then(response => {
            if (response.data.status === 1) {
                navigate({
                    pathname: routes.auth.register,
                    search: `?email=${values.email}`,
                });
            }

            if (response.data.status === 3 || response.data.status === 2) {
                setEmail(values.email);
                setShowPasswordForm(true);
            }
        }).catch(error => {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again later',
                status: 'error',
                duration: 3000,
                position: 'bottom-right',
            })
        })
    }

    const handlePasswordSubmit = async (values: PasswordValues): Promise<void> => {
        const response = await dispatch(login({ values: { email, password: values.password } }))

        if (response.type === 'user/login/fulfilled') {
            navigate(routes.timerDashboard.main)
            return;
        }

        toast({
            title: 'Failed to login. Wrong email or password',
            status: 'error',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
        })
    }

    const handleGuest = (): void => {
        navigate(routes.timerDashboard.main)
    }

    const handleForgotPassword = (): void => {
        setShowForgotPasswordForm(true);
        setShowPasswordForm(false);
    }

    const handleForgotPasswordSubmit = async (): Promise<void> => {
        setIsSendingForgotPassword(true);

        await AuthApi.forgotPasswordEmail(email).then(response => {
            toast({
                title: 'Success',
                description: 'If the email exists, a reset password link will be sent to your email',
                status: 'success',
                duration: 3000,
                position: 'bottom-right',
            })
        }).finally(() => {
            setIsSendingForgotPassword(false);
        })
    }

    const cardContent = (): React.ReactNode => {
        if (showPasswordForm) {
            return <PasswordForm onHandlePassword={handlePasswordSubmit} onHandleForgotPassword={handleForgotPassword} />
        }

        if (showForgotPasswordForm) {
            return <ForgotPasswordForm
                inputEmail={email}
                isDisabled={isSendingForgotPassword}
                onHandleForgotSubmit={handleForgotPasswordSubmit}
            />
        }

        return <LoginForm onHandleLogin={handleLogin} />
    }

    return (
        <Container className={styles.login}>
            <Card>
                {cardContent()}
                <Button colorScheme="teal" data-testid="guest-btn" onClick={handleGuest}>Continue as guest</Button>
            </Card>

            <SwitchPage className={styles.switchPage} title="Don't have an account?" linkTitle="Sign up" linkUrl={routes.auth.register} />
        </Container>
    )
}

export default Login;