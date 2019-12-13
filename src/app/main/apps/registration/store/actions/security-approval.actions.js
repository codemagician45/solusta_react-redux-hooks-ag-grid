// import Utils
import * as Utils from '../../../../../utils';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_SEC_ATTENDEES = '[REGISTRATION] GET_SEC_ATTENDEES';
export const GET_SEC_APPROVALS = '[REGISTRATION] GET_SEC_APPROVALS';
export const SET_SEC_SELECTED_ROWS = '[REGISTRATION] SET_SEC_SELECTED_ROWS';
export const CHANGE_ATTENDEE_IS_SECURITY_CHANGED = '[REGISTRATION] CHANGE_ATTENDEE_IS_SECURITY_CHANGED';
export const UPDATE_SEC_ATTENDEE = '[REGISTRATION] UPDATE_SEC_ATTENDEE';
export const UPDATE_SEC_MASS_ATTENDEE = '[REGISTRATION] UPDATE_SEC_MASS_ATTENDEE';

export function getSecAttendees(data) {
  return {
    type: GET_SEC_ATTENDEES,
    payload: data,
  };
}

export function getSecApprovals() {
  const request = Utils.xapi().get(`${SERVER_LINK}/api/attendee-sec-approval-sas`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SEC_APPROVALS,
        payload: response.data
      })
    );
}

export function setSecSelectedRows(data) {
  return {
    type: SET_SEC_SELECTED_ROWS,
    payload: data,
  };
}

export function changeAttendeeIsSecurityChanged(data) {
  return {
    type: CHANGE_ATTENDEE_IS_SECURITY_CHANGED,
    payload: data,
  };
}

export function updateSecAttendee(data) {
  return {
    type: UPDATE_SEC_ATTENDEE,
    payload: data,
  };
}

export function updateSecMassAttendee(data) {
  return {
    type: UPDATE_SEC_MASS_ATTENDEE,
    payload: data,
  };
}
