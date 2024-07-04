// Create a login and sign up form


import { Anchor, Card, Group, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './AuthForm.module.css';


import { useToggle, upperFirst } from '@mantine/hooks';
import React, { useState } from 'react';

export const AuthForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [type, toggle] = useToggle(['Login', 'Sign Up']);

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            username: (value) => {
                if (value.length <= 5) {
                    return 'Username must be at least 5 characters long';
                }
                if (value.length >= 15) {
                    return 'Username must be at most 15 characters long';
                }
            },
            password: (value) => {
                if (value.length <= 8) {
                    return 'Password must be at least 8 characters long';
                }
            },
            confirmPassword: (value) => {
                if (value !== form.values.password) {
                    return 'Passwords do not match';
                }
            }
        }
    });

    const handleLogin = () => {
        // Handle login logic here
    };

    const handleSignUp = () => {
        // Handle sign up logic here
    };



    return (
        <div>
            <Card radius="lg" p="xl" className={classes.AuthCard} withBorder>
                <form onSubmit={form.onSubmit(() => {
                    if (type === 'Login') {
                        handleLogin();
                    } else {
                        handleSignUp();
                    }
                })}>



                    <Stack>
                        {type === 'Sign Up' && (
                            <TextInput
                                label="Firstname"
                                placeholder="Your Firstname"
                                value={form.values.firstName}
                                onChange={(event) => setFirstName(event.currentTarget.value)}
                            />
                        )}
                        {type === 'Sign Up' && (
                            <TextInput
                                label="Lastname"
                                placeholder="Your Lastname"
                                value={form.values.lastName}
                                onChange={(event) => setLastName(event.currentTarget.value)}
                            />
                        )}



                        <TextInput
                            label="Username"
                            placeholder="Your Username"
                            value={form.values.username}
                            onChange={(event) => setUsername(event.currentTarget.value)}
                            error={form.errors.username}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your Password"
                            value={form.values.password}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                            error={form.errors.password}
                        />
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            value={form.values.confirmPassword}
                            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                        />
                    </Stack>



                    <Stack justify="space-between" mt="xl">
                        <Button type="submit" radius="sm"  >
                            {type}
                        </Button>
                        <Anchor ta="center" component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'Login' ? 'Create an account' : 'Already have an account?'}
                        </Anchor>
                    </Stack>



                </form>
            </Card>
        </div>
    );
};