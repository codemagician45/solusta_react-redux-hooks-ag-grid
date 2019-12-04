import React, {useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import * as Actions from '../store/actions';
import ImageRender from './ImageRender';


function RegistrationTable(props) {
    const dispatch = useDispatch();
    const products = useSelector(({registerApp}) => registerApp.products.data);
    console.log('here in Registration table: ', products);

    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

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
            filter: true
        },
        sideBar: "columns",
        rowData: [],
        modules: AllModules
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

    return (
        <div
          className="table-responsive ag-theme-balham"
          style={{height:'100%', width: '100%', fontSize: '16px' }}
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

                // modules={defs.modules}
                // sideBar={defs.sideBar}
                >
            </AgGridReact>
        </div>
    );
}




export default withRouter(RegistrationTable);
