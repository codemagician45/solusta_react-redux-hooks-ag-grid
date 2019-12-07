import * as Actions from '../actions';

const initialState = {
    attendees: [],
    badgeIDs: [],
    printCounts: [],
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
            };
        }
        case Actions.GET_BADGE_ATTENDEES:
        {
            return {
                ...state,
                attendees: state.attendees.concat(action.payload),
            };
        }
        case Actions.SET_BADGE_ATTENDEE_SELECT_ROW: {
            return {
                ...state,
                selectedRows: action.payload,
            };
        }
        case Actions.GET_BADGE_IDS: {
            return {
                ...state,
                badgeIDs: action.payload,
            };
        }
        case Actions.GET_PRINT_COUNTS: {
            return {
                ...state,
                printCounts: action.payload,
            };
        }
        case Actions.ADD_BADGE_ACTIVITY: {
            const data = action.payload;
            const printCounts = state.printCounts.map((item, index) => {
                if (item.badgeId === data.badgeId) {
                    return {
                        ...item,
                        printedCount: data.printCount + 1,
                    }
                }
                return item;
            });

            return {
                ...state,
                printCounts: printCounts,
            }
        }
        case Actions.UPDATE_BADGE_ACTIVITY: {
            const data = action.payload;
            const printCounts = state.printCounts.map((item, index) => {
                if (item.badgeId === data.badgeId) {
                    return {
                        ...item,
                        printedCount: data.printCount + 1,
                    }
                }
                return item;
            });

            return {
                ...state,
                printCounts: printCounts,
            }
        }
        default:
        {
            return state;
        }
    }
};

export default badgeReducer;
