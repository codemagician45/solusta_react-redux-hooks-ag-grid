// import Utils
// import * as Utils from '../../../../../utils';

// import env server link
// const environment = require('../../RegistrationEnv');
// const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_COLLECTION_ATTENDEES = '[REGISTRATION] GET_COLLECTION_ATTENDEES';
export const GET_COLLECTION_BADGES = '[REGISTRATION] GET_COLLECTION_BADGES';
export const GET_COLLECTION_BADGE_ACTIVITIES = '[REGISTRATION] GET_COLLECTION_BADGE_ACTIVITIES';
export const SET_COLLECTION_UPDATE_BADGES = '[REGISTRATION] SET_COLLECTION_UPDATE_BADGES';
export const UPDATE_COLLECTION_BADGE_ACTIVITY = '[REGISTRATION] UPDATE_COLLECTION_BADGE_ACTIVITY';
export const UPDATE_COLLECTION_BADGE_ACTIVITIES = '[REGISTRATION] UPDATE_COLLECTION_BADGE_ACTIVITIES';

export function getCollectionAttendees(data) {
	return {
		type: GET_COLLECTION_ATTENDEES,
		payload: data,
	};
}

export function getCollectionBadges(data) {
	return {
		type: GET_COLLECTION_BADGES,
		payload: data,
	}
}

export function getCollectionBadgeActivities(data) {
	return {
		type: GET_COLLECTION_BADGE_ACTIVITIES,
		payload: data,
	}
}

export function setCollectionUpdateBadges(data) {
	return {
		type: SET_COLLECTION_UPDATE_BADGES,
		payload: data,
	};
}

export function updateCollectionBadgeActivity(data) {
	return {
		type: UPDATE_COLLECTION_BADGE_ACTIVITY,
		payload: data,
	};
}

export function updateCollectionBadgeActivities(data) {
	return {
		type: UPDATE_COLLECTION_BADGE_ACTIVITIES,
		payload: data,
	};
}
