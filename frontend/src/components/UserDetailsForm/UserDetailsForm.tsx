import {
  Card,
  Title,
  Text,
  Stack,
  Button,
  Anchor,
  Group,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { User } from '../../Models/PanGoldenModels';
import { store } from '../../App/Store';
import { IconEdit, IconX } from '@tabler/icons-react';
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { updateUser } from '../../Services/UserService';
import { useState } from 'react';

import classes from './UserDetailsForm.module.css';

export const UserDetailsForm = () => {
  const username: string = store.getState().user.username;
  const firstName: string = store.getState().user.firstName;
  const lastName: string = store.getState().user.lastName;

  const [saveFail, setSaveFail] = useState(false);
  const [edit, toggleEdit] = useToggle([false, true]);

  const form = useForm({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
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
    },
  });

  const handleSave = async () => {
    const user: User = {} as User;

    // Handle save logic here
    try {
      // Obtain user details to be changed
      if (form.values.username !== '') user.username = form.values.username;
      if (form.values.firstName !== '') user.firstName = form.values.firstName;
      if (form.values.lastName !== '') user.lastName = form.values.lastName;
      user.id = store.getState().user.id;

      // Update user details
      await updateUser(user);

      // Complete save process
      console.log('User changes successfully saved');
      store.dispatch({ type: 'user/setUser', payload: user });
      clearForm();
      setSaveFail(false);
      toggleEdit();
    } catch (error) {
      setSaveFail(true);
    }
  };

  const clearForm = () => {
    form.setFieldValue('username', '');
    form.setFieldValue('firstName', '');
    form.setFieldValue('lastName', '');
  };

  return (
    <Card p="xl" shadow="md" className={classes.userCard}>
      <form onSubmit={form.onSubmit(() => handleSave())}>
        <Group className={classes.cardTitle} mb="md">
          <Title order={3}>User Details</Title>

          <UnstyledButton>
            <Card shadow="0" p="0" className={classes.editButton} onClick={() => toggleEdit()}>
              {edit ? <IconX /> : <IconEdit />}
            </Card>
          </UnstyledButton>
        </Group>

        {!edit && (
          <Stack gap="0">
            <Text>Username: @{username}</Text>
            <Text>Firstname: {firstName}</Text>
            <Text>Lastname: {lastName}</Text>
          </Stack>
        )}

        {edit && (
          <Stack gap="sm">
            <TextInput
              label="Username"
              placeholder={username}
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              error={form.errors.username}
            />

            <TextInput
              label="Firstname"
              placeholder={firstName}
              value={form.values.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
            />

            <TextInput
              label="Lastname"
              placeholder={lastName}
              value={form.values.lastName}
              onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
            />

            {saveFail && (
              <Anchor ta="center" c="red" size="xs">
                Username already exists.
              </Anchor>
            )}
          </Stack>
        )}

        {edit && (
          <Button mt="xl" className={classes.saveButton} type="submit">
            Save Changes
          </Button>
        )}
      </form>
    </Card>
  );
};
