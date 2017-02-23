import React from 'react';
import { RECEIVE_TRACKS, RECEIVE_TRACK_ERRORS } from '../actions/track_actions';
import { START_LOADING_TRACK } from '../actions/loading_actions';

const loadingReducer = (oldState = { state: false, errors: [] }, action) => {
  switch(action.type) {
    case(START_LOADING_TRACK):
      return {state: true, errors: [] };
    case(RECEIVE_TRACKS):
      return { state: false, errors: [] };
    case(RECEIVE_TRACK_ERRORS):
      return { state: false, errors: action.errors.responseJSON }
    default:
      return oldState;
  }
};

export default loadingReducer;
