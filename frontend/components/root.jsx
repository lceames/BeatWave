import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx';
import SessionFormContainer from './session_form_container';

export default ({store}) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SessionFormContainer} />
        </Route>
        <IndexRoute></IndexRoute>
      </Router>
    </Provider>
  );
};
