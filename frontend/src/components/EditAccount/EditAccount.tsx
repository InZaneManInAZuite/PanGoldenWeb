import { Card, TextInput, NumberInput, Button, Stack, Title, Anchor } from '@mantine/core';
import { Account } from '../../Models/PanGoldenModels';
import { useState } from 'react';
import { updateAccount } from '@/Services/AccountService';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { store } from '../../App/Store';

import classes from './EditAccount.module.css';

export const EditAccount = ({ account }: { account: Account }) => {
  const navigate = useNavigate();
  const [nameExists, setNameExists] = useState(false);

  const accountName = store.getState().account.name;
  const untrackedBalance = store.getState().account.untrackedBalance;

  const form = useForm({
    initialValues: {
      name: accountName || '',
      untrackedBalance: untrackedBalance || '',
    },
    validate: {
      name: (value) => {
        if (value.length < 1) return 'Account name must not be empty';
      },
    },
  });

  const handdleUpdateAccount = async () => {
    const updatedAccount: Account = {
      id: account.id,
      userId: store.getState().user.id,
    } as Account;
    if (form.values.name !== '') updatedAccount.name = form.values.name;
    if (form.values.untrackedBalance !== '')
      updatedAccount.untrackedBalance = parseFloat(form.values.untrackedBalance);

    try {
      await updateAccount(updatedAccount);
      console.log('Account Updated');
      navigate('/Accounts');
    } catch (error) {
      setNameExists(true);
    }
  };

  return (
    <Card className={classes.card} p="xl" radius="lg" withBorder>
      <form onSubmit={form.onSubmit(() => handdleUpdateAccount())}>
        <Title mb="lg">Edit Account</Title>
        <Stack>
          <TextInput
            label="Account Name"
            placeholder={account.name}
            value={form.values.name}
            error={form.errors.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          />
          <NumberInput
            label="Starting Balance"
            placeholder="0.00"
            allowNegative={false}
            decimalScale={2}
            thousandSeparator=","
            value={form.values.untrackedBalance}
            error={form.errors.untrackedBalance}
            hideControls
            leftSection="$"
            fixedDecimalScale={true}
            onChange={(event) => form.setFieldValue('untrackedBalance', event.toString())}
          />
        </Stack>

        <Stack justify="space-between" mt="xl" gap="xs">
          <Button onClick={() => navigate('/Accounts')}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
          {nameExists && (
            <Anchor ta="center" c="red" size="xs">
              Account name already exists
            </Anchor>
          )}
        </Stack>
      </form>
    </Card>
  );
};
