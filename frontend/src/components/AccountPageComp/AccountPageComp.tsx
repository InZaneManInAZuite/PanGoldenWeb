import { Title, Stack, Divider } from '@mantine/core';
import { AccountCardList } from '../AccountCardList/AccountCardList';
import { AddNewAccountButton } from '../AddNewAccountButton/AddNewAccountButton';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export const AccountPageComp = () => {


    return (
        <Stack>
            <Title order={1}>Accounts</Title>
            <Divider />
            <AccountCardList/>
            <AddNewAccountButton />
            <ColorSchemeToggle />
        </Stack>
    )


}