// Create cards for accounts

import { Card, Stack, Title, UnstyledButton, Group, Text } from '@mantine/core';
import { Account } from '../../Models/PanGoldenModels';
import classes from './AccountCard.module.css';
import { IconDotsVertical as IconInfo } from '@tabler/icons-react';

export const AccountCard = ({ account }: { account: Account }) => {
    return (
        <UnstyledButton onClick={() => {}}>
            <Card shadow="lg" padding="sm" radius="md" className={classes.card}>
                <Group>
                <Stack gap="0px">
                    <Title order={3}>{account.name}</Title>
                    <Text>${account.balance || '0.00' }</Text>
                </Stack>

                <IconInfo size={25} />

                </Group>
            </Card>
        </UnstyledButton>
    );
}