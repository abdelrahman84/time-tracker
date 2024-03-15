import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Switch, useColorMode } from "@chakra-ui/react";

import styles from './ChangeColorModeSwitch.module.scss';

function ChangeColorModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode();

    const getSwitchStatus = (): boolean => {
        return colorMode !== "dark";
    }

    return (
        <div className={styles.changeColorModeSwitch}>
            <MoonIcon />
            <Switch onChange={toggleColorMode} colorScheme="teal" size="lg" isChecked={getSwitchStatus()} />
            <SunIcon />
        </div>
    )
}

export default ChangeColorModeSwitch;