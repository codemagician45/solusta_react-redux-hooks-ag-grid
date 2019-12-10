import * as Actions from '../actions';

// TODO: use Objects in redux store not Array
const initialState = {
    attendees: [],
    badgeIDs: [],
    printedCounts: [],
    selectedRows: [],
    page: 0,
    size: 25,
    count: 0,
};

const badgeReducer = function (state = initialState, action) {
    switch (action.type) {
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
                printedCounts: action.payload,
            };
        }
        case Actions.UPDATE_BADGE_ACTIVITY: {
            const data = action.payload;
            const printedCounts = state.printedCounts.map((item, index) => {
                if (item.badgeId === data.badgeId) {
                    return {
                        ...item,
                        printedCount: data.printedCount,
                    }
                }
                return item;
            });

            return {
                ...state,
                printedCounts: printedCounts,
            }
        }
        default:
            {
                return state;
            }
    }
};

export default badgeReducer;
