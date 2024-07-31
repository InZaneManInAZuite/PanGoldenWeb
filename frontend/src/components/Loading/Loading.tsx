import { Loader, Card } from '@mantine/core';
import classes from './Loading.module.css';

export const Loading = () => {
    return (
        <Card mt="xl" className={classes.loading}>
            <Loader color="yellow" />
        </Card>
    )
}