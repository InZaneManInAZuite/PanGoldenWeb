import { Button, Card, Text, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './LoggedOutForm.module.css';

export const LoggedOutForm = () => {
  const navigate = useNavigate();

  return (
    <Card className={classes.card} radius="lg" p="xl" withBorder>
      <Stack>
        <Text>You are logged out. Please log in to continue.</Text>

        <Button onClick={() => navigate('/Auth')}>Login Now</Button>
      </Stack>
    </Card>
  );
};
