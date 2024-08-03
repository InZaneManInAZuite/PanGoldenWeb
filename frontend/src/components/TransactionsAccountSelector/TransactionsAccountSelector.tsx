import { Group, Menu, Card, Text } from '@mantine/core';
import { getAccountsByUser } from '@/Services/AccountService';
import { store } from '../../App/Store';
import { useEffect, useState } from 'react';
import { Account } from '@/Models/PanGoldenModels';
import { IconChevronDown as IconDown, IconBuildingBank as IconAccount } from '@tabler/icons-react';
import GetBalance from '@/Features/GetBalance';

import classes from './TransactionsAccountSelector.module.css';

const format = Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' });

const storeAccount = (account: Account) => {
  const copy: Account = {
    id: account.id,
    name: account.name,
    balance: account.balance,
    untrackedBalance: account.untrackedBalance,
  } as Account;

  store.dispatch({ type: 'accounts/setAccount', payload: copy });
};

export const TransactionsAccountSelector = () => {
  const account: Account = {
    id: store.getState().account.id,
    name: store.getState().account.name,
    balance: parseFloat(store.getState().account.balance),
    untrackedBalance: parseFloat(store.getState().account.untrackedBalance),
  } as Account;

  const [noAccount, setNoAccount] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [balance, setBalance] = useState<number>(0.0);
  const [loading, setLoading] = useState(false);

  const getAccounts = async () => {
    const userId: string = store.getState().user.id;
    try {
      const accounts = await getAccountsByUser(userId);
      return accounts;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      const accounts = await getAccounts();
      setAccounts(accounts);
      const balance = await GetBalance(account);
      setBalance(balance || 0);
      setLoading(false);
    };

    if (!account.id || account.id === '') setNoAccount(true);
    fetchAccounts();
  }, []);

  return (
    <Group className={classes.row}>
      <IconAccount size={30} />

      <Menu width={175}>
        <Menu.Target>
          <Card withBorder p="xs" className={classes.account}>
            <Text>{noAccount ? 'Select Account' : account.name}</Text>
            <IconDown size={20} />
          </Card>
        </Menu.Target>
        <Menu.Dropdown className={classes.menu}>
          <Menu.Label>Accounts</Menu.Label>
          {accounts.map((account) => {
            return (
              <Menu.Item
                key={account.id}
                onClick={() => {
                  storeAccount(account);
                  location.reload();
                }}
              >
                <Text size="sm">{account.name}</Text>
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>

        <Text>Current Balance: {loading ? '$--.--' : format.format(balance)}</Text>
      </Menu>
    </Group>
  );
};
