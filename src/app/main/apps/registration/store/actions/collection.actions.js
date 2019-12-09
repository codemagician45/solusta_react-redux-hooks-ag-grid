import axios from 'axios';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_COLLECTION_ATTENDEES = '[REGISTRATION] GET_COLLECTION_ATTENDEES';
export const GET_COLLECTION_BADGE_IDS = '[REGISTRATION] GET_COLLECTION_BADGE_IDS';
export const GET_IS_COLLECTED = '[REGISTRATION] GET_IS_COLLECTED';
export const UPDATE_BADGE_IS_COLLECTED = '[REGISTRATION] UPDATE_BADGE_IS_COLLECTED';

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

export function updateBadgeIsCollected(data) {
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
                type: UPDATE_BADGE_IS_COLLECTED,
                payload: {
                    ...response.data,
                    badgeId: data.badgeId,
                },
            })
        );
}
