import { Button, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TimerWidget from '../../reusables/TimerWidget';

import styles from './TimerStopWatch.module.scss';

interface TimerStopWatchProps {
  onTimerTypeChange(): void;
}

function TimerStopWatch(props: TimerStopWatchProps) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerOn) {
        setSeconds((s) => {
          if (s >= 59) {
            setMinutes((m) => {
              if (m >= 59) {
                setHours((h) => h + 1);
                return 0;
              }
              return m + 1;
            });
            return 0;
          }
          return s + 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerOn]);

  const handleOnTimerClick = (): void => {
    setIsTimerOn(!isTimerOn);
  };

  const getTimerButtonLabel = (): string => {
    if (isTimerOn) {
      return 'Pause';
    }

    return 'Start';
  };

  const handleReset = () => {
    setSeconds(0);
    setMinutes(0);
    setIsTimerOn(false);
  };

  const handleBack = () => {
    handleReset();
    props.onTimerTypeChange();
  };

  return (
    <Container className={styles.timerStopWatch}>
      <div>
        <TimerWidget hours={hours} seconds={seconds} minutes={minutes} />
      </div>

      <Button colorScheme="green" variant="solid" onClick={handleOnTimerClick}>
        {getTimerButtonLabel()}
      </Button>

      <Button colorScheme="red" variant="solid" onClick={handleReset}>
        Reset
      </Button>

      <Button colorScheme="yellow" variant="solid" onClick={handleBack}>
        Change timer type
      </Button>
    </Container>
  );
}

export default TimerStopWatch;
