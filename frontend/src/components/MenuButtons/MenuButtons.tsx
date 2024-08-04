import { UnstyledButton, Text } from '@mantine/core';
import {
  IconUser as IconUser,
  IconBuildingBank as IconAccounts,
  IconArrowsLeftRight as IconTransactions,
  IconReportAnalytics as IconAnalytics,
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from './MenuButtons.module.css';
import { useNavigate } from 'react-router-dom';
import { store } from '../../App/Store';

interface NavbarLinkProps {
  icon: typeof IconUser;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
      <div>
        <Icon className={classes.icon} stroke="2" />
      </div>
      <div className={classes.label}>
        <Text>{label}</Text>
      </div>
    </UnstyledButton>
  );
}

const menuOptions = [
  { icon: IconUser, label: 'User' },
  { icon: IconAccounts, label: 'Accounts' },
  { icon: IconTransactions, label: 'Transactions' }
];

export const MenuButtons = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(store.getState().page.page || '');
  const links = menuOptions.map((menuOption) => (
    <NavbarLink
      {...menuOption}
      key={menuOption.label}
      active={menuOption.label === active}
      onClick={() => {
        setActive(menuOption.label);
        store.dispatch({ type: 'Page/setPage', payload: menuOption.label });
        navigate('/' + menuOption.label);
      }}
    />
  ));

  return links;
};
