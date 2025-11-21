import { Box, Text } from '@chakra-ui/react';

import styles from './BetaRibbon.module.scss';

function BetaRibbon() {
    return (
        <Box className={styles.betaRibbon}>
            <Text className={styles.betaText}>Beta</Text>
        </Box>
    );
}

export default BetaRibbon;
