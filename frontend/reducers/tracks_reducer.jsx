import React from 'react';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions';

const tracksReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case(RECEIVE_TRACK):
      return [action.track];
    case(RECEIVE_TRACKS):
      let newState = oldState.slice(0);
      return newState.concat(action.tracks);
    default:
      return oldState;
  }
};

export default tracksReducer;
