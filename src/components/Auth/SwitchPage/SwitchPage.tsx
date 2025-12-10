import { Link as ReactRouterLink } from 'react-router-dom';
import { Card, Link as ChakraLink } from '@chakra-ui/react';

import styles from './SwitchPage.module.scss';

interface SwitchPageProps {
  title: string;
  linkTitle: string;
  linkUrl: string;
  className?: string;
}

function SwitchPage(props: SwitchPageProps) {
  return (
    <Card className={`${props.className} ${styles.switchPage}`}>
      <div className={styles.content}>
        <h1>{props.title} </h1>
        <ChakraLink
          className={styles.link}
          as={ReactRouterLink}
          to={props.linkUrl}
        >
          {props.linkTitle}
        </ChakraLink>
      </div>
    </Card>
  );
}

export default SwitchPage;
