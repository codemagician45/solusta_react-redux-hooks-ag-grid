import axios from 'axios';

export const GET_PRODUCTS = '[REGISTER APP] GET PRODUCTS';

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
    const request = axios.get('https://stage02.solusta.me/api/attendee-sas', body, header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        );
}
