import * as Actions from '../actions';

const initialState = {
    data: [],
    rows: [],
    backgrounds: [],
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
                data: action.payload
            };
        }
        case Actions.SET_ROW: {
            return {
                ...state,
                rows: action.payload,
            }
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
            }
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