import React from 'react';
import { combineReducers } from 'redux';
import sessionReducer from './sessions_reducer';
import tracksReducer from './tracks_reducer';

export default combineReducers({
  session: sessionReducer,
  trackQueue: tracksReducer
});