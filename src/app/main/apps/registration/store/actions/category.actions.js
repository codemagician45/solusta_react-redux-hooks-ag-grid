import axios from 'axios';

export const GET_CATEGORY = '[REGISTRATION] GET_CATEGORY';
export const SAVE_ATTENDEE = '[REGISTRATION] SAVE_ATTENDEE';

export const getCategory = () => {
    const option = {
        body: null,
        header: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
        }
    };
    const request = axios.get('https://stage01.solusta.me/api/attendee-category-sas', {option});

    return (dispatch) =>
        request.then((response) =>{
            return dispatch({
                type   : GET_CATEGORY,
                payload: response.data
            })
        });
}

export const saveAttendee = (data) => {
    const option = {
        body: data,
        header: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
        }
    };
    // console.log('here inside the New Category: ', option);
    const request = axios.post('https://stage01.solusta.me/api/attendee-sas', {option});

    return (dispatch) =>
        request.then((response) =>{
            console.log('here submit response: ', response);
            return dispatch({
                type   : GET_CATEGORY,
                payload: response.data
            })
        });
}
