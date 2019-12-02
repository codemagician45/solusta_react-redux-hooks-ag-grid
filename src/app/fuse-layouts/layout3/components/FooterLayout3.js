import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {useSelector} from 'react-redux';

function FooterLayout3(props)
{
    const footerTheme = useSelector(({fuse}) => fuse.settings.footerTheme);

    return (
        <ThemeProvider theme={footerTheme}>
            <AppBar id="fuse-footer" className="relative z-10" color="default">
                <Toolbar className="flex items-center container py-0 px-16 lg:px-24">
                    <Typography>
                        Footer
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default FooterLayout3;
