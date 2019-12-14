import { combineReducers } from 'redux';
import registration from './registration.reducer';
import badge from './badge.reducer';
import collection from './collection.reducer';
import securityApproval from './security-approval.reducer';
import attendee from './attendee.reducer';

const reducer = combineReducers({
    registration,
    badge,
    collection,
    securityApproval,
    attendee,
});

export default reducer;