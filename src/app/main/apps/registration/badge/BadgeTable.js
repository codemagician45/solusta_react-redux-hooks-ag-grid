import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// import Ag-grid module
import { AgGridReact } from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

// import @material-ui components
import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

// Ag-Grid Server Side Data source
function ServerSideDatasource(server) {
	return {
		getRows: function (params) {
			setTimeout(function () {
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

// Ag-Grid Fake server
function FakeServer(allData) {
	return {
		getResponse: function (request) {
			console.log("asking for rows: " + request.startRow + " to " + request.endRow);
			var rowsThisPage = allData.slice(request.startRow, request.endRow);
			var lastRow = allData.length <= request.endRow ? allData.length : -1;
			return {
				success: true,
				rows: rowsThisPage,
				lastRow: lastRow
			};
		}
	};
}

// Action cell renderer
function ActionCellRenderer(props) {
	const dispatch = useDispatch();
	const printHandler = () => {
		const { data } = props;
		dispatch(Actions.updateBadgeActivity(data));
		console.log('here print button click event: ', data);
	}

	return (
		<Button onClick={printHandler} variant="contained" color="secondary">Printed</Button>
	);
}

function BadgeTable(props) {
	const dispatch = useDispatch();
	const attendees = useSelector(({ registerApp }) => registerApp.badge.attendees);
	const badgeIDs = useSelector(({ registerApp }) => registerApp.badge.badgeIDs);
	const printCounts = useSelector(({ registerApp }) => registerApp.badge.printCounts);

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
				// return attendeeID and badgeFriendlyID
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
			dispatch(Actions.getBadgeIDs(badgeIdArr));
		}).catch(error => {
			console.log('here error in get badge id error: ', error);
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
						badgeId: badgeIDs[index].badgeId,
					});
				} else {
					printCountArr.push({
						badgeActivityId: 0,
						printedCount: 0,
						badgeId: badgeIDs[index].badgeId,
					});
				}
			});
			dispatch(Actions.getPrintCounts(printCountArr));
		}).catch(error => {
			console.log('here error in get print count error: ', error);
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

	const getPrintCount = (item) => {
		return new Promise((resolve, reject) => {
			const header = {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
				}
			};
			axios.get(`${SERVER_LINK}/api/badge-activity-sas?badgeSAId.equals=${item.badgeId}`, null, header)
				.then((res) => {
					console.log('here in print count: ', res);
					resolve((res.data && res.data.length > 0) ? res.data[0] : 0);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	const columnDefs = [
		// {headerName: 'Badge ID', field: 'badgeId', cellStyle:() => { return { padding:'15px', 'font-size': '14px', 'font-family': 'sans-serif' };}, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true},
		{
			headerName: 'Badge ID',
			field: 'badgeFriendId',
			cellStyle: {
				'padding': '15px',
				'font-size': '14px',
				'font-family': 'sans-serif',
			}
		},
		{
			headerName: 'Action',
			cellRenderer: "actionCellRenderer",
			field: 'action',
			cellStyle: {
				'margin-top': '5px',
			},
			sortable: false,
			filter: false
		},
		{
			headerName: 'Printed(Count)',
			field: 'printCount',
			cellStyle: {
				'padding': '15px',
				'font-size': '14px',
				'font-family': 'sans-serif',
			}
		},
		{
			headerName: 'First Name',
			field: 'firstName',
			cellStyle: {
				'padding': '15px',
				'font-size': '14px',
				'font-family': 'sans-serif',
			},
		},
		{
			headerName: 'Last Name',
			field: 'lastName',
			cellStyle: {
				'padding': '15px',
				'font-size': '14px',
				'font-family': 'sans-serif',
			},
		},
		{
			headerName: 'Category',
			field: 'category',
			cellStyle: {
				'padding': '15px',
				'font-size': '14px',
				'font-family': 'sans-serif',
			}
		},
		{
			headerName: 'Company',
			field: 'companyName',
			cellStyle: {
				'padding': '15px',
				'font-size': '14px',
				'font-family': 'sans-serif',
			}
		}
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
	const rowData = attendees && attendees.map((item) => {
		const badgeFriendId = (badgeIDs.length > 0 && badgeIDs.find(el => el.attendeeSAId === item.id)) ? badgeIDs.find(el => el.attendeeSAId === item.id).badgeFriendlyID : -1;
		const badgeId = (badgeIDs.length > 0 && badgeIDs.find(el => el.attendeeSAId === item.id)) ? badgeIDs.find(el => el.attendeeSAId === item.id).badgeId : 0;
		const printCount = (printCounts.length > 0 && printCounts.find(el => el.badgeId === badgeId)) ? printCounts.find(el => el.badgeId === badgeId).printedCount : -1;
		const badgeActivityId = (printCounts.length > 0 && printCounts.find(el => el.badgeId === badgeId)) ? printCounts.find(el => el.badgeId === badgeId).badgeActivityId : 0;
		const temp = {
			id: item.id,
			badgeId: badgeId,
			badgeFriendId: badgeFriendId,
			badgeActivityId: badgeActivityId,
			printCount: printCount,
			category: (item.attendeeCategorySAS && item.attendeeCategorySAS[0]) ? item.attendeeCategorySAS[0].categoryName : '',
			firstName: item.firstName,
			lastName: item.lastName,
			companyName: item.companyName,
		};
		return temp;
	});
	const frameworkComponents = {
		actionCellRenderer: ActionCellRenderer
	};
	const getRowHeight = () => {
		return 48;
	};
	const headerHeight = () => {
		return 32;
	};
	const onSelectionChanged = (params) => {
		const gridApi = params.api;
		const selectedRow = gridApi.getSelectedRows();
		console.log('here in selected row data in ag-grid: ', selectedRow);
		// dispatch(Actions.setAttendeeSelectRow(selectedRow));
	};

	console.log('here is print count: ', printCounts, badgeIDs);

	return (
		<React.Fragment>
			<div
				className="table-responsive ag-theme-balham"
				style={{ height: '100%', width: '100%', fontSize: '16px' }}
			>
				<AgGridReact
					modules={AllModules}
					columnDefs={columnDefs}
					defaultColDef={defs.defaultColDef}
					rowSelection='multiple'
					rowData={rowData}
					frameworkComponents={frameworkComponents}
					// onGridReady={onGridReady}
					pagination={true}
					paginationPageSize={13}
					getRowHeight={getRowHeight}
					headerHeight={headerHeight}
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

export default withReducer('registerApp', reducer)(BadgeTable);
