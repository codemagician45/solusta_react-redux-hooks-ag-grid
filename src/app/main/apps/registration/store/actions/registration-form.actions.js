import axios from 'axios';

export const GET_PRODUCTS = '[REGISTER APP] GET PRODUCTS';
export const SET_ROW = '[REGISTRATION] SET_ROW';
export const GET_BACKGROUND = '[REGISTRATION] GET_BACKGROUND';

export function getProducts()
{
    const header = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`
        }
    };
    const body = {
       key: "value"
    };
    const request = axios.get('http://dee-mac.local:8088//api/attendee-sas', body, header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        );
}

export function setRow(data) {
    console.log('here inside the action: ', [...data]);
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
    const request = axios.get('http://dee-mac.local:8088//api/badge-design-sas/1501', body, header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BACKGROUND,
                payload: response.data
            })
        );
}
