import { Title, Stack, Center, Card } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';

import classes from './Missing.module.css';

export const Missing = ({ text }: { text: string }) => {

    return (
        <Stack className={classes.missing} c="gray">
            <Center>
                <IconQuestionMark size={200} />
            </Center>
            <Center>
                <Title order={3}>{text}</Title>
            </Center>



        </Stack>
    );
}