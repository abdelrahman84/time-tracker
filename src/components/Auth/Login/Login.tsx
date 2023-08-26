import { useNavigate } from "react-router-dom";
import { Card, Container } from "@chakra-ui/react";

import styles from './Login.module.scss';
import LoginForm from "./LoginForm";
import routes from "../../../routes";
import { Values } from "./LoginForm/LoginForm";
import { AuthApi } from "../../../api/authApi";
import SwitchPage from "../SwitchPage";


function Login() {
    const navigate = useNavigate();

    const handleLogin = async (values: Values): Promise<void> => {
        await AuthApi.checkEmailBeforeLogin(values.email).then(response => {
            if (response.data.status === 1) {
                navigate({
                    pathname: routes.auth.register,
                    search: `?email=${values.email}`,
                });
            }
        })
    }

    const handleGuest = (): void => {
        navigate(routes.timerDashboard.main)
    }

    return (
        <Container className={styles.login}>
            <Card>
                <LoginForm onHandleLogin={handleLogin} onHandleGuest={handleGuest} />
            </Card>

            <SwitchPage className={styles.switchPage} title="Don't have an account?" linkTitle="Sign up" linkUrl={routes.auth.register} />
        </Container>
    )
}

export default Login;