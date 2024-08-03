import { UnstyledButton, Card, Group, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import classes from './AddNewAccountButton.module.css';
import { useNavigate } from 'react-router-dom';

export const AddNewAccountButton = () => {
  const navigate = useNavigate();

  return (
    <Group justify="center">
      <UnstyledButton onClick={() => navigate('/Accounts/Add')} mt="lg">
        <Card shadow="xs" padding="md" radius="md" className={classes.newAccount}>
          <Group>
            <Title order={2}>Add Account</Title>
            <IconPlus size={24} />
          </Group>
        </Card>
      </UnstyledButton>
    </Group>
  );
};
