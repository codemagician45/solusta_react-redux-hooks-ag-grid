import {combineReducers} from 'redux';
import products from './registeration-form.reducer';
import badge from './badge.reducer';

const reducer = combineReducers({
    products,
    badge
});

export default reducer;