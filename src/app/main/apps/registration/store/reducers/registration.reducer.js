import * as Actions from '../actions';

const initialState = {
    attendees: [],
    rows: [],
};

const productsReducer = function (state = initialState, action) {

    switch ( action.type )
    {
        case Actions.GET_REGISTRATION_ATTENDEES:
        {
            return {
                ...state,
                attendees: action.payload,
            };
        }
        case Actions.SET_REGISTRATION_ROWS:
        {
            return {
                ...state,
                rows: action.payload,
            }   
        }
        default:
        {
            return state;
        }
    }
};

export default productsReducer;
