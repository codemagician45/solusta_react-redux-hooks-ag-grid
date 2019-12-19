import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui components
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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

const updateBadgeActivity = (row) => {
	return new Promise((resolve, reject) => {
		const body = {
			id: row.badgeActivityId,
			isCollected: true,
		};
		Utils.xapi().put(`/badge-activity-sas`, body)
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

const getBadgeActivityTotalCount = () => {
	return new Promise((resolve, reject) => {
		Utils.xapi().get(`/badge-sas/count`)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
}

function Collection() {
	const [count, setCount] = useState(0);

	const dispatch = useDispatch();
	const tableRef = useRef(null);
	const selectedBadges = useSelector(({ registerApp }) => registerApp.collection.selectedBadges);

	useEffect(() => {
		const getBadgeActivityCount = async () => {
			let badgeActivityCount = await getBadgeActivityTotalCount();
			setCount(badgeActivityCount);
		}
		getBadgeActivityCount();
	}, []);

	const onExportToExcel = () => {
		tableRef && tableRef.current.exportToExcel();
	}

	return (
		<FusePageCarded
			classes={{
				content: "flex",
				header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<Typography variant="subtitle1" gutterBottom>
						Badge Activity Total Count: {count}
					</Typography>
					<div>
						<Button className="whitespace-no-wrap" color="default" variant="contained" style={{ marginRight: '10px' }} onClick={onExportToExcel}>Export</Button>
						{(selectedBadges.length > 0) ? (
							<Button color="secondary" variant="contained" onClick={() => updateBadgeActivities(selectedBadges, dispatch)}>Collect Selected Rows</Button>
						) : (
								<Button color="secondary" variant="contained" disabled={true}>Collect Selected Rows</Button>
							)}
					</div>
				</div>
			}
			content={
				<CollectionTable ref={tableRef} />
			}
			innerScroll
		/>
	);
}

export default withReducer('registerApp', reducer)(Collection);
