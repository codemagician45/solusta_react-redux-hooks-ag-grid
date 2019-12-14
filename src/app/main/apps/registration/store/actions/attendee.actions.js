// import Utils
import * as Utils from '../../../../../utils';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_ATTENDEE_CATEGORIES = '[REGISTRATION] GET_ATTENDEE_CATEGORIES';
export const SAVE_ATTENDEE = '[REGISTRATION] SAVE_ATTENDEE';
export const SAVE_ATTENDEE_SUCCESS = '[REGISTRATION] SAVE_ATTENDEE_SUCCESS';
export const SAVE_ATTENDEE_FAIL = '[REGISTRATION] SAVE_ATTENDEE_FAIL';

export const getAttendeeCategories = () => {
	const body = {};
	const header = {
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const request = Utils.xapi().get(`${SERVER_LINK}/api/attendee-category-sas`, body, header);

	return (dispatch) =>
		request.then((response) => {
			return dispatch({
				type: GET_ATTENDEE_CATEGORIES,
				payload: response.data
			})
		});
}

export const saveAttendee = () => {
	return {
		type: SAVE_ATTENDEE,
	}
}

export const saveAttendeeSuccess = (data) => {
	return {
		type: SAVE_ATTENDEE_SUCCESS,
		payload: data,
	}
}

export const saveAttendeeFail = () => {
	return {
		type: SAVE_ATTENDEE_FAIL,
	}
}
