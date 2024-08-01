import { Card, Title, Text, Stack, Button, Anchor, Group, Paper, TextInput, UnstyledButton, PasswordInput } from '@mantine/core';
import { User } from '../../Models/PanGoldenModels';
import { store } from '../../App/Store';
import { IconEdit, IconX } from '@tabler/icons-react';
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { updateUser, authenticateUser } from '../../Services/UserService';
import { useState } from 'react';

import classes from './ChangePassForm.module.css';

export const ChangePassForm = () => {

    const [wrongPass, setWrongPass] = useState(false);

    const form = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }, validate: {
            oldPassword: (value) => {
                if (value.length <= 8) {
                    return 'Password must be at least 8 characters long';
                }
            },
            newPassword: (value) => {
                if (value.length <= 8) {
                    return 'Password must be at least 8 characters long';
                }
            },
            confirmPassword: (value) => {
                if (value !== form.values.newPassword) {
                    return 'Passwords do not match';
                }
            }
        }
    });

    const handleChanges = async () => {
        // Handle changes logic here
        try {
            const user = await authenticateUser(store.getState().user.username, form.values.oldPassword);
            console.log("User successfully authenticated");
            user.password = form.values.newPassword;
            await updateUser(user);
            console.log("User password successfully changed");

            // Complete handling
            setWrongPass(false);
            clearForm();

        } catch (error) {
            setWrongPass(true);
        }
    }

    const clearForm = () => {
        form.setValues({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };



    return (
        <Card shadow="md" p="xl" className={classes.changePassCard}>
            <form onSubmit={form.onSubmit(() => handleChanges())}>

                <Title order={3} mb="lg">Change Password</Title>
                <Stack>
                    <PasswordInput
                        label="Old Password"
                        placeholder="Old Password"
                        value={form.values.oldPassword}
                        onChange={(event) => form.setFieldValue('oldPassword', event.currentTarget.value)}
                        error={form.errors.oldPassword}
                    />
                    <PasswordInput
                        label="New Password"
                        placeholder="New Password"
                        value={form.values.newPassword}
                        onChange={(event) => form.setFieldValue('newPassword', event.currentTarget.value)}
                        error={form.errors.newPassword}
                    />
                    <PasswordInput
                        label="Comfirm New Password"
                        placeholder="Confirm New Password"
                        value={form.values.confirmPassword}
                        onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                        error={form.errors.confirmPassword}
                    />
                    {wrongPass && <Text c="red" size="xs" ta="center">Incorrect password</Text>}
                    <Button mt="lg" fullWidth type="submit">Change Password</Button>
                </Stack>
            </form>
        </Card>
    )
}

