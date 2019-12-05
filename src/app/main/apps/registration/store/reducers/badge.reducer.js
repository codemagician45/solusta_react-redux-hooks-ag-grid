import * as Actions from '../actions';

const initialState = {
    data      : []
};

const badgeReducer = function (state = initialState, action) {

    switch ( action.type )
    {
        case Actions.SET_BADGE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_BACKGROUND:
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

export default badgeReducer;