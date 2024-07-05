// Front end service for user related operations

import React, { useState } from 'react';
import config from '../Config';
import { User } from '../Models/PanGoldenModels';

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
    if (!response.ok) {
        console.log('Authenticator goes to check if response is ok');
        throw new Error('Invalid username or password');
    }
    return await response.json();
}

export const addUser = async (user: User): Promise<User> => {
    const response = await fetch(`${config.userApiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
}

export const updateUser = async (user: User): Promise<User> => {
    const response = await fetch(`${config.userApiUrl}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
}

export const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`${config.userApiUrl}/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
} 
