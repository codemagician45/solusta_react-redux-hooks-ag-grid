import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print'; // for Print React component

// import @material-ui components
import { Button, Paper, Input, Icon, Typography } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import { FusePageCarded, FuseAnimate } from '@fuse';
import RegistrationTable from './RegistrationTable';
import RegistrationPrint from './RegistrationPrint';
import { ThemeProvider } from '@material-ui/styles';

function Registration() {
    const printRef = useRef();
    const tableRef = useRef();
    const dispatch = useDispatch();
    const count = useSelector(({ registerApp }) => registerApp.registration.count);
    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const attendeesSearch = useSelector(({ registerApp }) => registerApp.registration.attendeesSearch);
    const badgeIDs = useSelector(({ registerApp }) => registerApp.registration.badgeIDs);
    const rows = useSelector(({ registerApp }) => registerApp.registration.rows);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const _tempSearchText = useSelector(({ registerApp }) => registerApp.registration.searchText);
    const [textChange, changeText] = useState('');
    const printData = (_tempSearchText === '') ? (attendees) : (attendeesSearch);

    const initialTableData = {
        count: 0,
        attendees: [],
        attendeesSearch: [],
        _tempSearchText: '',
        badgeIDs: []
    }
    const tableData = {
        ...initialTableData,
        count: count,
        attendees: attendees,
        attendeesSearch: attendeesSearch,
        _tempSearchText: _tempSearchText,
        badgeIDs: badgeIDs
    }
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between" >
                    <Typography className="hidden sm:flex" variant="h6">Total : {count}</Typography>
                    <ThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideDownIn" delay={300}>
                            <Paper className="flex items-center w-qut max-w-512 px-8 py-4 rounded-8" elevation={1}>
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
                                    onKeyDown={ev => {
                                        if (ev.key === 'Enter') {
                                            dispatch(Actions.setSearchText(ev.target.value))
                                        }
                                    }}
                                />
                            </Paper>
                        </FuseAnimate>
                    </ThemeProvider>
                    <div>
                        <Button className="whitespace-no-wrap" color="default" variant="contained" style={{ marginRight: '10px' }} onClick={(e) => { tableRef.current.exportExcel() }}>Export</Button>
                        <ReactToPrint
                            trigger={() => <Button color="secondary" variant="contained">Print Badges</Button>}
                            content={() => printRef.current}
                        />
                        <RegistrationPrint attendees={printData} rows={rows} ref={printRef} />
                    </div>
                </div>
            }
            content={
                <RegistrationTable ref={tableRef} tableData={tableData} />
            }
            innerScroll
        />
    );
}

export default withReducer('registerApp', reducer)(Registration);
