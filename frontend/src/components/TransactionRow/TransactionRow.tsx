
import { Transaction, TransactionType } from '../../Models/PanGoldenModels';
import { store } from '../../App/Store';
import { updateTransaction, deleteTransaction } from '../../Services/TransactionService';
import { useForm } from '@mantine/form';
import { Text, TextInput, NumberInput, Card, Table, Group, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconTrash, IconEdit, IconCheck, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';



export const TransactionRow = ({ transaction }: { transaction: Transaction }) => {

    const [editing, setEditing] = useState(true);
    if (!transaction.date) transaction.date = new Date();
    console.log(transaction.date);
    let dateDMY = `${transaction.date.getDate() || '01'}-${transaction.date.getMonth() || '01'}-${transaction.date.getFullYear() || '2024'}`;

    const handleEdit = async (transaction: Transaction) => {
        try {
            await updateTransaction(transaction);
            setEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (id: string) => {
        try {
            deleteTransaction(id);
        } catch (error) {
            console.log(error);
        }
    };




    if (editing) return (
        <Table.Tr>
                <Table.Td>
                    <DateInput
                        placeholder={dateDMY}
                        valueFormat="DD-MM-YYYY"
                        maxDate={new Date()}

                    />
                </Table.Td>
                <Table.Td>
                    <NumberInput
                        placeholder={transaction.amount?.toString() || ''}
                    />
                </Table.Td>
                <Table.Td>
                    <TextInput
                        placeholder=""
                    />
                </Table.Td>
                <Table.Td>
                    <Group>
                        <IconCheck type="submit" />
                        <IconX onClick={() => setEditing(false)} />
                    </Group>
                </Table.Td>
            
        </Table.Tr>
    );

    

    return (
        <Table.Tr>
            <Table.Td>
                <Text>{dateDMY}</Text>
            </Table.Td>
            <Table.Td>
                <Text>{transaction.amount}</Text>
            </Table.Td>
            <Table.Td>
                <Text>{transaction.description}</Text>
            </Table.Td>
            <Table.Td>
                <Group>
                    <IconEdit onClick={() => setEditing(true)} />
                    <IconTrash onClick={() => handleDelete(transaction.id || '')} />
                </Group>
            </Table.Td>
        </Table.Tr>
    );

}