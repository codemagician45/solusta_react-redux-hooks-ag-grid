import axios from 'axios';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_COLLECTION_ATTENDEES = '[REGISTRATION] GET_COLLECTION_ATTENDEES';
export const GET_COLLECTION_BADGE_IDS = '[REGISTRATION] GET_COLLECTION_BADGE_IDS';
export const GET_IS_COLLECTED = '[REGISTRATION] GET_IS_COLLECTED';
export const SET_COLLECTION_UPDATING_ROWS = '[REGISTRATION] SET_COLLECTION_UPDATING_ROWS';
export const UPDATE_BADGE_IS_COLLECTED = '[REGISTRATION] UPDATE_BADGE_IS_COLLECTED';
export const UPDATE_BADGE_ACTIVITIES = '[REGISTRATION] UPDATE_BADGE_ACTIVITIES';

export function getCollectionAttendees() {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	// const request = axios.get(`${SERVER_LINK}/api/attendee-sas-no-page`, null, header);
	const request = axios.get(`${SERVER_LINK}/api/attendee-sas?page=${0}&size=${20}`, null, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_COLLECTION_ATTENDEES,
				payload: response.data
			})
		);
}

export function getCollectionBadgeIds(data) {
	return {
		type: GET_COLLECTION_BADGE_IDS,
		payload: data,
	}
}

export function getIsCollected(data) {
	return {
		type: GET_IS_COLLECTED,
		payload: data,
	}
}

export function setCollectionUpdatingRows(data) {
	return {
		type: SET_COLLECTION_UPDATING_ROWS,
		payload: data,
	};
}

export function updateBadgeIsCollected(data) {
	return {
		type: UPDATE_BADGE_IS_COLLECTED,
		payload: data,
	};
}

export function updateBadgeActivities(data) {
	return {
		type: UPDATE_BADGE_ACTIVITIES,
		payload: data,
	};
}
