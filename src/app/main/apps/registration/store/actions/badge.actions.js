import axios from 'axios';

export const GET_BADGE = '[BADGE APP] GET BADGE';

export function getBackground()
{
    const header = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
        }
    };
    const body = {
        key: 'value',
    };
    const request = axios.get('https://stage01.solusta.me/api/badge-design-sas/1501',body,header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BADGE,
                payload: response.data
            })
        );
}
