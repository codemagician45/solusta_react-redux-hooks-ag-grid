import * as Actions from '../actions';

const initialState = {
    data: [],
    rows: [],
    backgrounds: [],
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
        default:
        {
            return state;
        }
    }
};

export default productsReducer;
