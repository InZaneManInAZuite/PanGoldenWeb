import { Card, Title, Text, Stack, UnstyledButton, Group } from '@mantine/core';
import { User, Account } from '../../Models/PanGoldenModels';
import { getAccountsByUser } from '../../Services/AccountService';
import { AccountCard } from '../AccountCard/AccountCard';
import { IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

import classes from './AccountPageComp.module.css';

export const AccountPageComp = () => {

    const [accounts, setAccounts] = useState<Account[]>([])

    const activeUser: User = JSON.parse(localStorage.getItem('user') as string) as User

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
            const accountsArray = await getAccounts()
            setAccounts(accountsArray)
        }

        initializeGetAccounts();
    }, [])




    return (
        <Stack>
            <Title order={1}>Accounts</Title>

            <Stack gap="md" className={classes.accountCard}>
                {accounts.map((account, index) => {
                    return <AccountCard key={index} account={account} />
                })}
            </Stack>

            {accounts.length === 0 && (
                <div className={classes.noAccounts}>
                    <Text>No Accounts Found</Text>
                </div>
            )}

            <UnstyledButton>
                <Card shadow="xs" padding="md" radius="md"  className={classes.newAccount}>
                    <Group>
                        <Title order={2}>Add Account</Title>
                        <IconPlus size={24} />
                    </Group>

                </Card>

            </UnstyledButton>





        </Stack>
    )


}