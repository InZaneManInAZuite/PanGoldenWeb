import { Center, Stack, Paper } from '@mantine/core';
import { IconZodiacCancer as IconLogo } from '@tabler/icons-react';
import classes from './SidePanel.module.css';
import { MenuButtons } from '../MenuButtons/MenuButtons';
import { Logo } from '../Logo/Logo';

export function SidePanel() {
  return (
    <Paper className={classes.navbar} radius="0">
      <Center mt="lg">
        <Logo size={60} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          <MenuButtons />
        </Stack>
      </div>
    </Paper>
  );
}
