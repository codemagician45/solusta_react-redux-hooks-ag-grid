import { combineReducers } from 'redux';
import registration from './registration.reducer';
import badge from './badge.reducer';
import collection from './collection.reducer';
import category from './category.reducer';

const reducer = combineReducers({
    registration,
    badge,
    collection,
    category,
});

export default reducer;