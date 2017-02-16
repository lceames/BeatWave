import React from 'react';
import { RECEIVE_TRACK } from '../actions/track_actions';

const tracksReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case(RECEIVE_TRACK):
      return [action.track];
    default:
      return oldState;
  }
};

export default tracksReducer;
