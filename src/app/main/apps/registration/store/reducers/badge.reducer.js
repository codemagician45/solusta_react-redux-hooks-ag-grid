import * as Actions from '../actions';

// TODO: use Objects in redux store not Array
const initialState = {
	attendees: [],
	selectedRows: [],
	totalAttendeesCount: 200,
	badges: [],
	badgeActivities: [],
};

const badgeReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_BADGE_ATTENDEE_COUNT: {
			return {
				...state,
				totalAttendeesCount: action.payload,
			};
		}
		case Actions.GET_BADGE_ATTENDEES:
			{
				return {
					...state,
					attendees: state.attendees.concat(action.payload),
				};
			}
		case Actions.SET_BADGE_ATTENDEE_SELECTED_ROWS: {
			return {
				...state,
				selectedRows: action.payload,
			};
		}
		case Actions.GET_BADGE_IDS: {
			return {
				...state,
				badges: action.payload,
			};
		}
		case Actions.GET_PRINT_COUNTS: {
			return {
				...state,
				badgeActivities: action.payload,
			};
		}
		case Actions.UPDATE_BADGE_ACTIVITY: {
			return {
				...state,
			};
		}
		default:
			{
				return state;
			}
	}
};

export default badgeReducer;
