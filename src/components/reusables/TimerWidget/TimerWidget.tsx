import { ReactNode } from 'react';

import styles from './TimerWidget.module.scss';

interface TimerWidgetProps {
  seconds: number;
  minutes: number;
  hours: number;
}

function TimerWidget(props: TimerWidgetProps) {
  const formatNumber = (number: number): string => {
    if (number >= 10) {
      return number.toString();
    }

    return '0' + number.toString();
  };

  const getDisplayedCountDown = (displayType: number): ReactNode => {
    const formattedDisplay = formatNumber(displayType);

    return <h3>{formattedDisplay}</h3>;
  };

  return (
    <div className={styles.timerWidget}>
      {getDisplayedCountDown(props.hours)} <span>:</span>{' '}
      {getDisplayedCountDown(props.minutes)} <span>:</span>{' '}
      {getDisplayedCountDown(props.seconds)}
    </div>
  );
}

export default TimerWidget;
