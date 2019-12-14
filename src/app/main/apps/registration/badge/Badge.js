import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print'; // for Print React component

// import @material-ui components
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// import Redux
import withReducer from 'app/store/withReducer';
// import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import Utils
import * as Utils from '../../../../utils';

// import components
import { FusePageCarded } from '@fuse';
import BadgeTable from './BadgeTable';
import BadgePrintComponent from './BadgePrintComponent';

const getBadgeTotalCount = () => {
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

function Badge() {
	const [count, setCount] = useState(0);

	const printRef = useRef();
	const selectedRows = useSelector(({ registerApp }) => registerApp.badge.selectedRows);
	const attendees = useSelector(({ registerApp }) => registerApp.badge.attendees);

	useEffect(() => {
		const getBadgeCount = async () => {
			let badgeCount = await getBadgeTotalCount();
			setCount(badgeCount);
		}
		getBadgeCount();
	}, []);

	return (
		<FusePageCarded
			classes={{
				content: "flex",
				header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<Typography variant="subtitle1" gutterBottom>
						Badge Total Count: {count}
					</Typography>
					<div>
						<Button className="whitespace-no-wrap" color="default" variant="contained" style={{ marginRight: '10px' }}>Export</Button>
						<ReactToPrint
							trigger={() => {
								if (selectedRows.length > 0) {
									return (
										<Button color="secondary" variant="contained">Print Badges</Button>
									);
								} else {
									return (
										<Button color="secondary" disabled={true} variant="contained">Print Badges</Button>
									);
								}
							}}
							content={() => printRef.current}
						/>
						<BadgePrintComponent attendees={attendees} selectedRows={selectedRows} ref={printRef} />
					</div>
				</div>
			}
			content={
				<BadgeTable />
			}
			innerScroll
		/>
	);
}

export default withReducer('registerApp', reducer)(Badge);
