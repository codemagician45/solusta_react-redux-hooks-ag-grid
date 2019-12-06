import axios from 'axios';

// import env server link
import { RegistrationEnvConfig, env } from '../../RegistrationConfig';
const SERVER_LINK = (env === 'server') ? RegistrationEnvConfig.prod.ServerLink : RegistrationEnvConfig.env.ServerLink;

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
    const header = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
        }
    };
    const body = {
        key: 'value',
    };
    const request = axios.get(`${SERVER_LINK}/api/badge-design-sas/1501`,body,header);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BACKGROUND,
                payload: response.data
            })
        );
}
