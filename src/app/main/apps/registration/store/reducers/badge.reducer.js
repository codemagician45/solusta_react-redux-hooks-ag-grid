import * as Actions from '../actions';

const initialState = {
    attendees: [],
    selectedRows: [],
    page: 0,
    size: 25,
    count: 0,
};

const badgeReducer = function (state = initialState, action) {
    switch ( action.type )
    {   
        case Actions.GET_COUNT: {
            return {
                ...state,
                count: action.payload,
            }
        }
        case Actions.GET_ATTENDEES:
        {
            return {
                ...state,
                attendees: state.attendees.concat(action.payload),
            };
        }
        case Actions.SET_ATTENDEE_SELECT_ROW: {
            return {
                ...state,
                selectedRows: action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default badgeReducer;
