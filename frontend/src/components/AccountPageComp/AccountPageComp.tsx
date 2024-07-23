import { Card, Title, Text, Stack, UnstyledButton, Group, Divider } from '@mantine/core';
import { User, Account } from '../../Models/PanGoldenModels';
import { getAccountsByUser } from '../../Services/AccountService';
import { AccountCard } from '../AccountCard/AccountCard';
import { IconPlus } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AccountPageComp.module.css';

export const AccountPageComp = () => {

    const [accounts, setAccounts] = useState<Account[]>([])

    const activeUser: User = JSON.parse(localStorage.getItem('user') as string) as User

    const navigate = useNavigate();

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

            <Divider />

            <Group gap="sm" mt="xl" className={classes.accountCard}>
                {accounts.map((account, index) => {
                    return <AccountCard key={index} account={account} />
                })}
            </Group>

            {accounts.length === 0 && (
                <div className={classes.noAccounts}>
                    <Text>No Accounts Found</Text>
                </div>
            )}

            <Group justify="center">
                <UnstyledButton onClick={() => navigate('/Accounts/Add')} mt="lg">
                    <Card shadow="xs" padding="md" radius="md" className={classes.newAccount}>
                        <Group>
                            <Title order={2}>Add Account</Title>
                            <IconPlus size={24} />
                        </Group>

                    </Card>

                </UnstyledButton>
            </Group>




        </Stack>
    )


}