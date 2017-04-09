import React from 'react';
import { combineReducers } from 'redux';
import sessionReducer from './sessions_reducer';
import queueReducer from './queue_reducer';
import userProfileReducer from './user_profile_reducer';
import loadingReducer from './loading_reducer';
import modalReducer from './modal_reducer'

export default combineReducers({
  session: sessionReducer,
  trackQueue: queueReducer,
  userProfile: userProfileReducer,
  loading: loadingReducer,
  modal: modalReducer
});
