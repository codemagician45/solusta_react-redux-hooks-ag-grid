import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReactToPrint from 'react-to-print'; // for Print React component

// import @material-ui components
import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import { FusePageCarded } from '@fuse';
import RegistrationTable from './RegistrationTable';
import RegistrationPrint from './RegistrationPrint';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

function Registration()
{
    const printRef = useRef();
    const dispatch = useDispatch();
    const attendees = useSelector(({registerApp}) => registerApp.registration.attendees);
    const rows = useSelector(({registerApp}) => registerApp.registration.rows);

    useEffect(() => {
        dispatch(Actions.getRegistrationAttendees());
    }, [dispatch]);

    // console.log('here in registration: ', rows);
    return (
        <FusePageCarded
            classes={{
                content: "flex",
              header : "min-h-24 h-24 sm:h-36 sm:min-h-36"
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <Button className="whitespace-no-wrap" color="secondary" variant="contained" style={{visibility:'hidden'}}>Print Before</Button>
                    <ReactToPrint
                        trigger={() => <Button color="secondary" variant="contained">Print Badges</Button>}
                        content={() => printRef.current}
                    />
                    <RegistrationPrint attendees={attendees} rows={rows} ref={printRef}/>
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
