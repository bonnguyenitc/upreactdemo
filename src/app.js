import React,  { Component } from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import MainContainer from './containers/MainContainer';
import Login from './components/user/Login';
import UploadImages from './components/upload-images/UploadImages';
import UploadVideo from './components/upload-videos/UploadVideos';
import UploadAvatarContainer from './containers/UploadAvatarContainer';
import Main from './components/user/Profile';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers/index';
import { listenUser } from "./actions/auth.action";
const store = createStore(rootReducers, applyMiddleware(thunk));


require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
require('style-loader!css-loader!foundation-sites/dist/css/foundation-float.min.css');
require('style-loader!css-loader!./css/Home.css');


$(document).ready(() => $(document).foundation());

store.dispatch(listenUser());

const requireLogin = (nextState, replace, next) => {
    let id = store.getState().auth.id;
    if(!id){
        replace('/');
    }
    next();
}

ReactDOM.render(
    <Provider store = { store }>
        <Router history={hashHistory}>
            <Router path="/" component={AppContainer}>
                <IndexRoute component={MainContainer}/>
                <Route path="upload-avatar" component={UploadAvatarContainer} onEnter= { requireLogin } />
                <Route path="upload-images" component={UploadImages} onEnter= { requireLogin } />
                <Route path="upload-video" component={UploadVideo} onEnter = { requireLogin } />
            </Router>
        </Router>
    </Provider>, 
    document.getElementById('root')
)