import { Title, Stack, Divider } from '@mantine/core';
import { User, Account } from '../../Models/PanGoldenModels';
import { getAccountsByUser } from '../../Services/AccountService';
import { useState, useEffect } from 'react';
import { store } from '../../App/Store';
import { AccountCardList } from '../AccountCardList/AccountCardList';
import { Loading } from '../Loading/Loading';
import { AddNewAccountButton } from '../AddNewAccountButton/AddNewAccountButton';

import classes from './AccountPageComp.module.css';

export const AccountPageComp = () => {

    const [accounts, setAccounts] = useState<Account[]>([])
    const [loading, setLoading] = useState(false)

    const activeUser: User = store.getState().user as User

    const getAccounts = async () => {
        if (activeUser.id === undefined) return [];
        try {
            const accounts: Account[] = await getAccountsByUser(activeUser.id)
            return accounts;
        } catch (error) {
            return [];
        }
    }

    useEffect(() => {
        const initializeGetAccounts = async () => {
            setLoading(true);
            const accountsArray = await getAccounts()
            setAccounts(accountsArray)
            setLoading(false);
        }

        initializeGetAccounts();
    }, [])


    return (
        <Stack>
            <Title order={1}>Accounts</Title>
            <Divider />
            {loading ? <Loading /> : <AccountCardList accounts={accounts} />}
            <AddNewAccountButton />
        </Stack>
    )


}