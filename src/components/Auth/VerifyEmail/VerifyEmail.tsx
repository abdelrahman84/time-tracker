import { useEffect, useState } from "react";
import { Alert, AlertIcon, Button, Container, Spinner, Stack, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import styles from './VerifyEmail.module.scss';
import { AuthApi } from "../../../api/authApi";
import ResendEmailForm from "./ResendEmailForm";
import { ResendEmailValues } from "./ResendEmailForm/ResendEmailForm";
import SwitchPage from "../SwitchPage";
import routes from "../../../routes";

function VerifyEmail() {
    const navigate = useNavigate();
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const { token } = useParams();
    const [isVerifyTokenSent, setIsVerifyTokenSent] = useState(false);
    const [isTokenInvalid, setIsTokenInvalid] = useState(false);
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const [emailStatus, setEmailStatus] = useState(0);
    const [email, setEmail] = useState('');
    const [secondsCount, setSecondsCount] = useState(0);

    useEffect(() => {
        if (token && !isVerifyTokenSent) {
            verifyEmail(token)
        }

        const timer = setTimeout(() => {
            if (secondsCount === 0) {
                return;
            }

            setSecondsCount(secondsCount - 1)
        }, 1000);

        return () => clearTimeout(timer);

    }, [token, isVerifyTokenSent, secondsCount])

    const verifyEmail = async (token: string): Promise<void> => {
        await AuthApi.verifyToken(token).then(response => {
            setIsVerifyTokenSent(true);
            setIsTokenVerified(true);
        }).catch(error => {
            setIsTokenInvalid(true);
            setIsVerifyTokenSent(true);
        }).finally(() => {
            setLoading(false);
        })
    }

    async function sendVerificationEmail(email: string) {
        setLoading(true);
        await AuthApi.resendVerificationEmail(email).then(response => {
            setLoading(false);
            if (response.data.status === 1) {
                setIsTokenInvalid(false);
                setEmailStatus(1)
                return;
            }

            if (response.data.status === 2) {
                setIsTokenInvalid(false);
                setEmailStatus(2);
                setSecondsCount(60);
                toast({
                    title: 'Success',
                    description: 'Verification email sent successfully',
                    status: 'success',
                    isClosable: true,
                });
                return;
            }

            navigate({
                pathname: routes.auth.register,
                search: `?email=${email}`,
            });

        }).catch(error => {
            setLoading(false);
        })
    }

    async function handleSubmit(values: ResendEmailValues) {
        setEmail(values.email);
        sendVerificationEmail(values.email);
    }

    async function resendVerificationEmail() {
        sendVerificationEmail(email);
    }

    function getLoginSwitch () {
        return (
            <SwitchPage className={styles.switchPage} title="Return to login" linkTitle="Login" linkUrl={routes.auth.login} />
        )
    }

    return (
        <Container className={styles.verifyEmail}>
            {loading && emailStatus === 0 && (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl" />
            )}

            {!loading && isTokenInvalid && (
                <div>
                    <h5 className={styles.invalidHeader}>Invalid Token, or expired. Please try again!</h5>
                    <ResendEmailForm onHandleSubmit={handleSubmit} />
                </div>
            )}

            {emailStatus === 2 && (
                <div>
                    <p>Email sent to {email}. If not in inbox, please check spam.
                        {secondsCount > 0 && (

                            <span> Resending in {secondsCount}</span>
                        )}
                    </p>
                    <Button
                        colorScheme="green"
                        isDisabled={secondsCount > 0 || loading}
                        onClick={resendVerificationEmail}
                        isLoading={loading}
                    >
                        Resend Verification Email
                    </Button>
                    {getLoginSwitch()}
                </div>
            )}

            {emailStatus === 1 || isTokenVerified && (
                <Stack spacing={3}>
                    <Alert status="success" variant='solid'>
                        <AlertIcon />
                        Email verified successfully
                    </Alert>
                    {getLoginSwitch()}
                </Stack>
            )}
        </Container>
    )
}

export default VerifyEmail;