import { LOG_IN, LOG_OUT } from '../constants/constants';
import { checkAuth } from '../components/authService';
const jwt = require('jsonwebtoken');

export function logIn(user) {
    return {
        type: LOG_IN,
        id: user.id,
        username : user.username,
        avatar : user.avatar,
        isAdmin: user.isAdmin
    }
}

export function logOut() {
    return {
        type: LOG_OUT
    }
}

export function listenUser() {
    return (dispatch) => {
        let token = localStorage.getItem('token');
        if(!token) return;
        jwt.verify(token, 'thoaint-softworldvn', (err, decoded) => {
            if(err) return dispatch(logOut());
            return dispatch(logIn(decoded));
            console.log(token);
        });
        
    }
}