import axios from 'axios';

// import utils
import * as Utils from '../../../../../utils';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_BADGE_ATTENDEE_COUNT = '[REGISTRATION] GET_BADGE_ATTENDEE_COUNT';
export const GET_BADGE_ATTENDEES = '[REGISTRATION] GET_BADGE_ATTENDEES';
export const SET_BADGE_ATTENDEE_SELECTED_ROWS = '[REGISTRATION] SET_BADGE_ATTENDEE_SELECTED_ROWS';
export const GET_BADGE_IDS = '[REGISTRATION] GET_BADGE_IDS';
export const GET_PRINT_COUNTS = '[REGISTRATION] GET_PRINT_COUNTS';
export const UPDATE_BADGE_ACTIVITY = '[REGISTRATION] UPDATE_BADGE_ACTIVITY';

export function getBadgeTotalAttendeeCount() {
	const request = Utils.xapi().get(`${SERVER_LINK}/api/attendee-sas/count`);
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_BADGE_ATTENDEE_COUNT,
				payload: response.data
			})
		);
}

export function getBadgeAttendees(data) {
	return {
		type: GET_BADGE_ATTENDEES,
		payload: data,
	};
}

export function setBadgeAttendeeSelectedRows(data) {
	return {
		type: SET_BADGE_ATTENDEE_SELECTED_ROWS,
		payload: data,
	};
}

export function getBadgeIDs(data) {
	console.log("badgId", data)
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

export function updateBadgeActivity(data) {
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
				type: UPDATE_BADGE_ACTIVITY,
				payload: {
					...response.data,
					badgeId: data.badgeId,
				},
			})
		);
}
