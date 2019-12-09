import * as Actions from '../actions';

const initialState = {
    attendees: [],
    badgeIds: [],
    isCollected: [],
};

const collectionReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_COLLECTION_ATTENDEES: {
            return {
                ...state,
                attendees: action.payload,
            };
        }
        case Actions.GET_COLLECTION_BADGE_IDS: {
            return {
                ...state,
                badgeIds: action.payload,
            }
        }
        case Actions.GET_IS_COLLECTED: {
            return {
                ...state,
                isCollected: action.payload,
            }
        }
        case Actions.UPDATE_BADGE_IS_COLLECTED: {
            const data = action.payload;
            const isCollected = state.isCollected.map((item, index) => {
                if (item.badgeId === data.badgeId) {
                    return {
                        ...item,
                        isCollected: data.isCollected,
                    }
                }
                return item;
            });

            return {
                ...state,
                isCollected: isCollected,
            }
        }
        default:
            {
                return state;
            }
    }
};

export default collectionReducer;
