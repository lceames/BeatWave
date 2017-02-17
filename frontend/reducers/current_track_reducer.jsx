import React from 'react';
import { RECEIVE_CURRENT_TRACK } from '../actions/track_actions';

const queueReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case(RECEIVE_CURRENT_TRACK):
      return [action.track];
    default:
      return oldState;
  }
};

export default tracksReducer;
