import React, {useState} from 'react'
import {Card, CardContent, Typography, Tabs, Tab} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import JWTLoginTab from './tabs/JWTLoginTab';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import Auth0LoginTab from './tabs/Auth0LoginTab';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
}));

function Login()
{
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);

    function handleTabChange(event, value)
    {
        setSelectedTab(value);
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

                <FuseAnimate animation="transition.expandIn">
                    <img className="mb-32" src="assets/images/logos/solusta-apps-logo-white.png" alt="logo"/>
                </FuseAnimate>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        Welcome to the SOLUSTA!
                    </Typography>
                </FuseAnimate>

                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        "SOLUSTA"
                        - bright, shining (from old Irish)
                        <p>One of the leading talent agencies in Doha established in 2016. <br/>Over the course of the years we worked with the biggest international brands and local organizations and authorities from private and government sectors.</p>
                    </Typography>
                </FuseAnimate>
            </div>

            <FuseAnimate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO YOUR ACCOUNT</Typography>

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            className="w-full mb-32"
                        >
                            <Tab
                                icon={<img className="h-40 p-4 rounded-12" src="assets/images/logos/solusta-apps-logo-blue.png" alt="firebase"/>}
                                className="min-w-0"
                            />
                            {/*<Tab*/}
                            {/*    icon={<img className="h-40" src="assets/images/logos/firebase.svg" alt="firebase"/>}*/}
                            {/*    className="min-w-0"*/}
                            {/*    label="Firebase"*/}
                            {/*/>*/}
                            {/*<Tab*/}
                            {/*    icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0"/>}*/}
                            {/*    className="min-w-0"*/}
                            {/*    label="Auth0"*/}
                            {/*/>*/}
                        </Tabs>

                        {selectedTab === 0 && <JWTLoginTab/>}
                        {/*{selectedTab === 1 && <FirebaseLoginTab/>}*/}
                        {/*{selectedTab === 2 && <Auth0LoginTab/>}*/}

                        {/* <div className="flex flex-col items-center justify-center pt-32">
                            <span className="font-medium">Don't have an account?</span>
                            <Link className="font-medium" to="/register">Create an account</Link>
                            <Link className="font-medium mt-8" to="/">Back to Dashboard</Link>
                        </div> */}

                    </CardContent>
                </Card>
            </FuseAnimate>
        </div>
    )
}

export default Login;
