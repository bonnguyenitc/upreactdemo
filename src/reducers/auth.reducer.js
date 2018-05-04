import { LOG_IN, LOGOUT } from '../constants/constants';

const initialState = {
    id: null,
    username : null,
    avatar : null,
    isAdmin: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN:
            return {
                id: action.id,
                username : action.username,
                avatar : action.avatar,
                isAdmin: action.isAdmin
            };
        case LOGOUT: 
            return {};
        default: 
            return {};
    }
}