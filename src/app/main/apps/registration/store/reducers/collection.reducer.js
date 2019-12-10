import * as Actions from '../actions';

// TODO: use Objects in redux store not Array
const initialState = {
	attendees: [],
	badgeIds: [],
	isCollected: [],
	updatingRows: [],
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
		case Actions.SET_COLLECTION_UPDATING_ROWS: {
			return {
				...state,
				updatingRows: action.payload,
			}
		}
		case Actions.UPDATE_BADGE_IS_COLLECTED: {
			const data = action.payload;
			const isCollected = state.isCollected.map((item, index) => {
				return item.badgeId === data.badgeId ? data : item;
			});

			return {
				...state,
				isCollected: isCollected,
			}
		}
		case Actions.UPDATE_BADGE_ACTIVITIES: {
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
