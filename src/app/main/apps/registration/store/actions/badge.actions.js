import axios from 'axios';

export const GET_BADGE = '[BADGE APP] GET BADGE';

export function getBackground()
{
    // const request = axios.get('/api/e-commerce-app/products');
    let token = localStorage.getItem('jwt_access_token');
    let config = {
        headers: {'Authorization': "bearer " + token}
    };
    
    let bodyParameters = {
       key: "value"
    }
    const request = axios.get('https://stage01.solusta.me/api/badge-design-sas/1501',bodyParameters,config);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BADGE,
                payload: response.data
            })
        );
}