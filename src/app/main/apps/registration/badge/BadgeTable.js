import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';

// import ag-grid css
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-material.css";

// import @material-ui components
import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// Action cell renderer
function ActionCellRenderer(props) {
  return (
    <Button variant="contained" color="secondary">Printed</Button>
  );
}

function BadgeTable(props) {
  const dispatch = useDispatch();
  const attendees = useSelector(({registerApp}) => registerApp.badge.attendees);

  const columnDefs= [
    {headerName: 'ID', field: 'id', cellStyle:() => { return { padding:'15px', 'font-size': '14px', 'font-family': 'sans-serif' };}, headerCheckboxSelection: true,headerCheckboxSelectionFilteredOnly: true,checkboxSelection: true},
    {headerName: 'Category', field: 'category', cellStyle:() => { return { padding:'15px', 'font-size': '14px', 'font-family': 'sans-serif' };}},
    {headerName: 'First Name', field: 'firstName', cellStyle:() => { return { padding:'15px', 'font-size': '14px', 'font-family': 'sans-serif' };}},
    {headerName: 'Last Name', field: 'lastName', cellStyle:() => { return { padding:'15px', 'font-size': '14px', 'font-family': 'sans-serif' };}},
    {headerName: 'Email', field: 'email', cellStyle:() => { return { padding:'15px', 'font-size': '14px', 'font-family': 'sans-serif' };}},
    {headerName: 'Company Name', field: 'companyName', cellStyle:() => { return { padding:'15px', 'font-size': '14px', 'font-family': 'sans-serif' };}},
    {headerName: 'Action', cellRenderer: "actionCellRenderer", field: 'action', cellStyle:() => { return { 'text-align': 'center' }}, sortable: false, filter: false},
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
  const rowData = attendees && attendees.map((item)=>{
    const temp ={
      id: item.id,
      category: (item.attendeeCategorySAS && item.attendeeCategorySAS[0]) ? item.attendeeCategorySAS[0].categoryName : '',
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      companyName:item.companyName,
    };
    return temp;
  });
  const frameworkComponents = { actionCellRenderer: ActionCellRenderer };
  const getRowHeight = () => {return 48;};
  const headerHeight = () => {return 32;};
  const onSelectionChanged = (params) => {
    const gridApi = params.api;
    const selectedRow = gridApi.getSelectedRows();
    dispatch(Actions.setAttendeeSelectRow(selectedRow));
  };

  return (
    <React.Fragment>
      <div
      className="table-responsive ag-theme-balham"
      style={{height:'100%', width: '100%', fontSize: '16px' }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defs.defaultColDef}
          rowSelection='multiple'
          rowData={rowData}
          frameworkComponents = {frameworkComponents}
          // onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={13}
          getRowHeight = {getRowHeight}
          headerHeight = {headerHeight}
          floatingFilter = {true}
          overlayLoadingTemplate={defs.overlayLoadingTemplate}
          overlayNoRowsTemplate={defs.overlayNoRowsTemplate}
          onSelectionChanged={onSelectionChanged}
        >
        </AgGridReact>
      </div>
    </React.Fragment>
  );
}

export default withReducer('registerApp', reducer)(BadgeTable);
