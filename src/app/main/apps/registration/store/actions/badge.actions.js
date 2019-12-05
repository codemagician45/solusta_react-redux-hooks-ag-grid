import axios from 'axios';

export const SET_BADGE = '[BADGE APP] SET BADGE';
export const GET_BACKGROUND = '[BADGE APP] GET_BACKGROUND';

export function setSelectedRows(data)
{
    return {
        type   : SET_BADGE,
        payload: data
    };
}
export function getBackgrounds()
{
    console.log('ddd')
    // const header = {
    //     headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`
    //     }
    // };
    // const body = {
    //    key: "value"
    // };
    // const request = axios.get('https://stage02.solusta.me/badge-design-sa', body, header);

    // return (dispatch) =>
    //     request.then((response) =>
    //         dispatch({
    //             type   : GET_BACKGROUND,
    //             payload: response.data
    //         })
    //     );
}