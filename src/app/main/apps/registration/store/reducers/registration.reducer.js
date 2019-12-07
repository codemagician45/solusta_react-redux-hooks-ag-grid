import * as Actions from '../actions';

const initialState = {
    attendees: [],
    rows: [],
    backgrounds: [],
    page: 0,
    size: 50,
    friendlyID: null,
    image:null,
    allData:[],
    count: 0
};

const productsReducer = function (state = initialState, action) {

    switch ( action.type )
    {
        case Actions.GET_PRODUCTS:
        {
            return {
                ...state,
                attendees: state.attendees.concat(action.payload),
            };
        }
        case Actions.SET_ROW: {
            return {
                ...state,
                rows: action.payload,
            };
        }
        case Actions.GET_BACKGROUND: {
            return {
                ...state,
                backgrounds: action.payload,
            };
        }
        case Actions.SET_IMAGE: {
            return {
                ...state,
                image:action.payload
            };
        }
        case Actions.GET_F_ID:
        {
            return {
                ...state,
                friendlyID: action.payload
            };
        }
        case Actions.GET_ALL_PRODUCTS:
        {
            return {
                ...state,
                allData: action.payload,
            };
        }
        case Actions.GET_COUNT:
        {
            return {
                ...state,
                count: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default productsReducer;
