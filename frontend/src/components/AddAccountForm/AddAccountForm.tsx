import { useForm } from '@mantine/form';
import { TextInput, Button, Card, NumberInput, Stack, Anchor } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { User, Account } from '../../Models/PanGoldenModels';
import { addAccount } from '../../Services/AccountService';
import { useNavigate } from 'react-router-dom';
import classes from './AddAccountForm.module.css';

export const AddAccountForm: React.FC = () => {

    const form = useForm({
        initialValues: {
            accountName: '',
            startBalance: 0.00,
        },
        validate: {
            accountName: (value) => {
                if (value.length < 1) return 'Account name must not be empty';
            },
        }
    });

    const [nameExists, toggleNameExists] = useToggle([false, true]);
    const navigate = useNavigate();

    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
        navigate('/Auth');
    }

    const handleAddAccount = async () => {
        const account: Account = {
            name: form.values.accountName,
            untrackedBalance: form.values.startBalance,
            userId: user.id || '',
        };
        try {
            await addAccount(account);
            navigate('/Accounts');
        } catch (error) {
            console.error(error);
            if (!nameExists) toggleNameExists();
        }
    }



    return (
        <Card p="xl" radius="lg" className={classes.card} withBorder>
            <form onSubmit={form.onSubmit(() => {
                handleAddAccount();
            })}>
                <Stack>
                    <TextInput
                        label="Account Name"
                        placeholder="Enter Account Name"
                        value={form.values.accountName}
                        onChange={(event) => form.setFieldValue('accountName', event.currentTarget.value)}
                        error={form.errors.accountName}
                        maxLength={20}
                    />
                    <NumberInput
                        label="Starting Balance"
                        placeholder="0.00"
                        allowNegative={false}
                        decimalScale={2}
                        thousandSeparator=','
                        value={form.values.startBalance}
                        error={form.errors.startBalance}
                        hideControls
                        leftSection="$"
                        fixedDecimalScale={true}
                    />
                </Stack>



                <Stack justify='space-between' mt='xl'>
                    <Button type="submit">Submit</Button>
                    {nameExists &&
                        <Anchor ta="center" c="red" size="xs">
                            Account name already exists
                        </Anchor>
                    }
                </Stack>
            </form>
        </Card>
    )
}