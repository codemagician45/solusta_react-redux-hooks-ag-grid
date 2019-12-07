import {combineReducers} from 'redux';
import registration from './registration.reducer';
import badge from './badge.reducer';
import category from './category.reducer';

const reducer = combineReducers({
    registration,
    badge,
    category,
});

export default reducer;