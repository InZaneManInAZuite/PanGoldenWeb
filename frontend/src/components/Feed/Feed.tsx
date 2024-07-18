
import { AccountPageComp } from '../AccountPageComp/AccountPageComp';
import { AuthForm } from '../AuthForm/AuthForm';
import { Paper } from '@mantine/core';

export const Feed = () => {
    var currentPage = localStorage.getItem('page');

    function renderPage() {
        switch (currentPage) {
            case 'Accounts':
                return <AccountPageComp />;
            default:
                return <AuthForm />;
        }
    }

    addEventListener('pageChange', () => {
        return (
            <Paper p='lg'>
                {renderPage()}
            </Paper>
        )

    });

    return (
        <Paper p='lg'>
            {renderPage()}
        </Paper>
    );
}
