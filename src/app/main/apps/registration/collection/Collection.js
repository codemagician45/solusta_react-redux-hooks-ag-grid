import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// import @material-ui components
import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import { FusePageCarded } from '@fuse';
import CollectionTable from './CollectionTable';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;


function Collection() {
	const dispatch = useDispatch();
	const updatingRows = useSelector(({ registerApp }) => registerApp.collection.updatingRows);

	useEffect(() => {
		dispatch(Actions.getCollectionAttendees());
	}, [dispatch]);

	const updateBadgeActivity = () => {
		const realUpdatingRows = updatingRows.filter((row, index) => row.isCollected !== 'true');
		const updatingArr = realUpdatingRows
			.map((row, index) => {
				return updateIndividual(row);
			});

		const updatingBadgeArr = [];
		Promise.all(updatingArr)
			.then(values => {
				values.map((value, index) => {
					updatingBadgeArr.push({
						badgeActivityId: value.id,
						isCollected: value.isCollected,
						badgeId: realUpdatingRows[index].badgeId,
					})
				});

				dispatch(Actions.updateBadgeActivities(updatingBadgeArr));
			})
			.catch(error => {
				console.log('updating badge activity isCollected error: ', error);
			});
	}

	const updateIndividual = (row) => {
		return new Promise((resolve, reject) => {
			const header = {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
				}
			};
			const body = {
				id: row.badgeActivityId,
				isCollected: true,
			};
			axios.put(`${SERVER_LINK}/api/badge-activity-sas`, body, header)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	return (
		<FusePageCarded
			classes={{
				content: "flex",
				header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<Button className="whitespace-no-wrap" color="secondary" variant="contained" style={{ visibility: 'hidden' }}>Collect Selected Rows</Button>
					<Button color="secondary" variant="contained" onClick={updateBadgeActivity}>Collect Selected Rows</Button>
				</div>
			}
			content={
				<CollectionTable />
			}
			innerScroll
		/>
	);
}

export default withReducer('registerApp', reducer)(Collection);
