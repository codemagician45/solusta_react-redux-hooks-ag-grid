import * as Actions from "../actions";

// TODO: use Objects in redux store not Array
const initialState = {
  categories: [],
  attendee: {},
  success: false,
  loading: false,
  fail: false
};

const attendeeReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ATTENDEE_CATEGORIES: {
      return {
        ...state,
        categories: action.payload
      };
    }
    case Actions.SAVE_ATTENDEE: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.SAVE_ATTENDEE_SUCCESS: {
      return {
        ...state,
        attendee: action.payload,
        loading: false,
        success: true
      };
    }
    case Actions.SAVE_ATTENDEE_FAIL: {
      return {
        ...state,
        loading: false,
        fail: true
      };
    }
    case Actions.SET_DEFAULT: {
      return {
        ...state,
        loading: false,
        success: false,
        fail: false
      };
    }
    default: {
      return state;
    }
  }
};

export default attendeeReducer;
