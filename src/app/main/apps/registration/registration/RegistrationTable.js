import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import Ag-grid module
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

import axios from 'axios';
import { Button } from '@material-ui/core';

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
        height: '48px',
        width: '48px',
        padding: '5px'
    };

    if (attendee && attendee.mainPhoto === '')
        return (
            <img src={'../assets/images/avatars/profile.jpg'} width={48} height={48} alt={'profile'} style={{ padding: '5px' }} />
        );
    else {
        return (
            <Link to={`/app/registration/registration/${id}`}>
                <img src={`data:${attendee && attendee.mainPhotoContentType};base64, ${attendee && attendee.mainPhoto}`} style={style} alt={'profile'} />
            </Link>
        );
    }
}

function RegistrationTable(props) {
    const dispatch = useDispatch();
    const mount = useRef(false);
    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const [gridApi, setGridApi] = useState(null);
    const [lazyLoadingResult, setLazyLoadingResult] = useState(null);

    useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        }
    })

    const columnDefs = [
        {
            headerName: 'ID', field: 'id', suppressMenu: true, cellStyle: () => { return { padding: '15px', 'font-size': '14px', 'font-family': 'sans-serif', }; },
            headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true,
            filter: "agNumberColumnFilter",
            filterParams: {
                filterOptions: ["equals", "contains"],
                suppressAndOrCondition: true
            }
        },
        {
            headerName: 'Category', field: 'category', cellStyle: () => { return { padding: '15px', 'font-size': '14px', 'font-family': 'sans-serif', }; },
            filter: "agTextColumnFilter",
            filterParams: {
                filterOptions: ["equals", "contains"],
                suppressAndOrCondition: true
            }
        },
        { headerName: 'Main Photo', field: 'mainPhoto', filter: false, cellRenderer: "imageCellRender", },
        {
            headerName: 'First Name', field: 'firstName', cellStyle: () => { return { padding: '15px', 'font-size': '14px', 'font-family': 'sans-serif', }; },
            filter: "agTextColumnFilter",
            filterParams: {
                filterOptions: ["equals", "contains"],
                suppressAndOrCondition: true
            }
        },

        {
            headerName: 'Last Name', field: 'lastName', cellStyle: () => { return { padding: '15px', 'font-size': '14px', 'font-family': 'sans-serif', }; },
            filter: "agTextColumnFilter",
            filterParams: {
                filterOptions: ["equals", "contains"],
                suppressAndOrCondition: true
            }
        },

        {
            headerName: 'Email', field: 'email', cellStyle: () => { return { padding: '15px', 'font-size': '14px', 'font-family': 'sans-serif', }; },
            filter: "agTextColumnFilter",
            filterParams: {
                filterOptions: ["equals", "contains"],
                suppressAndOrCondition: true
            }
        },
        {
            headerName: 'Company Name', field: 'companyName', cellStyle: () => { return { padding: '15px', 'font-size': '14px', 'font-family': 'sans-serif', }; },
            filter: "agTextColumnFilter",
            filterParams: {
                filterOptions: ["equals", "contains"],
                suppressAndOrCondition: true
            }
        },
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
        // modules:ExcelExportModule,
        overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
        overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: #fafafa;\">Loading ... </span>"
    };

    const rowData = attendees && attendees.map((attendee) => ({
        id: attendee.id,
        category: (attendee.attendeeCategorySAS && attendee.attendeeCategorySAS[0]) ? attendee.attendeeCategorySAS[0].categoryName : '',
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        email: attendee.email,
        companyName: attendee.companyName,
    }));

    // lazyloading parameter
    const rowHeight = 48;
    const rowBuffer = 0;
    const rowModelType = "serverSide";
    // const rowModelType = "infinite";
    // const cacheOverflowSize = 2;
    // const maxConcurrentDatasourceRequests = 1;
    // const infiniteInitialRowCount = 1;
    const maxBlocksInCache = 2;
    const cacheBlockSize = 100;
    const paginationPageSize = 15;

    const onGridReady = params => {
        const gridApi = params.api;
        mount.current && setGridApi(gridApi)
        const gridColumnApi = params.columnApi;
        // const updateData = data => {
        //     let dataSource = {
        //          rowCount : null,
        //          getRows : function(params){
        //             console.log("asking for " + params.startRow + " to " + params.endRow);
        //             setTimeout(function() {
        //                 let dataAfterSortingAndFiltering = sortAndFilter(data, params.sortModel, params.filterModel);
        //                 let rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
        //                 let lastRow = -1;
        //                 if (dataAfterSortingAndFiltering.length <= params.endRow) {
        //                   lastRow = dataAfterSortingAndFiltering.length;
        //                 }
        //                 params.successCallback(rowsThisPage, lastRow);
        //               }, 500);
        //          }
        //     };
        //     params.api.setDatasource(dataSource);
        // };

        const updateData = data => {
            const server = new FakeServer(data);
            const dataSource = new ServerSideDatasource(server);
            params.api.setServerSideDatasource(dataSource);
        };

        const header = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
            }
        };
        axios.get(`${SERVER_LINK}/api/attendee-sas?page=${params.endRow/15}&size=${2700}`, null, header).then(
            res => {
                console.log("res", res);
                mount.current && setLazyLoadingResult(res.data);
                const value = res.data.map((item, index) => {
                    return {
                        ...item,
                        category: item.attendeeCategorySAS[0].categoryName,
                    }
                });
                updateData(value);
            }
        );
    };

    const ServerSideDatasource = (server) => {
        return {
            getRows: function(params) {
                setTimeout(function() {
                  var response = server.getResponse(params.request);
                  if (response.success) {
                    params.successCallback(response.rows, response.lastRow);
                  } else {
                    params.failCallback();
                  }
                }, 500);
              }
        };
    }

    const FakeServer = (allData) => {
        return {
          getResponse: function(request) {
            console.log("asking for rows: " + request.startRow + " to " + request.endRow);
            let dataAfterSortingAndFiltering = sortAndFilter(allData, request.sortModel, request.filterModel);
            let rowsThisPage = dataAfterSortingAndFiltering.slice(request.startRow, request.endRow);
            let lastRow = dataAfterSortingAndFiltering.length <= request.endRow ? dataAfterSortingAndFiltering.length : -1;
            return {
              success: true,
              rows: rowsThisPage,
              lastRow: lastRow
            };
          }
        };
      }

    const sortAndFilter = (allOfTheData, sortModel, filterModel) => {
        return sortData(sortModel, filterData(filterModel, allOfTheData));
    }

    const sortData = (sortModel, data) => {
        var sortPresent = sortModel && sortModel.length > 0;
        if (!sortPresent) {
            return data;
        }
        var resultOfSort = data.slice();
        resultOfSort.sort(function (a, b) {
            for (var k = 0; k < sortModel.length; k++) {
                var sortColModel = sortModel[k];
                var valueA = a[sortColModel.colId];
                var valueB = b[sortColModel.colId];
                if (valueA == valueB) {
                    continue;
                }
                var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
                if (valueA > valueB) {
                    return sortDirection;
                } else {
                    return sortDirection * -1;
                }
            }
            return 0;
        });
        return resultOfSort;
    }

    const filterData = (filterModel, data) => {
        var filterPresent = filterModel && Object.keys(filterModel).length > 0;
        if (!filterPresent) {
            return data;
        }
        var resultOfFilter = [];

        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            // ID filter
            if (filterModel.id) {
                var id = item.id;
                var allowedId = parseInt(filterModel.id.filter);
                if (filterModel.id.type == "contains" || filterModel.id.type == "equals") {
                    if (id !== allowedId) {
                        continue;
                    }
                }
            }

            // Category filter
            if (filterModel.category) {
                var category = item.category;
                var allowedCategory = filterModel.category.filter;
                if (filterModel.category.type == "contains" || filterModel.category.type == "equals") {
                    if (!category.toUpperCase().includes(allowedCategory.toUpperCase())) {
                        continue;
                    }
                }
            }

            //   First Name Filter
            if (filterModel.firstName) {
                var firstName = item.firstName;
                var allowedFirstName = filterModel.firstName.filter;
                if (filterModel.firstName.type == "contains" || filterModel.firstName.type == "equals") {
                    if (!firstName.toUpperCase().includes(allowedFirstName.toUpperCase())) {
                        continue;
                    }
                }
            }

            //   Last Name Filter
            if (filterModel.lastName) {
                var lastName = item.lastName;
                var allowedLastName = filterModel.lastName.filter;
                if (filterModel.lastName.type == "contains" || filterModel.lastName.type == "equals") {
                    if (!lastName.toUpperCase().includes(allowedLastName.toUpperCase())) {
                        continue;
                    }
                }
            }

            //  Company Name Filter
            if (filterModel.companyName) {
                var companyName = item.companyName;
                var allowedCompanyName = filterModel.companyName.filter;
                if (filterModel.companyName.type == "contains" || filterModel.companyName.type == "equals") {
                    if (!companyName.toUpperCase().includes(allowedCompanyName.toUpperCase())) {
                        continue;
                    }
                }
            }

            // Email Filter
            if (filterModel.email) {
                var email = item.email;
                var allowedEmail = filterModel.email.filter;
                if (filterModel.email.type == "contains" || filterModel.email.type == "equals") {
                    if (!email.toUpperCase().includes(allowedEmail.toUpperCase())) {
                        continue;
                    }
                }
            }
            resultOfFilter.push(item);
        }
        return resultOfFilter;
    }

    const exportExcel = () => {
        // const columnWidth :100;
        const params = {
            columnWidth: 100,
            sheetName: '',
            exportMode: undefined,
            // suppressTextAsCDATA: ,
            rowHeight: 30,
            headerRowHeight: 40,
            // customHeader: []
        };

        gridApi.exportDataAsExcel(params);
    }



    const frameworkComponents = {
        loadingRenderer: LoadingRenderer,
        imageCellRender: ImageCellRender,
    };

    const getRowHeight = () => { return 48; };
    const headerHeight = () => { return 32; };
    const onSelectionChanged = (params) => {
        const gridApi = params.api;
        const selectedRow = gridApi.getSelectedRows();
        dispatch(Actions.setRegistrationRows(selectedRow));
    };

    // console.log('here in registration table: ', attendees);

    return (
        <React.Fragment>
            <div
                className="table-responsive ag-theme-balham"
                style={{ height: '100%', width: '100%', fontSize: '16px' }}
            >
                <Button onClick={exportExcel} color="secondary">Export to Excel</Button>
                <AgGridReact
                    modules={defs.modules}
                    columnDefs={columnDefs}
                    defaultColDef={defs.defaultColDef}
                    rowSelection='multiple'
                    rowDeselection={true}
                    rowData={rowData}
                    frameworkComponents={frameworkComponents}

                    onGridReady={onGridReady}
                    rowBuffer={rowBuffer}
                    rowModelType={rowModelType}
                    // cacheOverflowSize={cacheOverflowSize}
                    // maxConcurrentDatasourceRequests={maxConcurrentDatasourceRequests}
                    // infiniteInitialRowCount={infiniteInitialRowCount}
                    maxBlocksInCache={maxBlocksInCache}
                    cacheBlockSize={cacheBlockSize}
                    rowHeight={rowHeight}

                    // components = {components}
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
