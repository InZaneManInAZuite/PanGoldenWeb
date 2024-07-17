import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Pages/Home.page';
import { AuthPage } from './Pages/Auth.page';
import { SettingsPage } from './Pages/Settings.page';
import { AccountPage } from './Pages/Account.page';
import { UserPage } from './Pages/User.page';
import { AnalyticsPage } from './Pages/Analytics.page';
import { TransactionsPage } from './Pages/Transactions.page';
import { MainPage } from './Pages/Main.page';

export const router = createBrowserRouter([
  {
    path: '/Home',
    element: <HomePage />,
  },{
    path: '/Auth',
    element: <AuthPage />,
  },{
    path: '/',
    element: <MainPage />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
