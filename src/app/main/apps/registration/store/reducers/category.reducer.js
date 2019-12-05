import * as Actions from '../actions';

const initialState = {
    categories: [],
    attendee: {},
    success: false,
    loading: false,
    fail: false,
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
                loading: true,
            }
        }
        case Actions.SAVE_ATTENDEE_SUCCESS: {
            return {
                ...state,
                attendee: action.payload,
                loading: false,
                success: true,
            }
        }
        case Actions.SAVE_ATTENDEE_FAIL: {
            return {
                ...state,
                loading: false,
                fail: true,
            }
        }
        default:
        {
            return state;
        }
    }
};

export default categoryReducer;
