import { Text, Button, Paper, Center, Stack, createEventHandler } from '@mantine/core';
import { Account } from '../../Models/PanGoldenModels';
import { deleteAccount } from '../../Services/AccountService';

export const DeleteAccountConfirm = ({ account }: { account: Account }) => {

    
    const handleDelete = async () => {
        try {
            deleteAccount(account.id ? account.id : '');
            console.log('Account deleted');
            location.reload();
            
        } catch (error) {
            console.log('Error deleting account');
        }
    }

    return (
        <Paper>
            <Center>
                <Text>Are you sure you want to delete "{account.name}"</Text>
            </Center>
            <Stack mt="xl">
                <Button onClick={() => handleDelete()}>Delete</Button>
            </Stack>
        </Paper>
    )
}

