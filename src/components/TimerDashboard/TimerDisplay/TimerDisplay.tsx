import { ReactNode, useEffect, useState } from "react";
import { Alert, AlertIcon, Button, Container, Stack } from "@chakra-ui/react";

import styles from './TimerDisplay.module.scss';

interface TimerDisplayProps {
    type: string;
    seconds: number;
    minutes: number;
    initialLoops?: number;
}

function TimerDisplay(props: TimerDisplayProps) {
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [remainingLoops, setRemainingLoops] = useState(1);

    useEffect(() => {
        if (props.initialLoops) {
            setRemainingLoops(props.initialLoops);
        }
    }, []);

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

    return (
        <Container>
            {getLoopInfo()}
            <Button
                colorScheme="green"
                variant="solid"
                data-testid="timer-btn"
                onClick={handleOnTimerClick}
            >
                {getTimerButtonLabel()}
            </Button>
        </Container>
    )
}

export default TimerDisplay;