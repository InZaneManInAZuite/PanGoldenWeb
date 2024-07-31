// The main page for the application

import React from 'react';
import { Navigator } from '../components/Navigator/Navigator';
import { UserPageComp } from '@/components/UserPageComp/UserPageComp';

export const UserPage: React.FC = () => {
    return (
        <Navigator>
            <UserPageComp />
        </Navigator>
    );
};