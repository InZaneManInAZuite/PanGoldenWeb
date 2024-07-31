import { AccountCard } from '../AccountCard/AccountCard';
import { Account } from '../../Models/PanGoldenModels';
import classes from './AccountCardList.module.css';
import { Group, Text, Card } from '@mantine/core';

export const AccountCardList = (props: { accounts: Account[] }) => {

    if (props.accounts.length === 0) {
        return (
            <Group gap="lg" mt="xl" className={classes.accountCardList}>
                <Card className={classes.noAccount}>
                    <Text >No Accounts Found</Text>
                </Card>
            </Group>
        );
    }

    return (
        <Group gap="sm" mt="xl" className={classes.accountCardList}>
            {props.accounts.map((account, index) => {
                return <AccountCard key={index} account={account} />
            })}
        </Group>
    );
}
