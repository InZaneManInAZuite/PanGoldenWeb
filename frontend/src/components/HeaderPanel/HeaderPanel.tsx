// Create a disclosure panel that can be opened and closed

import { IconMenu2 } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';

import {
    IconZodiacCancer as IconLogo,

    IconMenu2 as IconMenu
} from '@tabler/icons-react';
import classes from './HeaderPanel.module.css';

export const HeaderPanel = () => {

    const [drawerOpened, { toggle:toggleDrawer, close:closeDrawer }] = useDisclosure(false);

    return (
        <header>
            <Drawer opened={drawerOpened} onClose={close}>
                
            </Drawer>
        </header>
    );

}
