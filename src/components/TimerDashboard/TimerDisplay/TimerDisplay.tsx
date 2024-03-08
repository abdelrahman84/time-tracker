import { ReactNode, useEffect, useState } from "react";
import { Alert, AlertIcon, Button, Container, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import useSound from "use-sound";

import styles from './TimerDisplay.module.scss';
import loopNotification from '../../../Sounds/simple-notification.mp3';
import alarmFinished from '../../../Sounds/alarm-finished.mp3';

interface TimerDisplayProps {
    type: string;
    seconds: number;
    minutes: number;
    initialLoops?: number;
    onHandleTimerFinished(): void;
}

function TimerDisplay(props: TimerDisplayProps) {
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [remainingLoops, setRemainingLoops] = useState(1);
    const [localMinutes, setLocalMinutes] = useState(0);
    const [localSeconds, setLocalSeconds] = useState(60);
    const [isTimerFinishedModalOpen, setIsTimerFinishedModalOpen] = useState(false);
    const [playLoopSound] = useSound(loopNotification);
    const [playAlarmFinished] = useSound(alarmFinished);

    useEffect(() => {
        if (props.initialLoops) {
            setRemainingLoops(props.initialLoops);
        }

        if (props.minutes) {
            setLocalMinutes(props.minutes);
        }

        if (props.seconds) {
            setLocalSeconds(props.seconds);
        }
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
                updatedSeconds = props.seconds;
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

    const getDisplayedCountDown = (displayType: number): ReactNode => {
        const formattedDisplay = formatNumber(displayType);

        return (
            <h3>{formattedDisplay}</h3>
        )
    }

    const formatNumber = (number: number): string => {
        if (number >= 10) {
            return number.toString();
        }

        return '0' + number.toString();
    }

    const handleCloseModal = (): void => {
        setIsTimerFinishedModalOpen(!isTimerFinishedModalOpen);
        props.onHandleTimerFinished();
    }

    return (
        <Container>
            {getLoopInfo()}

            <div className={styles.countDownWidget}>
                {getDisplayedCountDown(localMinutes)} <span>:</span> {getDisplayedCountDown(localSeconds)}
            </div>

            <Button
                colorScheme="green"
                variant="solid"
                data-testid="timer-btn"
                onClick={handleOnTimerClick}
            >
                {getTimerButtonLabel()}
            </Button>

            <Modal
                isOpen={isTimerFinishedModalOpen}
                onClose={handleCloseModal}
                colorScheme="whiteAlpha"
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Timer countdown Finished
                    </ModalHeader>
                    <ModalCloseButton />
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default TimerDisplay;