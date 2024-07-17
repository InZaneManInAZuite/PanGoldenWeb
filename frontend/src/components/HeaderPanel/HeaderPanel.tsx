// Create a disclosure panel that can be opened and closed
import { useDisclosure } from '@mantine/hooks';
import { Center, Drawer, Stack, Card, Title } from '@mantine/core';

import {
    IconZodiacCancer as IconLogo,

    IconMenu2 as IconMenu
} from '@tabler/icons-react';
import classes from './HeaderPanel.module.css';
import { MenuButtons } from '../MenuButtons/MenuButtons';

export const HeaderPanel = () => {

    const [drawerOpened, { open, close }] = useDisclosure(false);

    addEventListener('pageChange', close);

    return (
        <header>
            <Drawer opened={drawerOpened} onClose={close}>
                <Center>
                    <IconLogo type="mark" size={30} />
                </Center>

                <div className={classes.navbarMain}>
                    <Stack justify="center" gap={0}>
                        <MenuButtons />
                    </Stack>
                </div>
            </Drawer>

            <Card className={classes.header}>
                <IconLogo type="mark" size={30} />
                <Title order={2} className={classes.logoText}>PanGolden</Title>

                <div className={classes.headerMenu}>
                    <IconMenu onClick={open} size={30} />
                </div>
            </Card>
        </header>
    );

}
