import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import ReactToPrint from 'react-to-print'; // for Print React component

// import ag-grid css
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

// import @material-ui components
import { Box, Button } from '@material-ui/core';

// import Redux
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../store/actions';

// import components
import ImageRender from './ImageRender';

import BackgroundImg from '../assets/images/background.png';

class PrintComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : props.data,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            return {
                data: nextProps.data,
            }
        } else {
            return null;
        }
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                {data && data.map((item, index) => (
                    <Box className="w-100 h-100" display="none" displayPrint="block" m={1} key={index.toString()}>
                        <h1>{item.firstName + ' ' + item.lastName}</h1>
                        <h2 >{item.companyName}</h2>
                        <img src={BackgroundImg} alt="background"/>
                        <div>
                            <img src={`data:${item.mainPhotoContentType};base64, ${item.mainPhoto}`} alt="badge"/>
                        </div>
                    </Box>
                ))}
            </div>
        );
    }
}

function RegistrationTable(props) {
    const dispatch = useDispatch();
    const products = useSelector(({registerApp}) => registerApp.products.data);
    const printRef = useRef();
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

    return (
        <React.Fragment>
            <div>
                <ReactToPrint
                    trigger={() => <Button color="secondary">Print Image</Button>}
                    content={() => printRef.current}
                />
            </div>
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
                    overlayLoadingTemplate={defs.overlayLoadingTemplate}
                    overlayNoRowsTemplate={defs.overlayNoRowsTemplate}
                    // modules={defs.modules}
                    // sideBar={defs.sideBar}
                    >
                </AgGridReact>
            </div>
            <div className="w-100">
                <PrintComponent data={products} ref={printRef}/>
            </div>
        </React.Fragment>
    );
}




export default withRouter(RegistrationTable);
