// Creates a flex container which would fix the layout of 
// the page content depending on the screen size

import { useViewportSize, useDisclosure } from '@mantine/hooks';

import { Feed } from '../Feed/Feed';
import { HeaderPanel } from '../HeaderPanel/HeaderPanel';
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
            {!isLandScape && (<HeaderPanel/>)}

            <div className={classes.feed}>
                <Feed />
            </div>

        </Flex>
    );
};
