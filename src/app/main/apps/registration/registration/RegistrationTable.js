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

import axios from 'axios';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

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
    // const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const id = props.data && props.data.id;
    // const attendee = attendees.filter((attendee) => {return attendee.id === parseInt(id) });
    const attendee = props.data && props.data;
    
    const style = {
        height:'48px',
        width: '48px',
        padding:'5px'
    };

    if(attendee && attendee.mainPhoto === '')
        return (
            <img src={'../assets/images/avatars/profile.jpg'} width={48} height={48} alt={'profile'} style={{padding:'5px'}}/>
        );
    else {
        return(
            <Link to={`/app/registration/registration/${id}`}>
                <img src={`data:${attendee && attendee.mainPhotoContentType};base64, ${attendee && attendee.mainPhoto}`} style={style} alt={'profile'}/>
            </Link>
        );
    }
}

function RegistrationTable(props) {
    const dispatch = useDispatch();
    const attendees = useSelector(({registerApp}) => registerApp.registration.attendees);
    const [step,setStep] = useState(null);
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
        {headerName: 'ID', field: 'id', suppressMenu: true,  cellStyle:() => {return { padding:'15px' };}, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true},
        {headerName: 'Category', field: 'category',cellStyle:() => {return { padding:'15px' };}},
        {headerName: 'Main Photo', field: 'mainPhoto', filter: false,cellRenderer: "imageCellRender",},
        {headerName: 'First Name', field: 'firstName',cellStyle:() => {return { padding:'15px' };}},
        {headerName: 'Last Name', field: 'lastName',cellStyle:() => {return { padding:'15px' };}},
        {headerName: 'Email', field: 'email',cellStyle:() => {return { padding:'15px' };}},
        {headerName: 'Company Name', field: 'companyName',cellStyle:() => {return { padding:'15px' };}},
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

    // const components = {
    //     loadingRenderer: function(params) {
    //       if (params.value !== undefined) {
    //         return params.value;
    //       } else {
    //         return '<img src="../images/loading.gif">';
    //       }
    //     }
    //   }
    // lazyloading parameter
    const rowHeight = 48;
    const rowBuffer = 0;
    const rowModelType = "infinite";
    const cacheOverflowSize = 2;
    const maxConcurrentDatasourceRequests = 1;
    const infiniteInitialRowCount = 1;
    const maxBlocksInCache = 2;
    const cacheBlockSize = 20;
    const paginationPageSize = 20;

    const onGridReady = params => {
        
        const gridApi = params.api;
        const gridColumnApi = params.columnApi;
        const updateData = data => {
            console.log("height",data.rowHeight)
            let dataSource = {
                 rowCount : null,
                 getRows : function(params){
                    console.log("asking for " + params.startRow + " to " + params.endRow);
                    setTimeout(function() {
                        let rowsThisPage = data.slice(params.startRow, params.endRow);
                        let lastRow = -1;
                        if (data.length <= params.endRow) {
                          lastRow = data.length;
                        }
                        console.log(rowsThisPage,lastRow)
                        params.successCallback(rowsThisPage, lastRow);
                      }, 500);
                 }
            };
            params.api.setDatasource(dataSource);
        };
        // console.log("ready confirm")
        const header = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
            }
        };
        axios.get(`${SERVER_LINK}/api/attendee-sas?page=${params.endRow/20}&size=${100}`, null, header).then(
            res => {
                console.log("res",res);
                updateData(res.data);
            }
        );
        // updateData(attendees)
        
    };


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
                    rowData={rowData}
                    frameworkComponents = {frameworkComponents}

                    onGridReady={onGridReady}
                    rowBuffer={rowBuffer}
                    rowModelType={rowModelType}
                    cacheOverflowSize={cacheOverflowSize}
                    maxConcurrentDatasourceRequests={maxConcurrentDatasourceRequests}
                    infiniteInitialRowCount={infiniteInitialRowCount}
                    maxBlocksInCache={maxBlocksInCache}
                    cacheBlockSize = {cacheBlockSize}
                    rowHeight ={rowHeight}
                    // components = {components}
                    pagination={true}
                    getRowHeight = {getRowHeight}
                    headerHeight = {headerHeight}
                    floatingFilter = {true}
                    overlayLoadingTemplate={defs.overlayLoadingTemplate}
                    overlayNoRowsTemplate={defs.overlayNoRowsTemplate}
                    onSelectionChanged={onSelectionChanged}
                    paginationPageSize={paginationPageSize}
                >
                </AgGridReact>
            </div>
        </React.Fragment>
    );
}
export default withReducer('registerApp', reducer)(RegistrationTable);
