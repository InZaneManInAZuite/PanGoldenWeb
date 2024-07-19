// Front-end user model

export interface User {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface Account {
  id?: string;
  name?: string;
  untrackedBalance?: number;
  userId?: string;
  user?: User;
  balance?: number;
}

export interface Transaction {
  id?: string;
  type?: TransactionType;
  description?: string;
  date?: Date;
  accountId?: string;
  account?: Account;
}

export enum TransactionType {
  Gain, Lose, Transfer
}

