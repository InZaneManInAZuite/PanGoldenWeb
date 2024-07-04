// Create themes for the app
import { Card, Table, Progress, Button, TextInput, Text } from '@mantine/core';
import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
    headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
            h1: { fontSize: rem(36) },
        },
    },

    

    fontFamily: 'Roboto, sans-serif',

    components: {
        Table: {},
        Progress: {},
        Card: Card.extend({
            defaultProps: {
                padding: 'xl',
                shadow: 'xs',
                radius: 'md',
                bg: 'dark',
            }
        }),
        Button: Button.extend({
            defaultProps: {
                color: 'dark',
                radius: 'xl',
                variant: 'filled',
            },
        }),
        TextInput: {
            defaultProps: {
                radius: 'xl',
                padding: 'sm',
                variant: 'filled',
                required: true,
            },
        },
        Text: {},
    }
});
