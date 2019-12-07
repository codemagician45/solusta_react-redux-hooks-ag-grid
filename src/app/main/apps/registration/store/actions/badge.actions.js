import axios from 'axios';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_COUNT = '[REGISTRATION] GET_COUNT';
export const GET_BADGE_ATTENDEES = '[REGISTRATION] GET_BADGE_ATTENDEES';
export const SET_BADGE_ATTENDEE_SELECT_ROW = '[REGISTRATION] SET_BADGE_ATTENDEE_SELECT_ROW';
export const GET_BADGE_IDS = '[REGISTRATION] GET_BADGE_IDS';
export const GET_PRINT_COUNTS = '[REGISTRATION] GET_PRINT_COUNTS';
export const ADD_BADGE_ACTIVITY = '[REGISTRATION] ADD_BADGE_ACTIVITY';
export const UPDATE_BADGE_ACTIVITY = '[REGISTRATION] UPDATE_BADGE_ACTIVITY';

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

export function getBadgeAttendees(page=null, size=null) {
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
				type: GET_BADGE_ATTENDEES,
				payload: response.data
			})
		);
}

export function setBadgeAttendeeSelectRow(data) {
	return {
		type: SET_BADGE_ATTENDEE_SELECT_ROW,
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

export function addBadgeActivity(data) {
	// const header = {
	// 	headers: {
	// 		'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
	// 	}
	// };
	// const body = {
	// 	badgeId: data.badgeId,
	// 	printedCount: data.printCount + 1,
	// };
	// const request = axios.post(`${SERVER_LINK}/api/badge-activity-sas`, body, header);
	// return (dispatch) =>
	// 	request.then((response) =>
	// 		dispatch({
	// 			type: ADD_BADGE_ACTIVITY,
	// 			payload: response.data
	// 		})
	// );

	

	// TODO: when you want to integrate 
	return {
		type: ADD_BADGE_ACTIVITY,
		payload: data,
	}
}

export function updateBadgeActivity(data) {
	// const header = {
	// 	headers: {
	// 		'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
	// 	}
	// };
	// const body = {
	// 	badgeId: data.badgeId,
	// 	printedCount: data.printCount + 1,
	// };
	// const request = axios.put(`${SERVER_LINK}/api/badge-activity-sas`, body, header);

	// return (dispatch) =>
	// request.then((response) =>
	// 	dispatch({
	// 		type: UPDATE_BADGE_ACTIVITY,
	// 		payload: response.data
	// 	})
	// );



	// TODO: when you want to integrate 
	return {
		type: UPDATE_BADGE_ACTIVITY,
		payload: data,
	}
}
