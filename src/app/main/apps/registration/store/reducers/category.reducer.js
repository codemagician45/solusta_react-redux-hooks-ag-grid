import * as Actions from '../actions';

const initialState = {
    categories: [],
    attendee: {},
    savingSuccess: false,
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
                attendee: action.payload,
                savingSuccess: true,
            }
        }
        default:
        {
            return state;
        }
    }
};

export default categoryReducer;
