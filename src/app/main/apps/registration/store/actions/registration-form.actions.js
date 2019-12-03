import axios from 'axios';

export const GET_PRODUCTS = '[REGISTER APP] GET PRODUCTS';

export function getProducts()
{
    // const request = axios.get('/api/e-commerce-app/products');
    let token = localStorage.getItem('jwt_access_token');
    let config = {
        headers: {'Authorization': "bearer " + token}
    };
    let bodyParameters = {
       key: "value"
    };
    
    const request = axios.get('https://stage02.solusta.me/api/attendee-sas', bodyParameters, config);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        );
}
