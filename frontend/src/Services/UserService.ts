// Front end service for user related operations
import config from '../Config';
import { User } from '../Models/PanGoldenModels';
import { isFailure } from './ServiceUtils';
import { store } from '../App/Store';

// Get all students
export const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(`${config.userApiUrl}`);
    return await response.json();
}

export const getUserByUsername = async (username: string): Promise<User> => {
    const response = await fetch(`${config.userApiUrl}/Username,${username}`);
    return await response.json();
}

export const getUserById = async (id: string): Promise<User> => {
    const response = await fetch(`${config.userApiUrl}/Id,${id}`);
    return await response.json();
}

export const authenticateUser = async (username: string, password: string): Promise<User> => {
    const response = await fetch(`${config.userApiUrl}/Auth,${username},${password}`);
    var element = await response.json();

    if (isFailure(response)) {
        throw new Error(element.message);
    }

    store.dispatch({ type: 'user/setUser', payload: element });
    store.dispatch({ type: 'page/setPage', payload: 'Accounts' });

    return element;
}

export const addUser = async (user: User): Promise<User> => {
    const response = await fetch(`${config.userApiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    var element = await response.json();

    if (isFailure(response)) {
        throw new Error(element.message);
    }

    return element;
}

export const updateUser = async (user: User): Promise<User> => {
    const response = await fetch(`${config.userApiUrl}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    var element = await response.json();

    if (isFailure(response)) {
        throw new Error(element.message);
    }

    return element;
}

export const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`${config.userApiUrl}/${id}`, {
        method: 'DELETE',
    });

    var element = await response.json();

    if (isFailure(response)) {
        throw new Error(element.message);
    }

    return element;
} 
