import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Pages/Home.page';
import { AuthPage } from './Pages/Auth.page';
import { SettingsPage } from './Pages/Settings.page';

export const router = createBrowserRouter([
  {
    path: '/Home',
    element: <HomePage />,
  },{
    path: '/',
    element: <AuthPage />,
  },{
    path: '/Settings',
    element: <SettingsPage />,
  }

]);

export function Router() {
  return <RouterProvider router={router} />;
}
