import { Anchor, Text, Card, Button, Group, TextInput, PasswordInput, Stack } from '@mantine/core';
import { theme } from '../Theme';
import classes from './FormStyles.module.css';

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export function LoginForm() {

    // add hooks
    const [type, toggle] = useToggle(['login', 'register']);

    // add form
    const form = useForm({
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
        },
        validate: {
            username: (value) => {
                if (value.trim().length < 6) {
                    return 'Username should include at least 6 characters';
                }
                if (value.trim().length > 15) {
                    return 'Username should be at most 15 characters';
                }
            },
            password: (value) => {
                if (value.trim().length < 6) {
                    return 'Password should include at least 6 characters';
                }
                if (!/\d/.test(value)) {
                    return 'Password should include at least one digit';
                }
            },
        }
    });

    

    return (
        <Card radius='md' shadow='xs' padding='xl' bg='dark'>
            <Text size="lg" fw={500}>
                Welcome to PanGolden, {type} to continue
            </Text>

            <form onSubmit={form.onSubmit(() => { })}>
                <Stack>
                    {type === 'register' && (
                        <TextInput 
                            label="Firstname"
                            placeholder="Your firstname"
                            value={form.values.firstname}
                            onChange={(event) => form.setFieldValue('firstname', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    {type === 'register' && (
                        <TextInput 
                            label="Lastname"
                            placeholder="Your lastname"
                            value={form.values.lastname}
                            onChange={(event) => form.setFieldValue('lastname', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput 
                        required
                        label="Username"
                        placeholder="Create username"
                        value={form.values.username}
                        onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                        error={form.errors.username && 'Invalid username'}
                        radius="md"
                    />

                    <PasswordInput 
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password invalid'}
                        radius="md"
                    />

                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Card>
    );
}
