import React, { useEffect } from 'react';
import { Navigator } from '../components/Navigator/Navigator';
import { EditAccount } from '../components/EditAccount/EditAccount';
import { store } from '../App/Store';
import { Account } from '../Models/PanGoldenModels';
import { useNavigate } from 'react-router-dom';

export const EditAccountPage: React.FC = () => {
  const [account, setAccount] = React.useState<Account>({} as Account);

  const navigate = useNavigate();
  const storedAccount = store.getState().account;

  if (!storedAccount.id || storedAccount.id === '') navigate('/Accounts');

  useEffect(() => {
    const startBalance = storedAccount.untrackedBalance ? storedAccount.untrackedBalance : '0.00';
    const account: Account = {
      id: storedAccount.id,
      name: storedAccount.name,
      untrackedBalance: parseFloat(startBalance),
    };
    setAccount(account);
  }, []);

  return (
    <Navigator>
      <EditAccount account={account} />
    </Navigator>
  );
};
