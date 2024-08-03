import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { AuthPage } from './pages/Auth.page';
import { AccountPage } from './pages/Account.page';
import { AddAccountPage } from './pages/AddAccount.page';
import { UserPage } from './pages/User.page';
import { AnalyticsPage } from './pages/Analytics.page';
import { TransactionsPage } from './pages/Transactions.page';
import { PageNotFound } from './pages/PageNotFound.page';
import { EditAccountPage } from './pages/EditAccount.page';

export const router = createBrowserRouter([
  {
    path: '/Home',
    element: <HomePage />,
  },
  {
    path: '/Auth',
    element: <AuthPage />,
  },
  {
    path: '/Accounts',
    element: <AccountPage />,
  },
  {
    path: '/Accounts/Add',
    element: <AddAccountPage />,
  },
  {
    path: '/User',
    element: <UserPage />,
  },
  {
    path: '/Analytics',
    element: <AnalyticsPage />,
  },
  {
    path: '/Transactions',
    element: <TransactionsPage />,
  },
  {
    path: '/',
    element: <AccountPage />,
  },
  {
    path: '/Accounts/Edit',
    element: <EditAccountPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
