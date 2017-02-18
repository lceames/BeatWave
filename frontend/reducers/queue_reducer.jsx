import React from 'react';
import { RECEIVE_TRACK, RECEIVE_TRACKS, SET_CURRENT_TRACK } from '../actions/track_actions';
import merge from 'lodash/merge';

const queueReducer = (oldState = { currentTrack: null, queue: [] }, action) => {
  Object.freeze(oldState);
  let currentTrackDefault = { elapsedTime: 0, paused: false };
  let queue;

  switch(action.type) {
    case(RECEIVE_TRACK):
      queue = [...oldState.queue];
      queue.push(action.tracks);
      return {
        currentTrack: oldState.currentTrack,
        queue
      };
    case(RECEIVE_TRACKS):
      queue = [...oldState.queue];
      queue = queue.concat(action.tracks);
      return {
        currentTrack: oldState.currentTrack,
        queue
      };
    case(SET_CURRENT_TRACK):
      let currentTrack = merge(currentTrackDefault, action.currentTrackItem);
      queue = [...oldState.queue];
      return {
        currentTrack,
        queue
      };
    default:
      return oldState;
  }
};

export default queueReducer;
