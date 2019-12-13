import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui components
import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import Utils
import * as Utils from '../../../../utils';

// import core components
import { FusePageCarded } from '@fuse';

// import components
import CollectionTable from './CollectionTable';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

const updateBadgeActivity = (row) => {
	return new Promise((resolve, reject) => {
		const body = {
			id: row.badgeActivityId,
			isCollected: true,
		};
		Utils.xapi().put(`${SERVER_LINK}/api/badge-activity-sas`, body)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}

const updateBadgeActivities = (badges, dispatch) => {
	const realUpdatingRows = badges.filter((row, index) => row.isCollected !== 'true');
	const updatingArr = realUpdatingRows
		.map((row, index) => (
			updateBadgeActivity(row)
		));

	Promise.all(updatingArr)
		.then(values => {
			const updatingBadgeArr = values.map((value, index) => ({
				...value,
				badgeId: realUpdatingRows[index].badgeId,
			}));

			dispatch(Actions.updateCollectionBadgeActivities(updatingBadgeArr));
		})
		.catch(error => {
			console.log('updating badge activity isCollected error: ', error);
		});
}

function Collection() {
	const dispatch = useDispatch();
	const selectedBadges = useSelector(({ registerApp }) => registerApp.collection.selectedBadges);

	useEffect(() => {
		dispatch(Actions.getCollectionAttendeesCount());
	}, [dispatch]);

	return (
		<FusePageCarded
			classes={{
				content: "flex",
				header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<Button className="whitespace-no-wrap" color="secondary" variant="contained" style={{ visibility: 'hidden' }}>Collect Selected Rows</Button>
					{(selectedBadges.length > 0) ? (
						<Button color="secondary" variant="contained" onClick={() => updateBadgeActivities(selectedBadges, dispatch)}>Collect Selected Rows</Button>
					) : (
							<Button color="secondary" variant="contained" disabled={true}>Collect Selected Rows</Button>
						)}
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
