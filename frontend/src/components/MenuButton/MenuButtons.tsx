import { UnstyledButton, Text } from '@mantine/core';
import {
    IconUser as IconUser,
    IconSettings as IconSettings,
    IconBuildingBank as IconAccounts,
    IconArrowsLeftRight as IconTransactions,
    IconReportAnalytics as IconAnalytics,

} from '@tabler/icons-react';
import classes from './MenuButtons.module.css';

interface NavbarLinkProps {
    icon: typeof IconUser;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
            <div><Icon className={classes.icon} stroke='2' /></div>
            <div className={classes.label}><Text>{label}</Text></div>
        </UnstyledButton>
    );
}

const menuOptions = [
    { icon: IconUser, label: 'User' },
    { icon: IconSettings, label: 'Settings' },
    { icon: IconAccounts, label: 'Accounts' },
    { icon: IconTransactions, label: 'Transactions' },
    { icon: IconAnalytics, label: 'Analytics' },
];

export function MenuButton() {}