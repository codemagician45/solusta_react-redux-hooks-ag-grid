import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

// import Ag-grid module
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// Lazy loading cell renderer
function LoadingRenderer(props) {
    if (props.value !== undefined) {
        return props.value;
    } else {
        return (
            <img src="../assets/images/loading.gif" alt={'loading'} />
        );
    }
}

// Image cell renderer
function ImageCellRender(props) {
    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const id = props.data.id;
    const attendee = attendees.filter((attendee) => {return attendee.id === parseInt(id) });
    
    const style = {
        height:'48px',
        width: '48px',
        padding:'5px'
    };

    if(attendee && attendee.length > 0 && attendee[0].mainPhoto === '')
        return (
            <img src={'../assets/images/profile.jpg'} width={48} height={48} alt={'profile'} style={{padding:'5px'}}/>
        );
    else {
        return(
            <Link to={`/app/registration/registration/${id}`}>
                <img src={`data:${attendee && attendee.length > 0 && attendee[0].mainPhotoContentType};base64, ${attendee && attendee.length > 0 && attendee[0].mainPhoto}`} style={style} alt={'profile'}/>
            </Link>
        );
    }
}

function RegistrationTable(props) {
    const dispatch = useDispatch();
    const attendees = useSelector(({registerApp}) => registerApp.registration.attendees);

    // const columnDefs= [
    //     {headerName: 'ID', field: 'id', cellRenderer: 'loadingRenderer', suppressMenu: true, cellStyle:() => { return { padding:'15px' };}, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true},
    //     {headerName: 'Category', field: 'category',cellStyle:() => { return { padding:'15px' };}},
    //     {headerName: 'Main Photo', field: 'mainPhoto',cellRenderer: "imageCellRender", filter: false},
    //     {headerName: 'First Name', field: 'firstName',cellStyle:() => { return { padding:'15px' };}},
    //     {headerName: 'Last Name', field: 'lastName',cellStyle:() => { return { padding:'15px' };}},
    //     {headerName: 'Email', field: 'email',cellStyle:() => { return { padding:'15px' };}},
    //     {headerName: 'Company Name', field: 'companyName',cellStyle:() => { return { padding:'15px' };}},
    // ];

    const columnDefs= [
        {headerName: 'ID', field: 'id', suppressMenu: true, cellStyle:() => { return { padding:'15px' };}, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true},
        {headerName: 'Category', field: 'category',cellStyle:() => { return { padding:'15px' };}},
        {headerName: 'Main Photo', field: 'mainPhoto',cellRenderer: "imageCellRender", filter: false},
        {headerName: 'First Name', field: 'firstName',cellStyle:() => { return { padding:'15px' };}},
        {headerName: 'Last Name', field: 'lastName',cellStyle:() => { return { padding:'15px' };}},
        {headerName: 'Email', field: 'email',cellStyle:() => { return { padding:'15px' };}},
        {headerName: 'Company Name', field: 'companyName',cellStyle:() => { return { padding:'15px' };}},
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

    const rowData = attendees && attendees.map((attendee)=>({
        id: attendee.id,
        category: (attendee.attendeeCategorySAS && attendee.attendeeCategorySAS[0]) ? attendee.attendeeCategorySAS[0].categoryName : '',
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        email: attendee.email,
        companyName: attendee.companyName,
    }));

    const paginationPageSize = 20;

    const frameworkComponents = {
        loadingRenderer: LoadingRenderer,
        imageCellRender:ImageCellRender,
    };

    const getRowHeight = () => {return 48;};
    const headerHeight = () => {return 32;};
    const onSelectionChanged = (params) => {
        const gridApi = params.api;
        const selectedRow = gridApi.getSelectedRows();
        dispatch(Actions.setRegistrationRows(selectedRow));
    };

    const onGridReady = (params) => {

    }

    console.log('here in registration table: ', attendees);

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
                    rowDeselection={true}
                    rowData={rowData}
                    frameworkComponents = {frameworkComponents}
                    onGridReady={onGridReady}
                    getRowHeight={getRowHeight}
                    headerHeight={headerHeight}
                    pagination={true}
                    paginationAutoPageSize={true}
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
export default withReducer('registerApp', reducer)(RegistrationTable);
