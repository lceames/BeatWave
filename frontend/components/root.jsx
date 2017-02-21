import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app.jsx';
import SessionFormContainer from './session/session_form_container';
import Splash from './splash';
import StreamContainer from './stream/stream_container';
import UploadContainer from './upload/upload_container';
import UserShowContainer from './user_show_container';
import TrackShow from './track_show';

export default ({store}) => {
  function redirectIfLoggedIn(nextState, replace) {
    if (store.getState().session.currentUser) {
      replace('/stream');
    }
  }

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Splash} onEnter={redirectIfLoggedIn} />
          <Route path='/stream' component={StreamContainer} />
          <Route path='/upload' component={UploadContainer} />
          <Route path='/:userId' component={UserShowContainer}/>
          <Route path='/:userId/:trackId' component={TrackShow}/>
        </Route>
      </Router>
    </Provider>
  );
};
