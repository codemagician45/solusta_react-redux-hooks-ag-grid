import axios from 'axios';

export const GET_PRODUCTS = '[REGISTRATION APP] GET PRODUCTS';
export const SET_ROW = '[REGISTRATION] SET_ROW';
export const GET_BACKGROUND = '[REGISTRATION] GET_BACKGROUND';
export const SET_IMAGE = '[REGISTRATION] SET_IMAGE';
export const GET_F_ID = '[REGISTRATION] GET_F_ID'

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
    const request = axios.get('http://dee-mac.local:8088/api/attendee-sas-no-page', body, header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
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
    const request = axios.get('http://dee-mac.local:8088/api/badge-design-sas/1501', body, header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BACKGROUND,
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
        "id": data.id,
        // "firstName":"Test",
        "firstName":data.firstName,
        "lastName":data.lastName,
        "gender":data.gender,
        "email":data.email,
        "phone":data.phone,
        "companyName":"Test"
        // "mainPhoto":data.mainPhoto
    };
    const request = axios.put('http://dee-mac.local:8088//api/attendee-sas',body, header);
    return (dispatch) =>
        request.then((response)=>
            dispatch({
                type:SET_IMAGE,
                payload:response.data
            })
        )
    // return {
    //     type   : SET_IMAGE,
    //     payload: data
    // };
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
    // const id = 1157
    const request = axios.get('http://dee-mac.local:8088//api/badge-sas?attendeeSAId.equals='+ id, body, header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_F_ID,
                payload: response.data[0].badgeFriendlyID
            })
        );
}
