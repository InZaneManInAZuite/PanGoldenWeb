// Front end service for account related operations
import config from '../Config';
import { Account } from '../Models/PanGoldenModels';
import { isFailure } from './ServiceUtils';

// Get all accounts
export const getAllAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${config.accountApiUrl}`);
  return await response.json();
};

// Get all accounts by user
export const getAccountsByUser = async (userId: string): Promise<Account[]> => {
  const response = await fetch(`${config.accountApiUrl}/User,${userId}`);
  return (await response.json()) as Account[];
};

// Get account by id
export const getAccountById = async (id: string): Promise<Account> => {
  const response = await fetch(`${config.accountApiUrl}/Account,${id}`);
  return await response.json();
};

// Add new account
export const addAccount = async (account: Account): Promise<void> => {
  const response = await fetch(`${config.accountApiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  });

  var element = await response.json();

  if (isFailure(response)) {
    throw new Error(element.message);
  }

  return element;
};

// Update account
export const updateAccount = async (account: Account): Promise<Account> => {
  const response = await fetch(`${config.accountApiUrl}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  });

  var element = await response.json();

  if (isFailure(response)) {
    throw new Error(element.message);
  }

  return element;
};

// Delete account
export const deleteAccount = async (id: string): Promise<void> => {
  const response = await fetch(`${config.accountApiUrl}/${id}`, {
    method: 'DELETE',
  });

  var element = await response.json();

  if (isFailure(response)) {
    throw new Error(element.message);
  }

  return element;
};
