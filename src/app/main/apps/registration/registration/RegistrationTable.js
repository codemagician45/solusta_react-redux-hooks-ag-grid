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
    // console.log(props)
    const id = props.data && props.data.id;
    // const attendee = attendees.filter((attendee) => {return attendee.id === parseInt(id) });
    const attendee = props.data && props.data;

    const style = {
        height: '48px',
        width: '48px',
        padding: '5px'
    };
    // if (attendee[0] && attendee[0].mainPhoto === '')
    if (attendee && attendee.mainPhoto === '')
        return (
            <img src={'../assets/images/avatars/profile.jpg'} width={48} height={48} alt={'profile'} style={{ padding: '5px' }} />
        );
    else {
        return (
            <Link to={`/app/registration/registration/${id}`}>
                {/* <img src={`data:${attendee[0] && attendee[0].mainPhotoContentType};base64, ${attendee[0] && attendee[0].mainPhoto}`} style={style} alt={'profile'} /> */}
                <img src={`data:${attendee && attendee.mainPhotoContentType};base64, ${attendee && attendee.mainPhoto}`} style={style} alt={'profile'} />
            </Link>
        );
    }
}

// Action cell renderer
function ActionCellRendererPrint(props) {
    const dispatch = useDispatch();
    const printHandler = () => {
        const { data } = props;
        dispatch(Actions.updateRegBadgeActivityPrint(data));
        // console.log('here print button click event: ', data);
    }
    // console.log("print", props)
    if (props.data.printCount >= 1) {
        return (
            <Button onClick={printHandler} disabled={true} variant="contained" color="secondary">Printed</Button>
        );
    } else {
        return (
            <Button onClick={printHandler} variant="contained" color="secondary">Printed</Button>
        );
    }
}

function ActionCellRendererCollection(props) {
    const dispatch = useDispatch();
    const collectionHandler = () => {
        const { data } = props;
        dispatch(Actions.updateRegBadgeActivityCollection(data));
        // console.log('here collection button click event: ', data);
    }

    if (props.data.isCollected === 'true') {
        return (
            <Button onClick={collectionHandler} disabled={true} variant="contained" color="secondary">Collected</Button>
        );
    } else {
        return (
            <Button onClick={collectionHandler} variant="contained" color="secondary">Collected</Button>
        );
    }
}

var resultCount=0;

function RegistrationTable(props) {
    const dispatch = useDispatch();
    const mount = useRef(false);
    const count = useSelector(({ registerApp }) => registerApp.registration.count);

    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const printedCounts = useSelector(({ registerApp }) => registerApp.registration.printedCounts);
    const badgeIDs = useSelector(({ registerApp }) => registerApp.registration.badgeIDs);

    useEffect(() => {
        dispatch(Actions.getAttendeeCount());
    })
    resultCount = count;

    const [gridApi, setGridApi] = useState(null);
    const [idFilter, setIDFilter] = useState(null);

    useEffect(() => {
        mount.current = true;
        return () => {
            mount.current = false;
        }
    })

    useEffect(() => {
        getBadgeIdArr();
    }, [attendees]);

    useEffect(() => {
        getPrintCountArr();
    }, [badgeIDs]);

    const getBadgeIdArr = () => {
        const promiseArr = attendees && attendees.map((attendee, index) => {
            return getBadgeId(attendee);
        });
        Promise.all(promiseArr).then(values => {
            let badgeIdArr = [];
            values.map((value, index) => {
                if (value) {
                    badgeIdArr.push({
                        badgeFriendlyID: value.badgeFriendlyID,
                        badgeActivitySAId: value.badgeActivitySAId,
                        attendeeSAId: value.attendeeSAId,
                        badgeId: value.id,
                    });
                } else {
                    badgeIdArr.push({
                        badgeFriendlyID: 0,
                        badgeActivitySAId: 0,
                        attendeeSAId: 0,
                        badgeId: 0,
                    });
                }
            });
            dispatch(Actions.getRegBadgeIDs(badgeIdArr));
        }).catch(error => {
            console.log('here error in get badge id error: ', error);
        });
    };


    const getBadgeId = (item) => {
        return new Promise((resolve, reject) => {
            const header = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
                }
            };
            axios.get(`${SERVER_LINK}/api/badge-sas?attendeeSAId.equals=${item.id}`, null, header)
                .then((res) => {
                    // console.log('here in friend id: ', res);
                    resolve((res.data && res.data.length > 0) ? res.data[0] : 0);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const getPrintCountArr = () => {
        const promiseArr = badgeIDs && badgeIDs.map((badgeID, index) => {
            return getPrintCount(badgeID);
        });
        Promise.all(promiseArr).then(values => {
            let printCountArr = [];
            values.map((value, index) => {
                // return attendeeID and badgeFriendlyID
                if (value) {
                    printCountArr.push({
                        badgeActivityId: value.id,
                        printedCount: value.printedCount,
                        isCollected: value.isCollected,
                        badgeId: badgeIDs[index].badgeId,
                    });
                } else {
                    printCountArr.push({
                        badgeActivityId: 0,
                        printedCount: 0,
                        isCollected: false,
                        badgeId: badgeIDs[index].badgeId,
                    });
                }
            });
            dispatch(Actions.getRegPrintCounts(printCountArr));
        }).catch(error => {
            console.log('here error in get print count error: ', error);
        });
    };

    const getPrintCount = (item) => {
        return new Promise((resolve, reject) => {
            const header = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
                }
            };
            axios.get(`${SERVER_LINK}/api/badge-activity-sas?badgeSAId.equals=${item.badgeId}`, null, header)
                .then((res) => {
                    // console.log('here in print count: ', res);
                    resolve((res.data && res.data.length > 0) ? res.data[0] : 0);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
        // {
        //     headerName: 'Print Action',
        //     cellRenderer: "actionCellRendererPrint",
        //     field: 'printCount',
        //     cellStyle: {
        //         'margin-top': '5px',
        //     },
        //     sortable: false,
        //     filter: false
        // },
        // {
        //     headerName: 'Collection Action',
        //     cellRenderer: "actionCellRendererCollection",
        //     field: 'action',
        //     cellStyle: {
        //         'margin-top': '5px',
        //     },
        //     sortable: false,
        //     filter: false
        // },
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

    // const rowData = attendees && attendees.map((attendee) => {
    //     const badgeFriendId = (badgeIDs.length > 0 && badgeIDs.find(el => el.attendeeSAId === attendee.id)) ? badgeIDs.find(el => el.attendeeSAId === attendee.id).badgeFriendlyID : -1;
    //     const badgeId = (badgeIDs.length > 0 && badgeIDs.find(el => el.attendeeSAId === attendee.id)) ? badgeIDs.find(el => el.attendeeSAId === attendee.id).badgeId : 0;
    //     const printCount = (printedCounts.length > 0 && printedCounts.find(el => el.badgeId === badgeId)) ? printedCounts.find(el => el.badgeId === badgeId).printedCount : -1;
    //     const isCollected = (printedCounts.length > 0 && printedCounts.find(el => el.badgeId === badgeId)) ? printedCounts.find(el => el.badgeId === badgeId).isCollected : 0;
    //     const badgeActivityId = (printedCounts.length > 0 && printedCounts.find(el => el.badgeId === badgeId)) ? printedCounts.find(el => el.badgeId === badgeId).badgeActivityId : 0;
    //     // console.log('here in registration table: ', badgeId, printCount, badgeActivityId)
    //     const temp = {
    //         id: attendee.id,
    //         category: (attendee.attendeeCategorySAS && attendee.attendeeCategorySAS[0]) ? attendee.attendeeCategorySAS[0].categoryName : '',
    //         firstName: attendee.firstName,
    //         lastName: attendee.lastName,
    //         email: attendee.email,
    //         companyName: attendee.companyName,
    //         badgeActivityId: badgeActivityId,
    //         printCount: printCount,
    //         badgeId: badgeId,
    //         isCollected: isCollected ? 'true' : 'false',
    //     }
    //     return temp;
    // });

    const frameworkComponents = {
        loadingRenderer: LoadingRenderer,
        imageCellRender: ImageCellRender,
        // actionCellRendererPrint: ActionCellRendererPrint,
        // actionCellRendererCollection: ActionCellRendererCollection
    };



    // lazyloading parameter
    const rowHeight = 48;
    const rowModelType = "serverSide";
    const maxBlocksInCache = 2;
    const cacheBlockSize = 15;

    const onGridReady = params => {
        const gridApi = params.api;
        // mount.current && setGridApi(gridApi);
        // const gridColumnApi = params.columnApi;
    
        const server = new FakeServer();
        const dataSource = new ServerSideDatasource(server);
        params.api.setServerSideDatasource(dataSource);
        
        var idFilterComponent = gridApi.getFilterInstance("id");
        idFilterComponent.applyModel();
        console.log(idFilterComponent)
        console.log("filter Input value", idFilterComponent)
        gridApi.onFilterChanged();
    };

    const ServerSideDatasource = (server) => {
        return {
            getRows: function (params) {
                setTimeout(async function () {
                    var response = await server.getResponse(params.request);
                    if (response.success) {
                        params.successCallback(response.rows, response.lastRow);
                    } else {
                        params.failCallback();
                    }
                }, 500);
            }
        };
    }

    const FakeServer = () => {
        return {
            getResponse: function (request) {
                return new Promise((resolve, reject) => {
                    console.log("asking for rows: " + request.startRow + " to " + request.endRow);
                    const header = {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
                        }
                    };
                    axios.get(`${SERVER_LINK}/api/attendee-sas?page=${request.endRow / cacheBlockSize - 1}&size=${cacheBlockSize}`, null, header).then(
                        res => {
                            let lastRow = request.endRow <= resultCount ? -1 : resultCount;
                            const rowData = res.data && res.data.map(data => {
                                const temp = {
                                    id:data.id,
                                    category:data.attendeeCategorySAS[0].categoryName,
                                    firstName:data.firstName,
                                    lastName:data.lastName,
                                    companyName:data.companyName,
                                    email:data.email,
                                    mainPhoto:data.mainPhoto,
                                    mainPhotoContentType:data.mainPhotoContentType
                                }
                                return temp;
                            })
                            let result = {
                                    success: true,
                                    rows: rowData,
                                    lastRow: lastRow
                            }
                            resolve(result)
                        });

                });
            }
        };
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

    // const getRowHeight = () => { return 48; };
    // const headerHeight = () => { return 32; };
    const onSelectionChanged = (params) => {
        const gridApi = params.api;
        const selectedRow = gridApi.getSelectedRows();
        dispatch(Actions.setRegistrationRows(selectedRow));
    };

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
                    // rowData={rowData}
                    frameworkComponents={frameworkComponents}
                    // getRowHeight={getRowHeight}
                    // headerHeight={headerHeight}

                    onGridReady={onGridReady}
                    rowModelType={rowModelType}
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
