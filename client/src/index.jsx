import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import {AUTH_USER} from './actions/types'

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if(token){
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" components={App} >
        <IndexRoute component={Welcome}/>
        <Route path="signin" components={Signin}/>
        <Route path="signout" components={Signout}/>
        <Route path="signup" components={Signup}/>
        <Route path="feature" components={RequireAuth(Feature)}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
