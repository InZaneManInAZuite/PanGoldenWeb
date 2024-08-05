import { Transaction, TransactionType } from '../../Models/PanGoldenModels';
import { store } from '../../App/Store';
import { updateTransaction, deleteTransaction } from '../../Services/TransactionService';
import { useForm } from '@mantine/form';
import { Text, TextInput, NumberInput, Paper, UnstyledButton } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconTrash, IconEdit, IconCheck, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import classes from './TransactionRow.module.css';

export const TransactionRow = ({ transact }: { transact: Transaction }) => {
  if (transact.type === 1) transact.amount = -(transact.amount || 0);
  const [editing, setEditing] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>(transact);
  if (!transaction.date) transaction.date = new Date();
  let dateDMY = `${transaction.date.getDate() || '01'}-${transaction.date.getMonth() || '01'}-${transaction.date.getFullYear() || '2024'}`;

  const handleEdit = async (updatedTransact: Transaction) => {
    try {
      await updateTransaction(updatedTransact);
      setTransaction(updatedTransact);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteTransaction(id);
      location.reload();
    } catch (error) {}
  };

  const form = useForm({
    initialValues: {
      date: transaction.date,
      amount: transaction.amount,
      description: transaction.description,
    },
    validate: {
      amount: (value) => {
        if (value === 0) return 'Amount must not be 0';
      },
    },
  });

  if (editing)
    return (
      <form
        onSubmit={form.onSubmit(() => {
          const updatedTransact: Transaction = { id: transaction.id } as Transaction;
          if (form.values.date) updatedTransact.date = form.values.date;
          if (form.values.amount) updatedTransact.amount = form.values.amount;
          if (form.values.description) updatedTransact.description = form.values.description;
          handleEdit(updatedTransact);
        })}
      >
        <Paper className={classes.row}>
          <DateInput
            placeholder={dateDMY}
            valueFormat="DD-MM-YYYY"
            maxDate={new Date()}
            className={classes.date}
            onChange={(event) =>
              form.setFieldValue('date', new Date(event?.toString() || new Date()))
            }
          />
          <NumberInput
            placeholder={transaction.amount?.toString() || ''}
            className={classes.amount}
            onChange={(event) => form.setFieldValue('amount', parseFloat(event.toString()))}
          />
          <TextInput
            placeholder=""
            className={classes.desc}
            onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
          />
          <Paper className={classes.icons}>
            <UnstyledButton type="submit">
              <IconCheck />
            </UnstyledButton>

            <IconX onClick={() => setEditing(false)} />
          </Paper>
        </Paper>
      </form>
    );

  return (
    <Paper className={classes.row}>
      <Paper className={classes.date}>
        <Text>{dateDMY}</Text>
      </Paper>
      <Paper className={classes.amount}>
        <Text>{transaction.amount}</Text>
      </Paper>
      <Paper className={classes.desc}>
        <Text>{transaction.description}</Text>
      </Paper>
      <Paper className={classes.icons}>
        <IconEdit onClick={() => setEditing(true)} />
        <IconTrash onClick={() => handleDelete(transaction.id || '')} />
      </Paper>
    </Paper>
  );
};
