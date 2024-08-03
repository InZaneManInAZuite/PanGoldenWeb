import { Loader, Card, Center } from '@mantine/core';
import classes from './Loading.module.css';

export const Loading = () => {
  return (
    <Center>
      <Card mt="xl" className={classes.loading}>
        <Loader color="yellow" />
      </Card>
    </Center>
  );
};
