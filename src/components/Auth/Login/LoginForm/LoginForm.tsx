import { Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";

import styles from './LoginForm.module.scss';

interface LoginFormProps {
    onHandleLogin(): void;
    onHandleGuest(): void;
}

function LoginForm(props: LoginFormProps) {
    return (
        <div>
            <Container className={styles.loginForm}>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                </FormControl>
                <Button colorScheme="green" variant='solid' onClick={props.onHandleLogin} data-testid="login-btn">Login</Button>

                <Button colorScheme="teal" data-testid="guest-btn" onClick={props.onHandleGuest}>Continue as guest</Button>
            </Container>
        </div>
    )
}

export default LoginForm;