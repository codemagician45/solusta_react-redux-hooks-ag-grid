import axios from 'axios';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_REGISTRATION_ATTENDEES = '[REGISTRATION] GET_REGISTRATION_ATTENDEES';
export const SET_REGISTRATION_ROWS = '[REGISTRATION] SET_REGISTRATION_ROWS';
export const GET_FRIENDLYIDS = '[REGISTRATION] GET_FRIENDLYIDS';
export const GET_REG_BADGE_IDS = '[REGISTRATION] GET_REG_BADGE_IDS';
export const GET_REG_PRINT_COUNTS = '[REGISTRATION] GET_REG_PRINT_COUNTS';
export const UPDATE_REG_BADGE_ACTIVITY_PRINT = '[REGISTRATION] UPDATE_REG_BADGE_ACTIVITY_PRINT';
export const UPDATE_REG_BADGE_ACTIVITY_COLLECTION = '[REGISTRATION] UPDATE_REG_BADGE_ACTIVITY_COLLECTION';
export const GET_REG_COUNT = '[REGISTRATION] GET_REG_COUNT';

export function getRegistrationAttendees() {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	// const request = axios.get(`${SERVER_LINK}/api/attendee-sas-no-page`, null, header);
	const request = axios.get(`${SERVER_LINK}/api/attendee-sas`, null, header);
	// const request = axios.get(`${SERVER_LINK}/api/attendee-sas?page=${0}&size=${100}`, null, header);
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

export function getRegBadgeIDs(data) {
	return {
		type: GET_REG_BADGE_IDS,
		payload: data,
	};
}

export function getRegPrintCounts(data) {
	return {
		type: GET_REG_PRINT_COUNTS,
		payload: data,
	};
}

export function updateRegBadgeActivityPrint(data) {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const body = {
		id: data.badgeActivityId,
		printedCount: data.printCount + 1,
	};
	const request = axios.put(`${SERVER_LINK}/api/badge-activity-sas`, body, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: UPDATE_REG_BADGE_ACTIVITY_PRINT,
				payload: {
					...response.data,
					badgeId: data.badgeId,
				},
			})
		);
}

export function updateRegBadgeActivityCollection(data) {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const body = {
		id: data.badgeActivityId,
		isCollected: true,
	};
	const request = axios.put(`${SERVER_LINK}/api/badge-activity-sas`, body, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: UPDATE_REG_BADGE_ACTIVITY_COLLECTION,
				payload: {
					...response.data,
					badgeId: data.badgeId,
				},
			})
		);
}
export function getAttendeeCount() {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const request = axios.get(`${SERVER_LINK}/api/attendee-sas/count`, null, header);
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_REG_COUNT,
				payload: response.data
			})
		);
}
