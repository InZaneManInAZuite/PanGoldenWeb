import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Pages/Home.page';
import { AuthPage } from './Pages/Auth.page';
import { AccountPage } from './Pages/Account.page';
import { AddAccountPage } from './Pages/AddAccount.page';
import { UserPage } from './Pages/User.page';
import { AnalyticsPage } from './Pages/Analytics.page';
import { TransactionsPage } from './Pages/Transactions.page';
import { PageNotFound } from './Pages/PageNotFound.page';
import { EditAccountPage } from './Pages/EditAccount.page';

export const router = createBrowserRouter([
  {
    path: '/Home',
    element: <HomePage />,
  },{
    path: '/Auth',
    element: <AuthPage />,
  },{
    path: '/Accounts',
    element: <AccountPage />,
  },{
    path: '/Accounts/Add',
    element: <AddAccountPage />,
  },{
    path: '/User',
    element: <UserPage />,
  },{
    path: '/Analytics',
    element: <AnalyticsPage />,
  },{
    path: '/Transactions',
    element: <TransactionsPage />,
  },{
    path: '/',
    element: <AccountPage />,
  },{
    path: '/Accounts/Edit',
    element: <EditAccountPage />,
  },{
    path: '*',
    element: <PageNotFound />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
