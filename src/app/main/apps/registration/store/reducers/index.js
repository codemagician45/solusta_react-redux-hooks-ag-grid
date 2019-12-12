import { combineReducers } from 'redux';
import registration from './registration.reducer';
import badge from './badge.reducer';
import collection from './collection.reducer';
import securityApproval from './security-approval.reducer';
import category from './category.reducer';

const reducer = combineReducers({
    registration,
    badge,
    collection,
    securityApproval,
    category,
});

export default reducer;