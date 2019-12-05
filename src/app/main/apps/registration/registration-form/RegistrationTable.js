import React, {useEffect, useState,useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ImageRender from './ImageRender';
import { Box, Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import { makeStyles } from '@material-ui/core/styles';

import BackgroundImg from '../assets/images/background.png';

class PrintComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : props.data,
            images :props.images
        };
        // console.log(props)
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
        const { data, images } = this.state;
        const modal_print = {
            position:'relative',
            display:'flex',
            margin:'10px',
        }
        const nameStyle = {
            position: 'absolute',
            top: '57%',
            width:'100%',
            textAlign:'center',
            color: 'midnightblue',
        };
        const companyNameStyle = {
            position: 'absolute',
            top: '64%',
            width:'100%',
            textAlign:'center',
        };
        const paper = {
            position: 'absolute',
            width: 400,
            height:'50%',
            
        };
    
        const photo = {
            position: 'absolute',
            left: '62%',
            width: '120px',
            height: '180px',
            right: '0',
            top: '15%',
            display:'flex'
        };
    
        const backGround = {
            width: '100%'
        };
        const photoImg = {
            width: '100%',
            margin:'auto'
        };

        return (
            <div style={paper}> 
                {data && data.map((item, index) => ( 
                    <Box className="w-100 h-100" display="none" displayPrint="block" m={1} key={index.toString()}>
                        <div id="modal-print" style={modal_print}>
                            <h1 style={nameStyle}>{item.firstName + ' ' + item.lastName}</h1>
                            <h2 style={companyNameStyle} >{item.companyName}</h2>
                            <img src={BackgroundImg} style={backGround} alt="background"/>
                            <div style={photo}>
                                <img src={`data:${item.mainPhotoContentType};base64, ${item.mainPhoto}`} alt="badge" style={photoImg}/>

                            </div>
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
    const backgrounds = useSelector(({registerApp}) => registerApp.badge.data);
    console.log(backgrounds)
    const [selectedRowData,addSelectedRow] = useState([]);
    const printRef = useRef();
    
    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(Actions.getBackgrounds());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(Actions.setSelectedRows(selectedRowData));
    },[selectedRowData]);

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
        const selectedRows = gridApi.getSelectedRows();
        addSelectedRow(selectedRows)
    };

    console.log(selectedRowData)
    return (
        <React.Fragment>
         {/* <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}> */}
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
            <div className="w-100">
                <PrintComponent data={selectedRowData} images={products} ref={printRef}/>
            </div>
            <div>
                <ReactToPrint
                    trigger={() => <Button color="secondary" variant="contained">Print Image</Button>}
                    content={() => printRef.current}
                />
            </div>
        {/* </div> */}
        
        </React.Fragment>
    );
}


// export default withRouter(RegistrationTable);

export default withRouter('registerApp', reducer)(RegistrationTable);
