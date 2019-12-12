import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui components
import { Button } from '@material-ui/core';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import utils
import * as Utils from '../../../../utils';

// import core components
import { FusePageCarded } from '@fuse';

// import components
import SecurityApprovalTable from './SecurityApprovalTable';


function SecurityApproval() {
  const dispatch = useDispatch();
  const attendees = Utils.objectToArray(useSelector(({ registerApp }) => registerApp.securityApproval.attendees));
  const selectedRows = Utils.objectToArray(useSelector(({ registerApp }) => registerApp.securityApproval.selectedRows))

  useEffect(() => {
    dispatch(Actions.getSecAttendees());
    dispatch(Actions.getSecApprovals());
  }, [dispatch]);

  const approveMassSecurity = () => {
    const realArr = attendees.filter(attendee => {
      return selectedRows.some(row => {
        return row.attendeeId === attendee.id;
      });
    });

    const promiseArr = realArr.map(item => updateIndividualAttendeeSec(item));
    Promise.all(promiseArr)
      .then(values => {
        const updateArr = [];
        values.map(value => {
          updateArr.push({
            ...value,
            isSecurityChanged: false,
          });
        });
        dispatch(Actions.updateSecMassAttendee(updateArr))
      })
      .catch(error => {
        console.log('here promise all error: ', error);
      })
    console.log('here approve mass security button clicked: ', attendees, selectedRows, realArr);
  }

  const updateIndividualAttendeeSec = (item) => {
    return new Promise((resolve, reject) => {
      Utils.xapi().put('/attendee-sas', { ...item })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    })
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
