export const SET_IMAGE = '[IMAGE] SET_IMAGE';

export function setImage(data) {
    return {
        type   : SET_IMAGE,
        payload: data
    };
}
