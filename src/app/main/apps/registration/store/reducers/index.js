import {combineReducers} from 'redux';
import products from './registration-form.reducer';
import badge from './badge.reducer';
import image from './image.reducer';
import category from './category.reducer';

const reducer = combineReducers({
    products,
    badge,
    image,
    category,
});

export default reducer;