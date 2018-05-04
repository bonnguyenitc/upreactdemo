import { combineReducers } from 'redux';
import AuthReducer from '../reducers/auth.reducer';

const rootReducers = combineReducers({
    auth: AuthReducer
});

export default rootReducers;