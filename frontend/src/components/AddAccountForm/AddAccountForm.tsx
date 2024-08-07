import { useForm } from '@mantine/form';
import { TextInput, Button, Card, NumberInput, Stack, Anchor, Title } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { User, Account } from '../../Models/PanGoldenModels';
import { addAccount } from '../../Services/AccountService';
import { useNavigate } from 'react-router-dom';
import classes from './AddAccountForm.module.css';
import { store } from '../../App/Store';

export const AddAccountForm: React.FC = () => {
  const form = useForm({
    initialValues: {
      accountName: '',
      startBalance: '',
    },
    validate: {
      accountName: (value) => {
        if (value.length < 1) return 'Account name must not be empty';
      },
    },
  });

  const [nameExists, toggleNameExists] = useToggle([false, true]);
  const navigate = useNavigate();

  const user: User = store.getState().user as User;

  if (!user) {
    navigate('/Auth');
  }

  const handleAddAccount = async () => {
    const account: Account = {
      name: form.values.accountName,
      untrackedBalance: parseFloat(form.values.startBalance),
      userId: user.id || '',
    };
    try {
      await addAccount(account);
      navigate('/Accounts');
    } catch (error) {
      console.log('Account Name Already Exists');
      if (!nameExists) toggleNameExists();
    }
  };

  return (
    <Card p="xl" radius="lg" className={classes.card} withBorder>
      <form
        onSubmit={form.onSubmit(() => {
          handleAddAccount();
        })}
      >
        <Title mb="lg">Add Account</Title>
        <Stack>
          <TextInput
            label="Account Name"
            placeholder="Enter Account Name"
            value={form.values.accountName}
            onChange={(event) => form.setFieldValue('accountName', event.currentTarget.value)}
            error={form.errors.accountName}
            maxLength={15}
          />
          <NumberInput
            label="Starting Balance"
            placeholder="0.00"
            allowNegative={false}
            decimalScale={2}
            thousandSeparator=","
            value={form.values.startBalance}
            error={form.errors.startBalance}
            hideControls
            leftSection="$"
            fixedDecimalScale={true}
            onChange={(event) => form.setFieldValue('startBalance', event.toString())}
          />
        </Stack>

        <Stack justify="space-between" mt="xl">
          <Button type="submit">Submit</Button>
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
