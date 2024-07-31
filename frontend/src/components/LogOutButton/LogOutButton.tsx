import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { store } from '../../App/Store';

import classes from './LogOutButton.module.css';

const clearPage = () => {
    store.dispatch({ type: 'Page/clearPage' });
}

const clearUser = () => {
    store.dispatch({ type: 'user/clearUser' });
}

export const LogOutButton = () => {
    const navigate = useNavigate();

    return (
        <Button mt="xs" className={classes.logOutButton}
            onClick={() => {

                clearPage();
                clearUser();
                navigate('/Auth');
            }}
        >
            Log Out
        </Button>
    );
}