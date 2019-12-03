import {combineReducers} from 'redux';
import products from './registration-form.reducer';
import badge from './badge.reducer';
import image from './image.reducer';

const reducer = combineReducers({
    products,
    badge,
    image
});

export default reducer;