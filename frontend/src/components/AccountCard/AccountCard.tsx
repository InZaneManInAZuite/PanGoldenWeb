// Create cards for accounts

import { Card, Stack, Title, UnstyledButton } from '@mantine/core';
import { Account } from '../../Models/PanGoldenModels';
import classes from './AccountCard.module.css';

export const AccountCard = ({ account }: { account: Account }) => {
    return (
        <UnstyledButton onClick={() => {}}>
            <Card shadow="xs" padding="md" radius="md" className={classes.card}>
                <Stack gap="xs">
                    <Title>{account.name}</Title>
                    <Title order={2}>${account.balance}</Title>
                </Stack>
            </Card>
        </UnstyledButton>
    );
}