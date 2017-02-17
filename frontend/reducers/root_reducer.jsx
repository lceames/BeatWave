import React from 'react';
import { combineReducers } from 'redux';
import sessionReducer from './sessions_reducer';
import queueReducer from './queue_reducer';

export default combineReducers({
  session: sessionReducer,
  trackQueue: queueReducer
});
