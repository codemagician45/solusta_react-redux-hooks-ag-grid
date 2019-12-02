export const SET_IMAGE = '[IMAGE] SET_IMAGE';

export function setImage() {
    return (data) => ({
        type   : SET_IMAGE,
        payload: data
    });
}
