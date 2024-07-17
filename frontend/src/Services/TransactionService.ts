// Front end service for transaction related operations
import config from '../Config';
import { Transaction } from '../Models/PanGoldenModels';
import { isFailure } from './ServiceUtils';

// Get all transactions
export const getAllTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch(`${config.transactionApiUrl}`);
    return await response.json();
}

// Get all transactions by account
export const getTransactionsByAccount = async (accountId: string): Promise<Transaction[]> => {
    const response = await fetch(`${config.transactionApiUrl}/Account,${accountId}`);
    return await response.json();
}

// Get transaction by id
export const getTransactionById = async (id: string): Promise<Transaction> => {
    const response = await fetch(`${config.transactionApiUrl}/Transaction,${id}`);
    return await response.json();
}

// Add new transaction
export const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch(`${config.transactionApiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    });

    var element = await response.json();

    if (isFailure(response)) {
        throw new Error(element.message);
    }

    return element;
}

// Update transaction
export const updateTransaction = async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch(`${config.transactionApiUrl}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    });

    var element = await response.json();

    if (isFailure(response)) {
        throw new Error(element.message);
    }

    return element;
}

// Delete transaction
export const deleteTransaction = async (id: string): Promise<void> => {
    const response = await fetch(`${config.transactionApiUrl}/${id}`, {
        method: 'DELETE',
    });

    var element = await response.json();

    if (isFailure(response)) {
        throw new Error(element.message);
    }

    return element;
}
