// Create a disclosure panel that can be opened and closed
import { useDisclosure } from '@mantine/hooks';
import { Center, Drawer, Stack, Card, Title, Overlay } from '@mantine/core';
import { Logo } from '../Logo/Logo';

import { IconMenu2 as IconMenu } from '@tabler/icons-react';
import classes from './HeaderPanel.module.css';
import { MenuButtons } from '../MenuButtons/MenuButtons';

export const HeaderPanel = () => {
  const [drawerOpened, { open, close }] = useDisclosure(false);

  addEventListener('pageChange', close);

  return (
    <header className={classes.nav}>
      <Drawer opened={drawerOpened} onClose={close}>
        <Overlay className={classes.drawer}>
          <Center mt="100">
            <Logo size={60} />
          </Center>
          <Stack justify="center" gap={0} p="lg">
            <MenuButtons />
          </Stack>
        </Overlay>
      </Drawer>

      <Card className={classes.header} radius="0" p="lg">
        <Title order={2} className={classes.logoText}>
          PanGolden
        </Title>

        <Card className={classes.headerMenu} shadow="0" p="0">
          <IconMenu onClick={open} size={35} />
        </Card>
      </Card>
    </header>
  );
};
