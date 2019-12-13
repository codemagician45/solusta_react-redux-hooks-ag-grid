import * as Actions from '../actions';

const initialState = {
    attendees: [],
    attendeesSearch: [],
    rows: [],
    badgeIDs: [],
    printedCounts: [],
    count:null,
    searchText:''
};

const productsReducer = function (state = initialState, action) {

    switch ( action.type )
    {
        // case Actions.GET_REGISTRATION_ATTENDEES:
        // {
        //     return {
        //         ...state,
        //         attendees: action.payload,
        //     };
        // }
        case Actions.UPDATE_REGISTRATION_ATTENDEES:
        {
                let indexId = action.payload[0] && action.payload[0].id;
                const index = state.attendees.filter(attendee => attendee.id === indexId);
                if(index.length > 0){
                    // console.log("include")
                    return {
                        ...state,
                        attendees: state.attendees,
                    };
                }
                else {
                    // console.log("not include")
                    return {
                        ...state,
                        attendees: state.attendees.concat(action.payload),
                    };
                
                }
        }
        case Actions.UPDATE_REGISTRATION_ATTENDEES_SEARCH:
        {
            console.log("action.payload in search reducer",action.payload)
            let indexId = action.payload[0] && action.payload[0].id;
                const index = state.attendeesSearch.filter(attendee => attendee.id === indexId);
                if(index.length > 0){
                    // console.log("include")
                    return {
                        ...state,
                        attendeesSearch: state.attendeesSearch,
                    };
                }
                else {
                    // console.log("not include")
                    return {
                        ...state,
                        attendeesSearch: state.attendeesSearch.concat(action.payload),
                    };
                
                }
        }
        case Actions.SET_REGISTRATION_ROWS:
        {
            return {
                ...state,
                rows: action.payload,
            }   
        }
        case Actions.GET_REG_BADGE_IDS: {
            return {
                ...state,
                badgeIDs: action.payload,
            };
        }
        case Actions.GET_REG_PRINT_COUNTS: {
            return {
                ...state,
                printedCounts: action.payload,
            };
        }
        case Actions.UPDATE_REG_BADGE_ACTIVITY_PRINT: {
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
        case Actions.UPDATE_REG_BADGE_ACTIVITY_COLLECTION: {
            const data = action.payload;
            const printedCounts = state.printedCounts.map((item, index) => {
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
                printedCounts: printedCounts,
            }
        }
        case Actions.GET_REG_COUNT: {
            return {
                ...state,
                count: action.payload,
            };
        }
        case Actions.SET_REG_SEARCH_TEXT:{
            return {
                ...state,
                searchText:action.searchText,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default productsReducer;
