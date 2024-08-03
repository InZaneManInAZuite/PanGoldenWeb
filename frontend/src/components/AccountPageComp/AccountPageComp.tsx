import { Title, Stack, Divider } from '@mantine/core';
import { AccountCardList } from '../AccountCardList/AccountCardList';
import { AddNewAccountButton } from '../AddNewAccountButton/AddNewAccountButton';

export const AccountPageComp = () => {
  return (
    <Stack>
      <Title order={1}>Accounts</Title>
      <Divider />
      <AccountCardList />
      <AddNewAccountButton />
    </Stack>
  );
};
