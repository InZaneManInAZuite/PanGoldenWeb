// Create a login and sign up form


import { Anchor, Card, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './AuthForm.module.css';

import { useToggle } from '@mantine/hooks';

import { User } from '../../Models/PanGoldenModels';
import { authenticateUser, addUser } from '../../Services/UserService';

import { useNavigate } from 'react-router-dom';

export const AuthForm: React.FC = () => {

    const [type, toggleType] = useToggle(['Login', 'Sign Up']);
    const [loginFail, toggleLoginFail] = useToggle([false, true]);
    const [registerFail, toggleRegister] = useToggle([false, true]);
    const navigate = useNavigate();


    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            loginFailed: false,
        },

        validate: {
            username: (value) => {
                if (value.length <= 5) {
                    return 'Username must be at least 5 characters long';
                }
                if (value.length >= 20) {
                    return 'Username must be at most 20 characters long';
                }
            },
            password: (value) => {
                if (value.length <= 8) {
                    return 'Password must be at least 8 characters long';
                }
            },
            confirmPassword: (value) => {
                if (value !== form.values.password && type === 'Sign Up') {
                    return 'Passwords do not match';
                }
            }
        }
    });

    const handleLogin = async () => {
        // Handle login logic here
        try {
            await authenticateUser(form.values.username, form.values.password);
            console.log("User successfully logged in");
            navigate('/Accounts');
            
        } catch (error) {
            console.log("User failed to log in");
            if (loginFail === false) {
                toggleLoginFail();
            }
        }
    };

    const handleSignUp = async () => {
        // Handle sign up logic here
        const user: User = {
            firstName: form.values.firstName,
            lastName: form.values.lastName,
            username: form.values.username,
            password: form.values.password,
        };
        console.log(user);
        try {
            await addUser(user);
            ClearForm();
            toggleType();
            console.log("User successfully registered");

        } catch (error) {
            console.log("User failed to register");
            if (registerFail === false) {
                toggleRegister();
            }
        }
    };

    const ClearForm = () => {
        // Clear form fields
        form.setFieldValue('password', '');
        form.setFieldValue('username', '');
        form.setFieldValue('firstName', '');
        form.setFieldValue('lastName', '');
        form.setFieldValue('confirmPassword', '');
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
                                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                            />
                        )}
                        {type === 'Sign Up' && (
                            <TextInput
                                label="Lastname"
                                placeholder="Your Lastname"
                                value={form.values.lastName}
                                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                            />
                        )}



                        <TextInput
                            label="Username"
                            placeholder="Your Username"
                            value={form.values.username}
                            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                            error={form.errors.username}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your Password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password}
                        />



                        {type === 'Sign Up' && (
                            <PasswordInput
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                value={form.values.confirmPassword}
                                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                            />)}



                        {type === 'Login' && loginFail === true && (
                            <Anchor ta="center" c="red" size="xs">
                                Login Failed. Try Again
                            </Anchor>
                        )}
                        {type === 'Sign Up' && registerFail === true && (
                            <Anchor ta="center" c="red" size="xs">
                                Username already used. Try Again
                            </Anchor>
                        )}
                    </Stack>



                    <Stack justify="space-between" mt="xl">
                        <Button type="submit" radius="sm"  >
                            {type}
                        </Button>
                        <Anchor ta="center" component="button" type="button" c="dimmed" onClick={() => { toggleType(); }} size="xs">
                            {type === 'Login' ? 'Create an account' : 'Already have an account?'}
                        </Anchor>
                    </Stack>



                </form>
            </Card>
        </div>
    );
};