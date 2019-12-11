import * as Actions from '../actions';

// TODO: use Objects in redux store not Array
const initialState = {
  attendees: {},
  secApprovals: {},
  selectedRows: {},
};

const arrayToObject = (arr) => {
  const returnObj = {};
  arr.map((item, index) => {
    returnObj[item.id] = item;
  });
  return returnObj;
}

const securityApprovalReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SEC_ATTENDEES: {
      return {
        ...state,
        attendees: arrayToObject(action.payload),
      };
    }
    case Actions.GET_SEC_APPROVALS: {
      return {
        ...state,
        secApprovals: arrayToObject(action.payload),
      }
    }
    case Actions.SET_SEC_SELECTED_ROWS: {
      return {
        ...state,
        selectedRows: arrayToObject(action.payload),
      };
    }
    case Actions.CHANGE_ATTENDEE_IS_SECURITY_CHANGED: {
      const attendees = { ...state.attendees };
      const data = action.payload;
      attendees[data.attendeeId].isSecurityChanged = data.isSecurityChanged;

      return {
        ...state,
        attendees: attendees,
      };
    }
    default: {
      return state;
    }
  }
};

export default securityApprovalReducer;
