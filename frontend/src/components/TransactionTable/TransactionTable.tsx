/*
All imports necessary for the TransactionTable component.
*/
// Model and Store Imports
import { Transaction, TransactionType } from '@/Models/PanGoldenModels';
import { store } from '@/App/Store';
// Service Imports
import {
  getTransactionsByAccount,
  updateTransaction,
  deleteTransaction,
} from '@/Services/TransactionService';
// All Mantine Component Imports
import {
  Table,
  TextInput,
  Group,
  Stack,
  Text,
  Paper,
  Center,
  ScrollArea,
  NumberInput,
  Card,
  UnstyledButton,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
// Other Component Imports
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { Loading } from '../Loading/Loading';
import { IconX, IconCheck } from '@tabler/icons-react';
// Style Imports
import classes from './TransactionTable.module.css';
// Other Imports
import { useEffect, useState } from 'react';
import { addTransaction } from '@/Services/TransactionService';

/*
The TransactionTable component displays a table of transactions for the current account.
It allows the user to edit and delete transactions.
*/
export const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      date: new Date(),
      amount: 0,
      description: '',
    },
    validate: {
      amount: (value) => {
        if (value === 0) return 'Amount must not be 0';
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const transacts = await getTransactionsByAccount(store.getState().account.id);
      transacts.forEach((transaction) => {
        transaction.date = new Date(transaction.date || new Date());
      });
      setTransactions(transacts);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    } catch (error) {}
  };

  const clearForm = () => {
    form.values.amount = 0;
    form.values.description = '';
    form.values.date = new Date();
  };

  const rows = transactions.map((transaction: Transaction) => {
    return <TransactionRow transact={transaction} key={transaction.id} />;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Center>
      <Stack gap="5">
        <Paper className={classes.row}>
          <Paper className={classes.date}>
            <Text>Date</Text>
          </Paper>
          <Paper className={classes.amount}>
            <Text>Amount</Text>
          </Paper>
          <Paper className={classes.desc}>
            <Text>Description</Text>
          </Paper>
          <Paper className={classes.icons}>
            <Text>Actions</Text>
          </Paper>
        </Paper>

        <form
          onSubmit={form.onSubmit(() => {
            const newTransact: Transaction = {
              date: form.values.date,
              description: form.values.description,
              accountId: store.getState().account.id,
            };
            if (form.values.amount > 0) {
              newTransact.amount = form.values.amount;
              newTransact.type = TransactionType.Gain;
            } else {
              newTransact.amount = -form.values.amount;
              newTransact.type = TransactionType.Lose;
            }
            console.log('newTransact', newTransact);
            addTransaction(newTransact);
            clearForm();
          })}
        >
          <Paper className={classes.row}>
            <DateInput
              radius="0"
              placeholder="DD-MM-YYYY"
              valueFormat="DD-MM-YYYY"
              maxDate={new Date()}
              className={classes.date}
              onChange={(event) =>
                form.setFieldValue('date', new Date(event?.toString() || new Date()))
              }
            />
            <NumberInput
              radius="0"
              placeholder="00.00"
              className={classes.amount}
              onChange={(event) => form.setFieldValue('amount', parseFloat(event.toString()))}
            />

            <TextInput
              placeholder=""
              className={classes.desc}
              radius="0"
              onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
            />

            <Card className={classes.add} p="6" withBorder radius="0">
              <UnstyledButton type="submit">
                <IconCheck />
              </UnstyledButton>
            </Card>
          </Paper>
        </form>

        <ScrollArea h="50vh">{rows}</ScrollArea>
      </Stack>
    </Center>
  );
};
