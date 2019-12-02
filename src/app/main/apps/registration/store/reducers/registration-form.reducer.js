import * as Actions from '../actions';

const initialState = {
    data: []
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
        default:
        {
            return state;
        }
    }
};

export default productsReducer;