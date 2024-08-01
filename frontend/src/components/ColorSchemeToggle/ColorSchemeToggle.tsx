import { Button, Group, useMantineColorScheme, Card, Title, Stack } from '@mantine/core';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Card p="xl" shadow="md" className={classes.colorToggleCard}>
      <Title mb="lg" order={3}>Color Scheme</Title>


      <Group className={classes.buttons}>
        <Button className={classes.button} onClick={() => setColorScheme('light')}>Light</Button>
        <Button className={classes.button} onClick={() => setColorScheme('dark')}>Dark</Button>
      </Group>


    </Card>
  );
}
