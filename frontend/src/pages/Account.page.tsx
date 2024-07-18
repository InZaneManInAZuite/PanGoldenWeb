// The main page for the application

import React from 'react';
import { Navigator } from '../components/Navigator/Navigator';
import { AccountPageComp } from '../components/AccountPageComp/AccountPageComp';

export const AccountPage: React.FC = () => {
    return (
        <Navigator>
            <AccountPageComp />
        </Navigator>
    );
};