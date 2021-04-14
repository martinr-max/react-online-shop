import { combineReducers } from 'redux';
import currentUser from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const configPerst = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: currentUser,
    cart: cartReducer
});

export default persistReducer(configPerst, rootReducer)