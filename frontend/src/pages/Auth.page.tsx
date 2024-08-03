// Create a login and sign up form page
// login form should have username and password fields
// sign up form should have firstname, lastname, username, password, and confirm password fields

import React from 'react';
import { AuthForm } from '../components/AuthForm/AuthForm';

export const AuthPage: React.FC = () => {
  return <AuthForm />;
};
