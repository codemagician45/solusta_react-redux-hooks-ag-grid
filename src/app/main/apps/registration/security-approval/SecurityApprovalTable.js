import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';

// import Ag-grid module
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

// import @material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import utils
import * as Utils from '../../../../utils';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    marginTop: '14px'
  },
}));

// Security Approval cell renderer
function SecApprovalCellRenderer(props) {
  const { data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const prevSecApproval = useRef(data.secApproval);
  const secApprovals = Utils.objectToArray(useSelector(({ registerApp }) => registerApp.securityApproval.secApprovals));
  const [secApproval, setSecApproval] = useState(data.secApproval);

  const changeSecApproval = (e) => {
    setSecApproval(e.target.value);
    if (prevSecApproval.current !== e.target.value) {
      console.log('security approval is changed: ', data);
      dispatch(Actions.changeAttendeeIsSecurityChanged({
        attendeeId: data.attendeeId,
        secApproval: e.target.value,
        secApprovalText: secApprovals.filter(item => item.id === e.target.value)[0].approvalText,
        isSecurityChanged: true,
      }));
    }
    console.log('security approval is not changed: ', data);
  }

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Security Approval</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={secApproval}
          onChange={changeSecApproval}
        >
          {/* <MenuItem value={'None'}>None</MenuItem> */}
          {secApprovals && secApprovals.map((item, index) => (
            <MenuItem key={index.toString()} value={item.id}>{item.approvalText}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}

// Action cell renderer
function ActionCellRenderer(props) {
  const { data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const attendees = useSelector(({ registerApp }) => registerApp.securityApproval.attendees);

  const approveSecurity = () => {
    const requestData = {
      ...attendees[data.attendeeId],
      attendeeSecApprovalSAId: data.secApproval,
      attendeeSecApprovalSAApprovalText: data.secApprovalText,
    };
    Utils.xapi().put('/attendee-sas', requestData)
      .then(response => {
        dispatch(Actions.updateSecAttendee(response.data));
        console.log('here update attendee security response: ', response);
      })
      .catch(error => {
        console.log('here update attendee security error: ', error);
      });
  };

  if (data.isSecurityChanged) {
    return (
      <Button variant="contained" color="secondary" onClick={approveSecurity} className={classes.button}>Approve</Button>
    );
  } else {
    return (
      <Button variant="contained" color="secondary" disabled={true} className={classes.button}>Approve</Button>
    );
  }
}

function SecurityApprovalTable(props) {
  const dispatch = useDispatch();
  const attendees = Utils.objectToArray(useSelector(({ registerApp }) => registerApp.securityApproval.attendees));

  const columnDefs = [
    {
      headerName: 'Attendee ID',
      field: 'attendeeId',
      cellStyle: {
        'padding': '15px',
        'font-size': '14px',
        'font-family': 'sans-serif',
      },
      checkboxSelection: true,
    },
    {
      headerName: 'First Name',
      field: 'firstName',
      cellStyle: {
        'padding': '15px',
        'font-size': '14px',
        'font-family': 'sans-serif',
        'margin-top': '10px',
      },
    },
    {
      headerName: 'Last Name',
      field: 'lastName',
      cellStyle: {
        'padding': '15px',
        'font-size': '14px',
        'font-family': 'sans-serif',
        'margin-top': '10px',
      },
    },
    {
      headerName: 'Security Approval',
      cellRenderer: "secApprovalCellRenderer",
      cellStyle: {
      },
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Action',
      cellRenderer: "actionCellRenderer",
      field: 'action',
      cellStyle: {
        'margin-top': '5px',
        'text-align': 'center',
      },
      suppressSizeToFit: true,
      sortable: false,
      filter: false
    },
    {
      headerName: 'Email',
      field: 'email',
      cellStyle: {
        padding: '15px',
        'font-size': '14px',
        'font-family': 'sans-serif',
        'margin-top': '10px',
      },
    },
    {
      headerName: 'Category',
      field: 'category',
      cellStyle: {
        'padding': '15px',
        'font-size': '14px',
        'font-family': 'sans-serif',
        'margin-top': '10px',
      },
    },
    {
      headerName: 'Company',
      field: 'companyName',
      cellStyle: {
        'padding': '15px',
        'font-size': '14px',
        'font-family': 'sans-serif',
        'margin-top': '10px',
      },
    }
  ];
  const defs = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    sideBar: "columns",
    rowData: [],
    modules: AllModules,
    overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
    overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: #fafafa;\">Loading ... </span>"
  };
  const rowData = attendees.map((item) => {
    return {
      attendeeId: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      category: item.attendeeCategorySAS[0].categoryName,
      companyName: item.companyName,
      secApproval: item.attendeeSecApprovalSAId,
      secApprovalText: item.attendeeSecApprovalSAApprovalText,
      isSecurityChanged: item.isSecurityChanged,
    }
  });
  const frameworkComponents = {
    secApprovalCellRenderer: SecApprovalCellRenderer,
    actionCellRenderer: ActionCellRenderer,
  };
  const getRowHeight = () => {
    return 80;
  };
  const headerHeight = () => {
    return 32;
  };
  const onSelectionChanged = (params) => {
    const gridApi = params.api;
    const selectedRows = gridApi.getSelectedRows();
    console.log('here in selected row data in collection ag-grid: ', selectedRows);
    dispatch(Actions.setSecSelectedRows(selectedRows));
  };

  return (
    <React.Fragment>
      <div
        className="table-responsive ag-theme-balham"
        style={{ height: '100%', width: '100%', fontSize: '14px' }}
      >
        <AgGridReact
          modules={AllModules}
          columnDefs={columnDefs}
          defaultColDef={defs.defaultColDef}
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          rowData={rowData}
          frameworkComponents={frameworkComponents}
          pagination={true}
          paginationPageSize={9}
          getRowHeight={getRowHeight}
          headerHeight={headerHeight}
          floatingFilter={true}
          overlayLoadingTemplate={defs.overlayLoadingTemplate}
          overlayNoRowsTemplate={defs.overlayNoRowsTemplate}
          onSelectionChanged={onSelectionChanged}
        >
        </AgGridReact>
      </div>
    </React.Fragment>
  );
}

export default withReducer('registerApp', reducer)(SecurityApprovalTable);
