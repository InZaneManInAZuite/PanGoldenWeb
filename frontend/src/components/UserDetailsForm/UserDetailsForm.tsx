import { Card, Title, Text, Stack, Button, Anchor, Group, Paper, TextInput } from '@mantine/core';
import { User } from '../../Models/PanGoldenModels';
import { store } from '../../App/Store';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';

import classes from './UserDetailsForm.module.css';

export const UserDetailsForm = () => {

    const [edit, setEdit] = useState('');

    return (
        <Stack p="md">
            <Card p="xl" shadow="md" className={classes.userCard}>
                <Title mb="md" order={3}>User Details</Title>


                <Group>
                    <Paper>
                        {edit === 'username'
                            ? <TextInput />
                            : <Text>Username: @{store.getState().user.username}</Text>}
                    </Paper>

                    <IconEdit className={classes.editIcons} />
                </Group>


                <Text>
                    Firstname: {store.getState().user.firstName}
                </Text>

                <Text>
                    Lastname: {store.getState().user.lastName}
                </Text>


                <Button mt="xl" className={classes.saveButton}>
                    Save Changes
                </Button>
            </Card>
        </Stack>
    );
}
