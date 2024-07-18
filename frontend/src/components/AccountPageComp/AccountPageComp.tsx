// 

import { Card, Title, Text, Stack, UnstyledButton, Group } from '@mantine/core';
import { User, Account } from '../../Models/PanGoldenModels';
import { getAccountsByUser } from '../../Services/AccountService';
import { AccountCard } from '../AccountCard/AccountCard';
import { IconPlus } from '@tabler/icons-react';

import classes from './AccountPageComp.module.css';

export const AccountPageComp = () => {

    const activeUser: User = JSON.parse(localStorage.getItem('user') as string) as User

    const getAccounts = async () => {

        if (activeUser.id === undefined) return (<Text>Failed to obtain accounts</Text>)
        try {
            const accounts: Account[] = await getAccountsByUser(activeUser.id)
            if (accounts === undefined) return (<Text>No Accounts Found</Text>)
            return accounts.map((account: Account) => {
                return (
                    <AccountCard account={account} />
                )
            })
        } catch (error) {
            return (<Text>Failed to obtain accounts</Text>)
        }


    }




    return (
        <Stack>
            <Title order={1}>Accounts</Title>


            <UnstyledButton>
                <Card shadow="xs" padding="md" radius="md">
                    <Group >
                        <Title order={2}>Add Account</Title>
                        <IconPlus size={24} />
                    </Group>

                </Card>

            </UnstyledButton>





        </Stack>
    )


}