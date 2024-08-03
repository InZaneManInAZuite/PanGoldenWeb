import { AccountCard } from '../AccountCard/AccountCard';
import { User, Account, Transaction } from '../../Models/PanGoldenModels';
import classes from './AccountCardList.module.css';
import { Group } from '@mantine/core';
import { getAccountsByUser } from '@/Services/AccountService';
import { useEffect, useState } from 'react';
import { store } from '../../App/Store';
import { Loading } from '../Loading/Loading';
import { Missing } from '../Missing/Missing';


export const AccountCardList = () => {

    const user = store.getState().user as User;
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [noAccounts, setNoAccounts] = useState(false);

    const getAccounts = async () => {
        if (!user.id) return;
        const accounts = await getAccountsByUser(user.id);
        return accounts;
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const accounts = await getAccounts();
            if (!accounts || accounts.length === 0) {
                setNoAccounts(true);
            } else {
                setAccounts(accounts);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    addEventListener('accountsChanged', () => {
        const fetchData = async () => {
            setLoading(true);
            const accounts = await getAccounts();
            if (!accounts || accounts.length === 0) {
                setNoAccounts(true);
            } else {
                setAccounts(accounts);
            }
            setLoading(false);
        }

        fetchData();
    });


    if (loading) {
        return <Loading />;
    }

    if (noAccounts) {
        return (
            <Missing text="No accounts found" />
        );
    }

    return (
        <Group className={classes.accountCardList} mt="xl">
            {accounts.map(account => <AccountCard account={account} key={account.id}/>)}
        </Group>
    )

}
