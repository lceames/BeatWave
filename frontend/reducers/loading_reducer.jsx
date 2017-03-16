import React from 'react';
import { RECEIVE_TRACKS, RECEIVE_TRACK_ERRORS } from '../actions/track_actions';
import { RECEIVE_USER_PROFILE } from '../actions/user_actions';
import { START_LOADING } from '../actions/loading_actions';

const loadingReducer = (oldState = { state: false, errors: [] }, action) => {
  switch(action.type) {
    case(START_LOADING):
      return {state: true, errors: [] };
    case(RECEIVE_TRACKS):
      return { state: false, errors: [] };
    case(RECEIVE_TRACK_ERRORS):
      return { state: false, errors: action.errors.responseJSON };
    case(RECEIVE_USER_PROFILE):
      return { state: false, errors: [] };
    default:
      return oldState;
  }
};

export default loadingReducer;
