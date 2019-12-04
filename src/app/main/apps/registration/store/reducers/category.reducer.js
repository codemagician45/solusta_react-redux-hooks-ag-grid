import * as Actions from '../actions';

const initialState = {
    categories: [],
    attendee: null,
};

const categoryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CATEGORY:
        {
            return {
                ...state,
                categories: action.payload
            };
        }
        case Actions.SAVE_ATTENDEE: {
            return {
                ...state,
                attendee: action.payload
            }
        }
        default:
        {
            return state;
        }
    }
};

export default categoryReducer;
