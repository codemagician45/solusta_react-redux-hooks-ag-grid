import axios from 'axios';

export const GET_CATEGORY = '[REGISTRATION] GET_CATEGORY';
export const SAVE_ATTENDEE = '[REGISTRATION] SAVE_ATTENDEE';

export const getCategory = () => {
    const body = {};
    const header = {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
        }
    };
    const request = axios.get('https://stage02.solusta.me/api/attendee-category-sas', body, header);

    return (dispatch) =>
        request.then((response) =>{
            return dispatch({
                type   : GET_CATEGORY,
                payload: response.data
            })
        });
}

export const saveAttendee = (data) => {
    const body = data;
    const header = {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
        }
    };
    const request = axios.post('https://stage02.solusta.me/api/attendee-sas', body, header);

    return (dispatch) =>
        request.then((response) =>{
            return dispatch({
                type   : SAVE_ATTENDEE,
                payload: response.data
            })
        });
}
