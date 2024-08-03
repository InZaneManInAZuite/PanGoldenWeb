// The main page for the application

import React from 'react';
import { Navigator } from '../components/Navigator/Navigator';
import { AddAccountForm } from '../components/AddAccountForm/AddAccountForm';

export const AddAccountPage: React.FC = () => {
  return (
    <Navigator>
      <AddAccountForm />
    </Navigator>
  );
};
