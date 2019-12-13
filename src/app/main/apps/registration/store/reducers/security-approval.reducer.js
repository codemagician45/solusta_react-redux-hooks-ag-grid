// import Action
import * as Actions from '../actions';

// import Utils
import * as Utils from '../../../../../utils';

// TODO: use Objects in redux store not Array
const initialState = {
  attendees: {},
  secApprovals: {},
  selectedRows: {},
};

const arrayToObject = (arr) => {
  const returnObj = {};
  arr.map((item) => {
    returnObj[item.attendeeId] = item;
  });
  return returnObj;
}

const securityApprovalReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SEC_ATTENDEES: {
      return {
        ...state,
        attendees: {
          ...state.attendees,
          ...Utils.arrayToObject(action.payload),
        }
      };
    }
    case Actions.GET_SEC_APPROVALS: {
      return {
        ...state,
        secApprovals: Utils.arrayToObject(action.payload),
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
      attendees[data.attendeeId].id = data.attendeeId;
      attendees[data.attendeeId].attendeeSecApprovalSAId = data.secApproval;
      attendees[data.attendeeId].attendeeSecApprovalSAApprovalText = data.secApprovalText;

      return {
        ...state,
        attendees: attendees,
      };
    }
    case Actions.UPDATE_SEC_ATTENDEE: {
      const attendees = { ...state.attendees };
      attendees[action.payload.id] = action.payload;
      attendees[action.payload.id].isSecurityChanged = false;

      return {
        ...state,
        attendees: attendees,
      };
    }
    case Actions.UPDATE_SEC_MASS_ATTENDEE: {
      const attendees = { ...state.attendees };
      const data = action.payload;
      data.map(item => {
        attendees[item.id] = item;
      });

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
