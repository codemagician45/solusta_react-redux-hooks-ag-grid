import axios from 'axios';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_COUNT = '[REGISTRATION] GET_COUNT';
export const GET_ATTENDEES = '[REGISTRATION] GET_ATTENDEES';
export const SET_ATTENDEE_SELECT_ROW = '[REGISTRATION] SET_ATTENDEE_SELECT_ROW';
export const GET_BADGE_IDS = '[REGISTRATION] GET_BADGE_IDS';
export const GET_PRINT_COUNTS = '[REGISTRATION] GET_PRINT_COUNTS';

export function getCount() {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const request = axios.get(`${SERVER_LINK}/api/attendee-sas/count`, null, header);
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_COUNT,
				payload: response.data
			})
		);
}

export function getAttendees(page=null, size=null) {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const request = axios.get(`${SERVER_LINK}/api/attendee-sas`, null, header);
	// const request = axios.get(`${SERVER_LINK}/api/attendee-sas?page=${page}&size=${size}`, null, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_ATTENDEES,
				payload: response.data
			})
		);
}

export function setAttendeeSelectRow(data) {
	return {
		type: SET_ATTENDEE_SELECT_ROW,
		payload: data,
	};
}

export function getBadgeIDs(data) {
	return {
		type: GET_BADGE_IDS,
		payload: data,
	};
}

export function getPrintCounts(data) {
	return {
		type: GET_PRINT_COUNTS,
		payload: data,
	};
}
