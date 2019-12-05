import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';

// import ag-grid css
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import ImageRender from './ImageRender';

function RegistrationTable(props) {    
    const dispatch = useDispatch();
    const products = useSelector(({registerApp}) => registerApp.products.data);
    console.log('here in Registration table: ', products);

    const columnDefs= [
        {headerName: 'ID', field: 'id',cellStyle:() => { return { padding:'15px' };}, headerCheckboxSelection: true,headerCheckboxSelectionFilteredOnly: true,checkboxSelection: true},
        {headerName: 'Main Photo', field: 'mainPhoto',cellRenderer: "imageRender", filter: false},
        {headerName: 'First Name', field: 'firstName',cellStyle:() => { return { padding:'15px' };}},
        {headerName: 'Last Name', field: 'lastName',cellStyle:() => { return { padding:'15px' };}},
        {headerName: 'Email', field: 'email',cellStyle:() => { return { padding:'15px' };}},
        {headerName: 'Company Name', field: 'companyName',cellStyle:() => { return { padding:'15px' };}},
    ];

    let defs = {
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

    const rowData = products.map((item)=>{
        const temp ={
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            companyName:item.companyName
        };
        return temp;
    });

    const frameworkComponents = {
        imageRender:ImageRender
    };
    const getRowHeight = () => {return 48;};
    const headerHeight = () => {return 32;};
    const onSelectionChanged = (params) => {
        const gridApi = params.api;
        const selectedRow = gridApi.getSelectedRows();
        dispatch(Actions.setRow(selectedRow))
    };

    return (
        <React.Fragment>
            <div
            className="table-responsive ag-theme-balham"
            style={{height:'90%', width: '100%', fontSize: '16px' }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defs.defaultColDef}
                    // rowModelType={'serverSide'}
                    rowData={rowData}
                    frameworkComponents = {frameworkComponents}
                    // onGridReady={onGridReady}
                    pagination={true}
                    getRowHeight = {getRowHeight}
                    headerHeight = {headerHeight}
                    floatingFilter = {true}
                    overlayLoadingTemplate={defs.overlayLoadingTemplate}
                    overlayNoRowsTemplate={defs.overlayNoRowsTemplate}
                    // modules={defs.modules}
                    // sideBar={defs.sideBar}
                    onSelectionChanged={onSelectionChanged}
                    >
                </AgGridReact>
            </div>
        </React.Fragment>
    );
}

// export default withRouter(RegistrationTable);
export default withReducer('registerApp', reducer)(RegistrationTable);
