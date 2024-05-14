import { useNavigate } from "react-router-dom";
import { Button, Card, Container, useToast } from "@chakra-ui/react";

import styles from './Login.module.scss';
import LoginForm from "./LoginForm";
import routes from "../../../routes";
import { Values } from "./LoginForm/LoginForm";
import { AuthApi } from "../../../api/authApi";
import SwitchPage from "../SwitchPage";
import { useState } from "react";
import PasswordForm from "./PasswordForm";
import { PasswordValues } from "./PasswordForm/PasswordForm";
import { useAppDispatch } from "../../../redux";
import { login } from "../../../redux/UserReducer";

export interface LoginValues {
    email: string;
    password: string;
}

function Login() {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleLogin = async (values: Values): Promise<void> => {
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
        })
    }

    const handlePasswordSubmit = async (values: PasswordValues): Promise<void> => {
        const response = await dispatch(login({ values: { email, password: values.password } }))

        if (response.type === 'user/login/fulfilled') {
            navigate(routes.timerDashboard.main)
            return;
        }

        if (response.type === 'user/login/rejected') {
            toast({
                title: 'Failed to login. Wrong email or password',
                status: 'error',
                duration: 3000,
                position: 'bottom-right',
                isClosable: true,
            })
        }
    }

    const handleGuest = (): void => {
        navigate(routes.timerDashboard.main)
    }

    return (
        <Container className={styles.login}>
            <Card>
                {!showPasswordForm && (<LoginForm onHandleLogin={handleLogin} />)}
                {showPasswordForm && (<PasswordForm onHandlePassword={handlePasswordSubmit} />)}
                <Button colorScheme="teal" data-testid="guest-btn" onClick={handleGuest}>Continue as guest</Button>
            </Card>

            <SwitchPage className={styles.switchPage} title="Don't have an account?" linkTitle="Sign up" linkUrl={routes.auth.register} />
        </Container>
    )
}

export default Login;