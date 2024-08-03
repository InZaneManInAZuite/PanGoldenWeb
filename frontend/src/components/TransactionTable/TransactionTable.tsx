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
import { Table, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
// Other Component Imports
import { TransactionRow } from '../TransactionRow/TransactionRow';
import { Loading } from '../Loading/Loading';
import { IconTrash, IconEdit } from '@tabler/icons-react';
// Style Imports
import classes from './TransactionTable.module.css';
// Other Imports
import { useEffect, useState } from 'react';

/*
The TransactionTable component displays a table of transactions for the current account.
It allows the user to edit and delete transactions.
*/
export const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.log(error);
    }
  };

  const rows = transactions.map((transaction: Transaction) => {
    return <TransactionRow transaction={transaction} key={transaction.id} />;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
