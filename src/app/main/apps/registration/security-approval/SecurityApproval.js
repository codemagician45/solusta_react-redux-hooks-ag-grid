import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui components
import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import { FusePageCarded } from '@fuse';
import SecurityApprovalTable from './SecurityApprovalTable';

const objectToArray = (obj) => {
  return Object.keys(obj).map((key, index) => {
    return obj[key];
  });
};

function SecurityApproval() {
  const dispatch = useDispatch();
  const selectedRows = objectToArray(useSelector(({ registerApp }) => registerApp.securityApproval.selectedRows))

  useEffect(() => {
    dispatch(Actions.getSecAttendees());
    dispatch(Actions.getSecApprovals());
  }, [dispatch]);

  const approveMassSecurity = () => {
    console.log('here approve mass security button clicked: ');
  }

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <Button className="whitespace-no-wrap" color="secondary" variant="contained" style={{ visibility: 'hidden' }}>Security Approvals</Button>
          {selectedRows.length > 0 ? (
            <Button color="secondary" onClick={approveMassSecurity} variant="contained">Security Approve</Button>
          ) : (
              <Button color="secondary" disabled={true} variant="contained">Security Approve</Button>
            )}
        </div>
      }
      content={
        <SecurityApprovalTable />
      }
      innerScroll
    />
  );
}

export default withReducer('registerApp', reducer)(SecurityApproval);
