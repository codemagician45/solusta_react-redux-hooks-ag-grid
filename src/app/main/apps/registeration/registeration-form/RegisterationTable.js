import React, {useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../store/actions';
import ImageRender from './ImageRender';
// import CubeRenderer from './ImageRender'
function RegisterationTable(props) {
    const dispatch = useDispatch();
    const products = useSelector(({registerApp}) => registerApp.products.data);
    console.log(products)
    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);  
    const columnDefs= [
        {headerName: 'ID', field: 'id',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Main Photo', field: 'mainPhoto',cellRenderer: "imageRender"},
        {headerName: 'First Name', field: 'firstName',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Middle Name', field: 'middleName',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Last Name', field: 'lastName',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Arabic First Name', field: 'arabicFirstName',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Arabic Middle Name', field: 'arabicMiddleName',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Arabic Last Name', field: 'arabicLastName',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Gender', field: 'gender',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Email', field: 'email',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Phone', field: 'phone',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Company Name', field: 'companyName',cellStyle:() => { return { padding:'45px' };}},
        {headerName: 'Age', field: 'age',cellStyle:() => { return { padding:'45px' };}},
    ];
        
    const rowData = products.map((item)=>{
        const temp ={
            id: item.id,
            firstName: item.firstName,
            middleName: item.middleName,
            lastName: item.lastName,
            arabicFirstName: item.arabicFirstName,
            arabicMiddleName: item.arabicMiddleName,
            arabicLastName: item.arabicLastName,
            gender: item.gender,
            email: item.email,
            phone: item.phone,
            companyName:item.companyName,
            age:item.age
        };
        return temp;
    });
    const frameworkComponents = {
        imageRender:ImageRender
    }
    const getRowHeight = () => {return 120;}
    // const headerHeight = () => {return 40;}
    return (
        <div
          className="table-responsive ag-theme-balham"
          style={{height:'600px', width: '100%', fontSize: '16px' }}
        >
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                frameworkComponents = {frameworkComponents}
                // onGridReady={onGridReady}
                pagination={true}
                enableSorting={true}
                enableFilter={true}
                getRowHeight = {getRowHeight}
                // headerHeight = {headerHeight} 
                >
            </AgGridReact>
        </div>
    );
}

export default withRouter(RegisterationTable);