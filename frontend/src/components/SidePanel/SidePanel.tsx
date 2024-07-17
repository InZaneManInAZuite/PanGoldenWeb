import { useState } from 'react';
import { Center, UnstyledButton, Stack, rem, Text } from '@mantine/core';
import {
    IconZodiacCancer as IconLogo,

    IconUser as IconUser,
    IconSettings as IconSettings,
    IconBuildingBank as IconAccounts,
    IconArrowsLeftRight as IconTransactions,
    IconReportAnalytics as IconAnalytics,

} from '@tabler/icons-react';
import classes from './SidePanel.module.css';

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

export function SidePanel() {
    const [active, setActive] = useState('Accounts');

    const links = menuOptions.map((menuOption) => (
        <NavbarLink
            {...menuOption}
            key={menuOption.label}
            active={menuOption.label === active}
            onClick={() => {
                setActive(menuOption.label);
                localStorage.setItem('page', menuOption.label);
            }}
        />
    ));



    return (
        <nav className={classes.navbar}>
            <Center>
                <IconLogo type="mark" size={30} />
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>
        </nav>



    );
}