import { Card, Container } from "@chakra-ui/react";

import styles from './Register.module.scss';
import RegisterForm from "./RegisterForm";
import { RegisterFormValues } from "./RegisterForm/RegisterForm";
import SwitchPage from "../SwitchPage";
import routes from "../../../routes";
import { AppDispatch, RootState, useAppDispatch } from "state";
import { register } from "state/UserReducer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {
    const loadingUser = useSelector((state: RootState) => state.user.loadingUser);
    const navigate = useNavigate();

    const dispatch: AppDispatch = useAppDispatch();
    const handleRegister = (values: RegisterFormValues): void => {
        dispatch(register({ values, navigate }))
    }

    return (
        <Container className={styles.register}>
            <Card>
                <RegisterForm onHandleRegister={handleRegister} isDisabled={loadingUser} />
            </Card>

            <SwitchPage className={styles.switchPage} title="Already have an account?" linkTitle="Login" linkUrl={routes.auth.login} />
        </Container>
    )
}

export default Register;