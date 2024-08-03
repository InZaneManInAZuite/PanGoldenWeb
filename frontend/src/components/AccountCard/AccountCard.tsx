// Create cards for accounts

import { Card, Stack, Title, Group, Text, Popover, Divider, Paper, Modal } from '@mantine/core';
import { Account, Transaction } from '../../Models/PanGoldenModels';
import classes from './AccountCard.module.css';
import {
  IconDotsVertical as IconInfo,
  IconTrash as IconDelete,
  IconEdit,
} from '@tabler/icons-react';
import { getTransactionsByAccount } from '@/Services/TransactionService';
import { useEffect, useState } from 'react';
import { store } from '../../App/Store';
import { useNavigate } from 'react-router-dom';
import { DeleteAccountConfirm } from '../DeleteAccountConfirm/DeleteAccountConfirm';
import GetBalance from '@/Features/GetBalance';

export const AccountCard = ({ account }: { account: Account }) => {
  const [balanced, setBalanced] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openedModal, setOpenedModal] = useState(false);
  const [disabled, setdisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const balance = await GetBalance(account);
      setBalanced(balance || 0);
      setLoading(false);
    };
    fetchData();
  }, []);

  const setPage = (page: string) => {
    store.dispatch({ type: 'Page/setPage', payload: page });
  };

  const setAccount = (account: Account) => {
    store.dispatch({ type: 'accounts/setAccount', payload: account });
  };

  return (
    <>
      <Card radius="md" className={classes.card} withBorder p="0">
        <Group className={classes.allContent}>
          <Card
            className={classes.content}
            p="md"
            onClick={() => {
              setAccount(account);
              setPage('Transactions');
              navigate('/Transactions');
            }}
          >
            <Stack gap="0px">
              <Title order={3}>{account.name}</Title>
              {loading ? <Text>$--.--</Text> : <Text>${balanced || '0.00'}</Text>}
            </Stack>
          </Card>

          <Popover position="right" disabled={disabled}>
            <Popover.Target>
              <Card className={classes.info} p="0">
                <IconInfo size={30} />
              </Card>
            </Popover.Target>
            <Popover.Dropdown p="5">
              <Card
                className={classes.info}
                p="2"
                mb="2"
                onClick={() => {
                  setAccount(account);
                  navigate('/Accounts/Edit');
                }}
              >
                <IconEdit size={30} />
              </Card>
              <Divider />
              <Card className={classes.info} p="2" mt="2">
                <IconDelete
                  size={30}
                  onClick={() => {
                    setdisabled(true);
                    setOpenedModal(true);
                  }}
                />
              </Card>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Card>

      <Modal
        opened={openedModal}
        onClose={() => {
          setOpenedModal(false);
          setdisabled(false);
        }}
      >
        <DeleteAccountConfirm account={account} />
      </Modal>
    </>
  );
};
