import {combineReducers} from 'redux';
import products from './registration-form.reducer';
import badge from './badge.reducer';

const reducer = combineReducers({
    products,
    badge
});

export default reducer;