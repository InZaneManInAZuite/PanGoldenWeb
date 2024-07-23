// Creates a flex container which would fix the layout of 
// the page content depending on the screen size
import { ReactElement } from 'react';
import { HeaderPanel } from '../HeaderPanel/HeaderPanel';
import { SidePanel } from '../SidePanel/SidePanel';

import classes from './Navigator.module.css';
import { Flex, ScrollArea } from '@mantine/core';

export const Navigator = ({ children }: { children: ReactElement }) => {

    return (
        <Flex className={classes.flexCont}>
            <SidePanel />
            <HeaderPanel />

            <ScrollArea className={classes.scrollArea}>
                
            <div className={classes.feed}>
                {children}
            </div>
            </ScrollArea>
        </Flex>
    );
};
