import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui components
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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

const approveMassSecurity = (attendees, selectedRows, dispatch) => {
  const realArr = attendees.filter(attendee => {
    return selectedRows.some(row => {
      return row.attendeeId === attendee.id;
    });
  });

  const promiseArr = realArr.map(item => updateIndividualAttendeeSec(item));
  Promise.all(promiseArr)
    .then(values => {
      const updateArr = values.map(value => ({
        ...value,
      }));
      dispatch(Actions.updateSecMassAttendee(updateArr))
    })
    .catch(error => {
      console.log('here promise all error: ', error);
    });
};

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
};

const getAttendeeSecApprovalCount = () => {
  return new Promise((resolve, reject) => {
    Utils.xapi().get(`/attendee-sec-approval-sas/count`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function SecurityApproval() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const attendees = Utils.objectToArray(useSelector(({ registerApp }) => registerApp.securityApproval.attendees));
  const selectedRows = Utils.objectToArray(useSelector(({ registerApp }) => registerApp.securityApproval.selectedRows))

  useEffect(() => {
    dispatch(Actions.getSecApprovals());
  }, [dispatch]);

  useEffect(() => {
    const getSecApprovalCount = async () => {
      let badgeCount = await getAttendeeSecApprovalCount();
      setCount(badgeCount);
    }
    getSecApprovalCount();
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
            Attendee Security Approval Count: {count}
          </Typography>
          <div>
            <Button className="whitespace-no-wrap" color="default" variant="contained" style={{ marginRight: '10px' }}>Export</Button>
            {selectedRows.length > 0 ? (
              <Button color="secondary" onClick={() => approveMassSecurity(attendees, selectedRows, dispatch)} variant="contained">Security Approve</Button>
            ) : (
                <Button color="secondary" disabled={true} variant="contained">Security Approve</Button>
              )}
          </div>
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
