// The main page for the application

import React from 'react';
import { Navigator } from '../components/Navigator/Navigator';
import { TransactionPageComp } from '@/components/TransactionPageComp/TransactionPageComp';

export const TransactionsPage: React.FC = () => {
  return (
    <Navigator>
      <TransactionPageComp />
    </Navigator>
  );
};
