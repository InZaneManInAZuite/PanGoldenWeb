// Create cards for accounts

import { Card, Stack, Title, Group, Text, Popover, Divider, Button, Modal } from '@mantine/core';
import { Account, Transaction } from '../../Models/PanGoldenModels';
import classes from './AccountCard.module.css';
import {
    IconDotsVertical as IconInfo,
    IconTrash as IconDelete,
    IconEdit
} from '@tabler/icons-react';
import { getTransactionsByAccount } from '@/Services/TransactionService';
import { useEffect, useState } from 'react';
import { store } from '../../App/Store';
import { useNavigate } from 'react-router-dom';
import { DeleteAccountConfirm } from '../DeleteAccountConfirm/DeleteAccountConfirm';

export const AccountCard = ({ account }: { account: Account }) => {

    const [balanced, setBalanced] = useState(0);
    const [loading, setLoading] = useState(true);
    const [openedModal, setOpenedModal] = useState(false);
    const [active, setActive] = useState(false);

    const navigate = useNavigate();


    const getTransactions = async () => {
        if (!account.id) return;
        const transactions = await getTransactionsByAccount(account.id);
        return transactions;
    }

    const getBalance = async () => {
        const transactions = await getTransactions();
        if (!transactions || transactions.length === 0) return account.untrackedBalance;
        let balance = account.untrackedBalance || 0;
        transactions.forEach((transaction: Transaction) => {
            switch (transaction.type) {
                case 0:
                    balance += transaction.amount || 0;
                    break;
                case 1:
                    balance -= transaction.amount || 0;
                    break;
                default:
                    break;
            }
        });

        return balance;
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const balance = await getBalance();
            setBalanced(balance || 0);
            setLoading(false);
        }
        fetchData();
    }, []);






    return (
        <>
            <Card radius="md" className={classes.card} withBorder>

                <Group className={classes.contents}>

                    <Stack gap="0px">
                        <Title order={3}>{account.name}</Title>
                        {loading ? <Text>$--.--</Text> : <Text>${balanced || '0.00'}</Text>}
                    </Stack>




                    <Popover position="right" disabled={active}>
                        <Popover.Target>
                            <Card className={classes.info} p='2'>
                                <IconInfo size={30} />
                            </Card>
                        </Popover.Target>
                        <Popover.Dropdown p="5">
                            <Card className={classes.info} p='2' mb="2" onClick={() => {
                                store.dispatch({ type: 'accounts/setAccount', payload: account });
                                navigate('/Accounts/Edit');
                            }}>
                                <IconEdit size={30} />
                            </Card>
                            <Divider />
                            <Card className={classes.info} p='2' mt="2">
                                <IconDelete size={30} onClick={() => {
                                    setActive(true);
                                    setOpenedModal(true);
                                }} />
                            </Card>
                        </Popover.Dropdown>
                    </Popover>


                </Group>
            </Card>


            <Modal opened={openedModal} onClose={() => {
                setOpenedModal(false);
                setActive(false);
                }} >
                <DeleteAccountConfirm account={account} />
            </Modal>
        </>
    );
}