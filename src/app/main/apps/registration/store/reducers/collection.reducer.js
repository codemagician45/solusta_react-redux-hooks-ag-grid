// import Action types
import * as Actions from '../actions';

// TODO: use Objects in redux store not Array
const initialState = {
	attendees: [],
	attendeesCount: 0,
	badges: [],
	badgeActivities: [],
	selectedBadges: [],
};

const collectionReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_COLLECTION_ATTENDEES: {
			return {
				...state,
				attendees: state.attendees.concat(action.payload),
			};
		}
		case Actions.GET_COLLECTION_ATTENDEES_COUNT: {
			return {
				...state,
				attendeesCount: action.payload,
			};
		}
		case Actions.GET_COLLECTION_BADGES: {
			return {
				...state,
				badges: action.payload,
			}
		}
		case Actions.GET_COLLECTION_BADGE_ACTIVITIES: {
			return {
				...state,
				badgeActivities: action.payload,
			}
		}
		case Actions.SET_COLLECTION_UPDATE_BADGES: {
			return {
				...state,
				selectedBadges: action.payload,
			}
		}
		case Actions.UPDATE_COLLECTION_BADGE_ACTIVITY: {
			const data = action.payload;
			const isCollected = state.isCollected.map((item, index) => {
				return item.badgeId === data.badgeId ? data : item;
			});

			return {
				...state,
				isCollected: isCollected,
			}
		}
		case Actions.UPDATE_COLLECTION_BADGE_ACTIVITIES: {
			const data = action.payload;
			const isCollected = state.isCollected.map((item, index) => {
				const check = data.filter(el => el.badgeId === item.badgeId);
				return (check.length > 0) ? check[0] : item;
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
