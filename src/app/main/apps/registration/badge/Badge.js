import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print'; // for Print React component

import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
// import * as Actions from '../store/actions';
import reducer from '../store/reducers';

import { FusePageCarded } from '@fuse';
import BadgeTable from './BadgeTable';
import BadgePrintComponent from './BadgePrintComponent';

function Badge() {
	const printRef = useRef();
	const selectedRows = useSelector(({ registerApp }) => registerApp.badge.selectedRows);
	const attendees = useSelector(({ registerApp }) => registerApp.badge.attendees);

	return (
		<FusePageCarded
			classes={{
				content: "flex",
				header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<Button className="whitespace-no-wrap" color="secondary" variant="contained" style={{ visibility: 'hidden' }}>Print Before</Button>
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
			}
			content={
				<BadgeTable />
			}
			innerScroll
		/>
	);
}

export default withReducer('registerApp', reducer)(Badge);
