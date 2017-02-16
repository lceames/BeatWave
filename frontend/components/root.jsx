import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx';
import SessionFormContainer from './session/session_form_container';
import Splash from './splash';
import Stream from './stream';

export default ({store}) => {
  function redirectIfLoggedIn(nextState, replace) {
    debugger
    if (store.getState().session.currentUser) {
      replace('/stream');
    }
  }

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Splash} onEnter={redirectIfLoggedIn} />
          <Route path='/stream' component={Stream} />
        </Route>
      </Router>
    </Provider>
  );
};
