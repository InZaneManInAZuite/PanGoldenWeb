import { Stack, Divider, Title, Table, ScrollArea } from '@mantine/core';
import { TransactionsAccountSelector } from '../TransactionsAccountSelector/TransactionsAccountSelector';
import { Missing } from '../Missing/Missing';
import { useEffect, useState } from 'react';
import { store } from '../../App/Store';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { TransactionTable } from '../TransactionTable/TransactionTable';

export const TransactionPageComp = () => {

    const [noAccount, setNoAccount] = useState(false);
    const accountId: string = store.getState().account.id;


    useEffect(() => {
        if (!accountId || accountId === '') {
            setNoAccount(true);
        } else {
            setNoAccount(false);
        }
    }, []);



    return (
        <Stack>
            <Title order={1}>Transactions</Title>
            <Divider />
            <TransactionsAccountSelector />
            <Divider />
            {noAccount ? (<Missing text="No Account Selected" />) :
                <ScrollArea>
                    <TransactionTable />
                </ScrollArea>
            }
            <Divider />
            <ColorSchemeToggle />
        </Stack>
    );
};