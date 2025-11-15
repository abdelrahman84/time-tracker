import { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, UnorderedList } from "@chakra-ui/react";

import TimerCountdown from "./TimerCountdown";

import styles from './TimerDashboard.module.scss';
import TimerDisplay from "./TimerDisplay";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "state";
import { setHours, setIsLoopEnabled, setLoopCount, setMinutes, setSeconds } from "state/TimerCountdownReducer";
import TimerStopWatch from "./TimerStopWatch";
import { DEFAULT_MINUTES } from "./TimerDisplay/TimerDisplay";

export const COUNTDOWN = 'countdown';
export const STOPWATCH = 'stopwatch';


function TimerDashboard() {
    const seconds = useSelector((state: RootState) => state.timerCountdown.seconds);
    const minutes = useSelector((state: RootState) => state.timerCountdown.minutes);
    const hours = useSelector((state: RootState) => state.timerCountdown.hours);
    const loopCount = useSelector((state: RootState) => state.timerCountdown.loopCount);
    const isLoopEnabled = useSelector((state: RootState) => state.timerCountdown.isLoopEnabled);
    const [remainingLoops, setRemainingLoops] = useState(0);
    const [remainingMinutes, setRemainingMinutes] = useState(0);
    const [remainingHours, setRemainingHours] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [timerEnabled, setTimerEnabled] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [isPreviousTimerEnabled, setIsPreviousTimerEnabled] = useState(false);

    const dispatch: AppDispatch = useAppDispatch();

    useEffect(() => {
        const timer = localStorage.getItem('timer');
        if (timer) {
            setIsPreviousTimerEnabled(true);
        }
    }, [])

    const handleTimeStarted = () => {
        setTimerEnabled(true)

        const remainingLoops = loopCount;
        let remainingHours = hours;
        let remainingMinutes = minutes ?? 0;
        const remainingSeconds = seconds ?? 0;

        if (hours >= 1 && (minutes <= 0 && seconds <= 0)) {
            dispatch(setMinutes(DEFAULT_MINUTES));
            remainingMinutes = DEFAULT_MINUTES;
        }

        if (hours == 1 && minutes <= 0 && seconds <= 0) {
            remainingHours = 0;
        }

        if (minutes >= 1 && seconds <= 0) {
            remainingMinutes = remainingMinutes - 1;
        }

        setRemainingLoops(remainingLoops);
        setRemainingMinutes(remainingMinutes);
        setRemainingHours(remainingHours);
        setRemainingSeconds(remainingSeconds);

        localStorage.setItem('timer', JSON.stringify({
            seconds,
            minutes,
            hours,
            remainingSeconds,
            remainingMinutes,
            remainingHours,
            loopCount,
            remainingLoops,
            isLoopEnabled
        }))
    }

    const handleSelectTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value)
    }

    const handleSecondsChange = (seconds: number) => {
        dispatch(setSeconds(seconds));
    }

    const handleMinutesChange = (minutes: number) => {
        dispatch(setMinutes(minutes));
    }

    const handleHoursChange = (hours: number) => {
        dispatch(setHours(hours));
    }

    const handleSetIsLoopEnabled = ($status: boolean) => {
        dispatch(setIsLoopEnabled($status));
    }

    const handleSetLoopCount = (loopCount: number) => {
        dispatch(setLoopCount(loopCount))
    }

    const handleTimerFinished = () => {
        setTimerEnabled(false);
        localStorage.removeItem('timer');
        setRemainingLoops(0);
        setRemainingMinutes(0);
        setRemainingHours(0);
        setRemainingSeconds(0);

        dispatch(setSeconds(0));
        dispatch(setMinutes(0));
        dispatch(setHours(0));
        dispatch(setLoopCount(1));
    }

    const handleTimerTypeChange = () => {
        setSelectedType('');
    }

    const previousTimerContent = (): React.ReactNode => {
        const timer = getTimerFromLocalStorage();
        if (timer) {
            return (
                <div>
                    <p>Previous countdown timer found:</p>
                    <UnorderedList>
                        <ListItem>Minutes: {timer.minutes}</ListItem>
                        <ListItem>Seconds: {timer.seconds}</ListItem>
                        <ListItem>Loops: {timer.loopCount}</ListItem>
                    </UnorderedList>
                </div>
            )
        }
    }

    const onClosePreviousTimer = () => {
        localStorage.removeItem('timer');
        setIsPreviousTimerEnabled(false);
    }

    const onResumePreviousTimer = () => {
        const timer = getTimerFromLocalStorage();
        dispatch(setSeconds(timer.seconds));
        dispatch(setMinutes(timer.minutes));
        dispatch(setLoopCount(timer.loopCount));

        setRemainingSeconds(timer.remainingSeconds);
        setRemainingMinutes(timer.remainingMinutes);
        setRemainingHours(timer.remainingHours);
        setRemainingLoops(timer.remainingLoops);
        setSelectedType(COUNTDOWN);
        setTimerEnabled(true);
        setIsPreviousTimerEnabled(false);
    }

    const getTimerFromLocalStorage = () => {
        const timer = JSON.parse(localStorage.getItem('timer') || '{}');
        if (timer) {
            return timer;
        }
    }

    return (
        <Container className={styles.timerDashboard}>
            {!selectedType && (
                <div className={styles.changeTypeContainer}>
                    <Select
                        value={selectedType}
                        onChange={handleSelectTypeChange}
                        placeholder="Select type">
                        <option value={COUNTDOWN}>countdown</option>
                        <option value={STOPWATCH}>stopwatch</option>
                    </Select>
                </div>
            )}


            {selectedType === COUNTDOWN && timerEnabled === false &&
                <TimerCountdown
                    onHandleStartTimer={handleTimeStarted}
                    onHandleSecondsChange={handleSecondsChange}
                    onHandleMinutesChange={handleMinutesChange}
                    onHandleHoursChange={handleHoursChange}
                    setIsLoopEnabled={handleSetIsLoopEnabled}
                    setLoopCount={handleSetLoopCount}
                    seconds={seconds}
                    minutes={minutes}
                    hours={hours}
                    initialLoops={loopCount}
                    isLoopEnabled={isLoopEnabled}
                    onTimerTypeChange={handleTimerTypeChange}
                />
            }

            {selectedType === STOPWATCH && timerEnabled === false &&
                <TimerStopWatch
                    onTimerTypeChange={handleTimerTypeChange}
                />}


            {timerEnabled &&
                <TimerDisplay
                    type={selectedType}
                    seconds={seconds}
                    minutes={minutes}
                    hours={hours}
                    initialLoops={loopCount}
                    onHandleTimerFinished={handleTimerFinished}
                    remainingSeconds={remainingSeconds}
                    remainingMinutes={remainingMinutes}
                    remainingHours={remainingHours}
                    remainingLoops={remainingLoops}
                />
            }

            <Modal
                isOpen={isPreviousTimerEnabled}
                onClose={onClosePreviousTimer}
                colorScheme="whiteAlpha"
                size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Previous Timer Found
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {previousTimerContent()}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClosePreviousTimer}>
                            Discard
                        </Button>
                        <Button colorScheme='green' onClick={onResumePreviousTimer}>
                            Resume
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Container>
    )
}

export default TimerDashboard;