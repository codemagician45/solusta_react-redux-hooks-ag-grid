import * as Actions from '../actions';

const initialState = {
    data: null,
};

const imageReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_IMAGE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default imageReducer;