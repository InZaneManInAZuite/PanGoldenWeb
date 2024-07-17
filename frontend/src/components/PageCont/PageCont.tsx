// Creates a flex container which would fix the layout of 
// the page content depending on the screen size

import { useViewportSize, useDisclosure } from '@mantine/hooks';

import { AuthForm } from '../AuthForm/AuthForm';
import { SidePanel } from '../SidePanel/SidePanel';

import classes from './PageCont.module.css';
import { Flex } from '@mantine/core';

export const PageCont = () => {

    const { height, width } = useViewportSize();
    var isLandScape = true;
    if (width < height) isLandScape = false;

    return (
        <Flex className={classes.flexCont}>
            {isLandScape && (<SidePanel/>)}
            {!isLandScape && (<AuthForm/>)}

            <div className={classes.feed}>
                <AuthForm />
            </div>

        </Flex>
    );
};
