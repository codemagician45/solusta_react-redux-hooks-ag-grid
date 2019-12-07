import axios from 'axios';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_REGISTRATION_ATTENDEES = '[REGISTRATION] GET_REGISTRATION_ATTENDEES';
export const SET_REGISTRATION_ROWS = '[REGISTRATION] SET_REGISTRATION_ROWS';
export const GET_FRIENDLYIDS = '[REGISTRATION] GET_FRIENDLYIDS';

export function getRegistrationAttendees() {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	// const request = axios.get(`${SERVER_LINK}/api/attendee-sas`, null, header);
	const request = axios.get(`${SERVER_LINK}/api/attendee-sas?page=${0}&size=${50}`, null, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_REGISTRATION_ATTENDEES,
				payload: response.data
			})
		);
}

export function setRegistrationRows(data) {
	return {
		type: SET_REGISTRATION_ROWS,
		payload: data,
	}
}
