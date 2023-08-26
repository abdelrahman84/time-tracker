import { Card, Container } from "@chakra-ui/react";

import styles from './Register.module.scss';
import RegisterForm from "./RegisterForm";
import { RegisterFormValues } from "./RegisterForm/RegisterForm";
import SwitchPage from "../SwitchPage";
import routes from "../../../routes";
import { AppDispatch, useAppDispatch } from "../../../redux";
import { register } from "../../../redux/UserReducer";

function Register() {
    const dispatch: AppDispatch = useAppDispatch();
    const handleRegister = (values: RegisterFormValues): void => {
        dispatch(register(values))
    }

    return (
        <Container className={styles.register}>
            <Card>
                <RegisterForm onHandleRegister={handleRegister} />
            </Card>

            <SwitchPage className={styles.switchPage} title="Already have an account?" linkTitle="Login" linkUrl={routes.auth.login} />
        </Container>
    )
}

export default Register;