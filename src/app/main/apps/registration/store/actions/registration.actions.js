import axios from 'axios';

// import env server link
const environment = require('../../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

export const GET_PRODUCTS = '[REGISTRATION APP] GET PRODUCTS';
export const SET_ROW = '[REGISTRATION] SET_ROW';
export const GET_BACKGROUND = '[REGISTRATION] GET_BACKGROUND';
export const SET_IMAGE = '[REGISTRATION] SET_IMAGE';
export const GET_F_ID = '[REGISTRATION] GET_F_ID'

export function getProducts(page=null, size=null) {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`
		}
	};
	// const body = {
	// 	key: "value"
	// };
	// const request = axios.get(`${SERVER_LINK}/api/attendee-sas?page=${page}&size=${size}`, null, header);
	const request = axios.get(`${SERVER_LINK}/api/attendee-sas`, null, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_PRODUCTS,
				payload: response.data
			})
		);
}

export function setRow(data) {
	return {
		type: SET_ROW,
		payload: data,
	}
}

export function getBackgrounds() {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const body = {
		key: 'value',
	};
	const request = axios.get(`${SERVER_LINK}/api/badge-design-sas/1501`, body, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_BACKGROUND,
				payload: response.data
			})
		);
}


export function setImage(data) {
	console.log("image data in action", data)
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const body = {
		key: 'value',
		...data,
	};
	const request = axios.put(`${SERVER_LINK}/api/attendee-sas`, body, header);
	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: SET_IMAGE,
				payload: response.data
			})
		)

}

export function getFriendlyID(id) {
	const header = {
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
		}
	};
	const body = {
		key: 'value',
	};
	const request = axios.get(`${SERVER_LINK}/api/badge-sas?attendeeSAId.equals=` + id, body, header);

	return (dispatch) =>
		request.then((response) =>
			dispatch({
				type: GET_F_ID,
				payload: response.data[0].badgeFriendlyID
			})
		);
}
