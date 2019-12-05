import {combineReducers} from 'redux';
import products from './registration.reducer';
import badge from './badge.reducer';
import category from './category.reducer';

const reducer = combineReducers({
    products,
    badge,
    category,
});

export default reducer;