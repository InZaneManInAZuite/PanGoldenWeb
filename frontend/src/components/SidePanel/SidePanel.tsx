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
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../AuthForm/AuthForm';
import { Welcome } from '../Welcome/Welcome';

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
    { icon: IconUser, label: 'User', link: '/User' },
    { icon: IconSettings, label: 'Settings', link: '/Settings' },
    { icon: IconAccounts, label: 'Accounts', link: '/Accounts' },
    { icon: IconTransactions, label: 'Transactions', link: '/Transactions' },
    { icon: IconAnalytics, label: 'Analytics', link: '/Analytics' },
];

export function SidePanel() {
    const [active, setActive] = useState('Accounts');
    const navigate = useNavigate();

    const links = menuOptions.map((menuOption) => (
        <NavbarLink
            {...menuOption}
            key={menuOption.label}
            active={menuOption.label === active}
            onClick={() => {
                setActive(menuOption.label);
            }}
        />
    ));



    return (
        <div>
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
            

            {active === 'Accounts' && <AuthForm />}
            {active === 'Settings' && <Welcome />}
        </div>



    );
}