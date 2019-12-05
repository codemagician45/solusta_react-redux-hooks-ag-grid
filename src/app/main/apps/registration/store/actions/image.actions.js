export const SET_IMAGE = '[IMAGE] SET_IMAGE';

export function setImage(data) {
    return {
        type   : SET_IMAGE,
        payload: data
    };
    // const header = {
    //     headers: {
    //         'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`
    //     }
    // };
    // const body = {
    //    key: "value"
    // };
    // const request = axios.put('https://stage02.solusta.me/api/attendee-sas', body, header);

    // return (dispatch) =>
    //     request.then((response) =>
    //         dispatch({
    //             type   : GET_PRODUCTS,
    //             payload: response.data
    //         })
    //     );
}
