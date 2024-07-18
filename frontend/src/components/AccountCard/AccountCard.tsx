// Create cards for accounts

import { Card, Stack, Title, UnstyledButton } from '@mantine/core';
import { Account } from '../../Models/PanGoldenModels';
import classes from './AccountCard.module.css';

export const AccountCard = ({ account }: { account: Account }) => {
    return (
        <UnstyledButton onClick={() => localStorage.setItem('Account', account.name)}>
            <Card shadow="xs" padding="md" radius="md" className={classes.card}>
                <Stack gap="xs">
                    <Title>{account.name}</Title>

                </Stack>
            </Card>
        </UnstyledButton>
    );
}