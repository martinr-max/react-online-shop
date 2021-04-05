import { combineReducers } from 'redux';
import currentUser from './user/user.reducer';

export default combineReducers({
    user: currentUser
});