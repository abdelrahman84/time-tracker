import React, { ReactNode, useEffect, useState } from "react";
import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, Button, Container, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import useSound from "use-sound";

import styles from './TimerDisplay.module.scss';
import loopNotification from '../../../Sounds/simple-notification.mp3';
import alarmFinished from '../../../Sounds/alarm-finished.mp3';
import TimerWidget from "../../reusables/TimerWidget";
import BackButton from "components/reusables/BackButton"

const SECONDS = 59;

interface TimerDisplayProps {
    type: string;
    seconds: number;
    minutes: number;
    initialLoops?: number;
    remainingSeconds?: number;
    remainingMinutes?: number;
    remainingLoops?: number;
    onHandleTimerFinished(): void;
}

function TimerDisplay(props: TimerDisplayProps) {
    const [isTimerOn, setIsTimerOn] = useState(true);
    const [remainingLoops, setRemainingLoops] = useState(1);
    const [localMinutes, setLocalMinutes] = useState(0);
    const [localSeconds, setLocalSeconds] = useState(59);
    const [isTimerFinishedModalOpen, setIsTimerFinishedModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [playLoopSound] = useSound(loopNotification);
    const [playAlarmFinished] = useSound(alarmFinished);

    const cancelResetModalRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setRemainingLoops(props.remainingLoops);
        setLocalMinutes(props.remainingMinutes);
        setLocalSeconds(props.remainingSeconds);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            updateCurrentCountDown()
        }, 1000);

        return () => clearInterval(timer);

    }, [isTimerOn, localMinutes, localSeconds]);

    const updateCurrentCountDown = (): void => {
        if (!isTimerOn) {
            return;
        }

        let updatedSeconds = localSeconds - 1;

        if (updatedSeconds < 0) {
            if (localMinutes >= 1) {

                let updatedMinutes = localMinutes - 1;
                updatedSeconds = SECONDS;
                setLocalMinutes(updatedMinutes);
            }

            if (localMinutes === 0) {
                if (remainingLoops == 1) {
                    playAlarmFinished();
                    setIsTimerOn(false);
                    setIsTimerFinishedModalOpen(true);
                    return;
                }

                if (remainingLoops > 1) {
                    let updatedRemainingLoops = remainingLoops - 1;
                    setRemainingLoops(updatedRemainingLoops);
                    playLoopSound();

                    setLocalMinutes(props.minutes);
                    updatedSeconds = props.seconds;
                }
            }
        }

        setLocalSeconds(updatedSeconds);

        updateCurrentTimerSnapShot();
    }

    const getTimerButtonLabel = (): string => {
        if (isTimerOn) {
            return 'Pause';
        }

        return 'Start';
    }

    const handleOnTimerClick = (): void => {
        setIsTimerOn(!isTimerOn);
    }

    const getLoopInfo = (): ReactNode => {
        const initialLoops = props.initialLoops ?? 1
        return (
            <Stack spacing={3}>
                <Alert status="info" className={styles.loopInfo}>
                    <AlertIcon>
                        {remainingLoops} of {initialLoops} loops remaining
                    </AlertIcon>
                </Alert>
            </Stack>
        )
    }

    const handleCloseModal = (): void => {
        setIsTimerFinishedModalOpen(!isTimerFinishedModalOpen);
        props.onHandleTimerFinished();
    }

    const handleToggleResetAlert = (): void => {
        setIsResetModalOpen(!isResetModalOpen);
    }

    const handleResetModalClose = (): void => {
        setIsResetModalOpen(!isResetModalOpen);
        setIsTimerOn(false);
        props.onHandleTimerFinished();
    }

    const handleTimerTypeChange = (): void => {
        setIsTimerOn(false);
        props.onHandleTimerFinished();
    }

    const updateCurrentTimerSnapShot = (): void => {
        const timer = JSON.parse(localStorage.getItem('timer') || '{}');
        localStorage.setItem('timer', JSON.stringify({
            ...timer,
            remainingSeconds: localSeconds,
            remainingMinutes: localMinutes,
            remainingLoops
        }));
    }

    return (
        <Container>
            {getLoopInfo()}

            <div className={styles.timerDisplay}>
                <TimerWidget
                    seconds={localSeconds}
                    minutes={localMinutes}
                />

                <Button
                    colorScheme="green"
                    variant="solid"
                    data-testid="timer-btn"
                    onClick={handleOnTimerClick}
                >
                    {getTimerButtonLabel()}
                </Button>

                <Button
                    colorScheme="red"
                    variant="solid"
                    onClick={handleToggleResetAlert}
                >
                    Reset
                </Button>
            </div>

            <Modal
                isOpen={isTimerFinishedModalOpen}
                onClose={handleCloseModal}
                colorScheme="whiteAlpha"
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Previous countdown finished
                    </ModalHeader>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>

            <AlertDialog
                isOpen={isResetModalOpen}
                leastDestructiveRef={cancelResetModalRef}
                onClose={handleToggleResetAlert}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Reset Timer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to reset the timer?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelResetModalRef} onClick={handleToggleResetAlert}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleResetModalClose} ml={3}>
                                Reset
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <div className={styles.backButtonContainer}>
                <BackButton onHandleBack={handleTimerTypeChange} />
            </div>

        </Container>
    )
}

export default TimerDisplay;