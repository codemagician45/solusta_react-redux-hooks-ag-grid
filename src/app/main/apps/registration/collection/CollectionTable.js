import React from 'react';
import { useDispatch } from 'react-redux';

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

// import utils
import * as Utils from '../../../../utils';

const getLazyLoadingDataSet = (endRow, startRow) => {
	return new Promise((resolve, reject) => {
		Utils.xapi().get(`/attendee-sas?page=${endRow / 50 - 1}&size=${50}`)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const getBadge = (item) => {
	return new Promise((resolve, reject) => {
		Utils.xapi().get(`/badge-sas?attendeeSAId.equals=${item.id}`)
			.then((res) => {
				console.log('here in badge request: ', res);
				resolve((res.data && res.data.length > 0) ? res.data[0] : 0);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const getBadgeActivity = (item) => {
	return new Promise((resolve, reject) => {
		Utils.xapi().get(`/badge-activity-sas?badgeSAId.equals=${item.id}`)
			.then((res) => {
				resolve((res.data && res.data.length > 0) ? res.data[0] : 0);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

const getBadges = (attendees, dispatch) => {
	const promiseArr = attendees && attendees.map((attendee, index) => (
		getBadge(attendee)
	));

	Promise.all(promiseArr).then(values => {
		const badgeArr = values.map((value, index) => {
			if (!!value) {
				return {
					...value,
				};
			} else {
				return {};
			}
		});
		dispatch(Actions.getCollectionBadges(badgeArr));
	}).catch(error => {
		console.log('here error in get badge id error: ', error);
	});
};

const getBadgeActivities = (badges, dispatch) => {
	const promiseArr = badges && badges.map((badge, index) => (
		getBadgeActivity(badge)
	));

	Promise.all(promiseArr).then(values => {
		const badgeActivityArr = values.map((value, index) => {
			if (!!value) {
				return {
					...value,
					badgeId: badges[index].badgeId,
				};
			} else {
				return {};
			}
		});
		dispatch(Actions.getCollectionBadgeActivities(badgeActivityArr));
	}).catch(error => {
		console.log('here error in get print count error: ', error);
	});
};

const getAttendsCount = () => {
	return new Promise((resolve, reject) => {
		Utils.xapi().get(`/attendee-sas/count`)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			})
	})
}

function CollectionTable(props) {
	const dispatch = useDispatch();

	// Ag-Grid options
	const columnDefs = [
		{
			headerName: 'Badge ID',
			field: 'badgeFriendId',
			cellStyle: {
				'padding': '15px',
				'font-size': '14px',
				'font-family': 'sans-serif',
			},
			checkboxSelection: true,
		},
		{
			headerName: 'IsCollected',
			field: 'isCollected',
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
		overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
		overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: #fafafa;\">Loading ... </span>"
	};
	const frameworkComponents = { actionCellRenderer: ActionCellRenderer };
	const getRowHeight = () => 48;
	const headerHeight = () => 32;

	// Ag-Grid event handler
	const onSelectionChanged = (params) => {
		const gridApi = params.api;
		const selectedRow = gridApi.getSelectedRows();
		console.log('here in selected row data in ag-grid: ', selectedRow);
		dispatch(Actions.setCollectionUpdateBadges(selectedRow));
	};
	const onGridReady = async (params) => {
		let count = await getAttendsCount();
		const server = new FakeServer(count, dispatch);
		const dataSource = new ServerSideDataSource(server);
		params.api.setServerSideDatasource(dataSource);
	}

	return (
		<React.Fragment>
			<div
				className="table-responsive ag-theme-balham"
				style={{ height: '100%', width: '100%', fontSize: '16px' }}
			>
				<AgGridReact
					modules={defs.modules}
					columnDefs={columnDefs}
					defaultColDef={defs.defaultColDef}
					frameworkComponents={frameworkComponents}
					rowSelection={'multiple'}
					pagination={true}
					paginationPageSize={20}
					onSelectionChanged={onSelectionChanged}
					rowModelType={'serverSide'}
					cacheBlockSize={50}
					maxBlocksInCache={10}
					animateRows={true}
					onGridReady={onGridReady}
					getRowHeight={getRowHeight}
					headerHeight={headerHeight}
					overlayLoadingTemplate={defs.overlayLoadingTemplate}
					overlayNoRowsTemplate={defs.overlayNoRowsTemplate}
				>
				</AgGridReact>
			</div>
		</React.Fragment>
	);
}

// Ag-Grid Server Side Data source
function ServerSideDataSource(server) {
	return {
		getRows: async function (params) {
			var response = await server.getResponse(params.request);
			if (response.success) {
				params.successCallback(response.rows, response.lastRow);
			} else {
				params.failCallback();
			}
		}
	};
}

// Ag-Grid Fake server
function FakeServer(attendeesCount, dispatch) {
	return {
		getResponse: async function (request) {
			// console.log("asking for rows: " + request.startRow + " to " + request.endRow);
			const lazyLoadingSet = await getLazyLoadingDataSet(request.endRow, request.startRow, attendeesCount);
			let lastRow = request.endRow <= attendeesCount ? -1 : attendeesCount;
			dispatch(Actions.getCollectionAttendees(lazyLoadingSet));
			const rows = lazyLoadingSet.map(attendee => {
				return {
					...attendee,
					badgeFriendId: 0,
					isCollected: 0,
					category: (attendee.attendeeCategorySAS[0] && attendee.attendeeCategorySAS[0].categoryName) || '',
				};
			});
			return {
				success: true,
				rows,
				lastRow,
			};
		}
	};
}

// Action cell renderer
function ActionCellRenderer(props) {
	const dispatch = useDispatch();
	const { data } = props;
	const updateBadgeActivity = () => {
		// console.log('here update button click: ', data);
		const body = {
			id: data.badgeActivityId,
			isCollected: true,
		};
		Utils.xapi().put(`/badge-activity-sas`, body)
			.then(response => {
				console.log('here update button click response: ', response);
				const updateData = {
					badgeActivityId: response.data.id,
					isCollected: response.data.isCollected,
					badgeId: data.badgeId,
				};
				dispatch(Actions.updateCollectionBadgeActivity(updateData));
			})
			.catch(error => {
				console.log('update badge activity isCollected error: ', error);
			});
	}

	if (!props.data.isCollected) {
		return (
			<Button disabled={true} variant="contained" color="secondary">Collected</Button>
		);
	} else {
		return (
			<Button onClick={updateBadgeActivity} variant="contained" color="secondary">Collected</Button>
		);
	}
}

export default withReducer('registerApp', reducer)(CollectionTable);
