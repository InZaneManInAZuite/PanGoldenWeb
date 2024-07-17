import { Center, Stack } from '@mantine/core';
import {IconZodiacCancer as IconLogo,} from '@tabler/icons-react';
import classes from './SidePanel.module.css';
import { MenuButtons } from '../MenuButtons/MenuButtons';

export function SidePanel() {

    return (
        <nav className={classes.navbar}>
            <Center>
                <IconLogo type="mark" size={30} />
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    <MenuButtons />
                </Stack>
            </div>
        </nav>
    );
}