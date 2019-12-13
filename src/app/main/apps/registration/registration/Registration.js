import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReactToPrint from 'react-to-print'; // for Print React component

// import @material-ui components
import { Button, Paper, Input, Icon, } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import { FusePageCarded, FuseAnimate } from '@fuse';
import RegistrationTable from './RegistrationTable';
import RegistrationPrint from './RegistrationPrint';
import { ThemeProvider } from '@material-ui/styles';
// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

function Registration() {
    const printRef = useRef();
    const dispatch = useDispatch();
    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const attendeesSearch = useSelector(({registerApp}) => registerApp.registration.attendeesSearch );
    const rows = useSelector(({ registerApp }) => registerApp.registration.rows);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const searchText = useSelector(({ registerApp }) => registerApp.registration.searchText);
    const [textChange, changeText] = useState('');
    const printData = (searchText == '') ? (attendees) : (attendeesSearch);
    console.log("total attendees",printData);
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <Button className="whitespace-no-wrap" color="secondary" variant="contained" style={{ visibility: 'hidden' }}>Print Before</Button>
                    <ThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideDownIn" delay={300}>
                            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <Input
                                    placeholder="Search"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={textChange}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={ev => {
                                        if (ev.target.value == '') {
                                            dispatch(Actions.setSearchText(ev.target.value));
                                            changeText('');
                                        }
                                        else 
                                            changeText(ev.target.value)
                                    }}
                                    onKeyDown = {ev =>{
                                        if (ev.key === 'Enter'){
                                            dispatch(Actions.setSearchText(ev.target.value))
                                        }
                                    }}
                                />
                            </Paper>
                        </FuseAnimate>
                    </ThemeProvider>
                    <ReactToPrint
                        trigger={() => <Button color="secondary" variant="contained">Print Badges</Button>}
                        content={() => printRef.current}
                    />
                    <RegistrationPrint attendees={printData} rows={rows} ref={printRef} />
                </div>
            }
            content={
                <RegistrationTable />
            }
            innerScroll
        />
    );
}

export default withReducer('registerApp', reducer)(Registration);
