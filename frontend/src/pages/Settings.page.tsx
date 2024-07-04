// Create settings for the user to update their profile information

import React from 'react';

export const SettingsPage: React.FC = () => {
    return (
        <div>
            <h2>Settings</h2>
            <form>
                <label>
                    First Name:
                    <input
                        type="text"
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                    />
                </label>
                <br />
                <label>
                    Username:
                    <input
                        type="text"
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                    />
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}