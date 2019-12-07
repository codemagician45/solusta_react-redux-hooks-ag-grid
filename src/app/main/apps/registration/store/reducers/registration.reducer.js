import * as Actions from '../actions';

const initialState = {
    data: [],
    rows: [],
    backgrounds: [],
    page: 0,
    size: 50,
    count: 1,
    friendlyID: null,
    image:null
};

const productsReducer = function (state = initialState, action) {

    switch ( action.type )
    {
        case Actions.GET_PRODUCTS:
        {
            return {
                ...state,
                data: state.data.concat(action.payload),
                // page: state.page + 1,
                // count: action.payload.length,
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
            }
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
        default:
        {
            return state;
        }
    }
};

export default productsReducer;
