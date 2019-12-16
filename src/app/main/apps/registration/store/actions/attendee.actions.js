// import Utils
import * as Utils from "../../../../../utils";

export const GET_ATTENDEE_CATEGORIES = "[REGISTRATION] GET_ATTENDEE_CATEGORIES";
export const SAVE_ATTENDEE = "[REGISTRATION] SAVE_ATTENDEE";
export const SAVE_ATTENDEE_SUCCESS = "[REGISTRATION] SAVE_ATTENDEE_SUCCESS";
export const SAVE_ATTENDEE_FAIL = "[REGISTRATION] SAVE_ATTENDEE_FAIL";
export const SET_DEFAULT = "[REGISTRATION] SET_DEFAULT";

export const getAttendeeCategories = () => {
  const request = Utils.xapi().get(`/attendee-category-sas`);

  return dispatch =>
    request.then(response => {
      return dispatch({
        type: GET_ATTENDEE_CATEGORIES,
        payload: response.data
      });
    });
};

export const saveAttendee = () => {
  return {
    type: SAVE_ATTENDEE
  };
};

export const saveAttendeeSuccess = data => {
  return {
    type: SAVE_ATTENDEE_SUCCESS,
    payload: data
  };
};

export const saveAttendeeFail = () => {
  return {
    type: SAVE_ATTENDEE_FAIL
  };
};

export const setDefault = () => {
  return {
    type: SET_DEFAULT
  };
};
