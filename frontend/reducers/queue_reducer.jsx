import React from 'react';
import {
  RECEIVE_TRACK, RECEIVE_TRACKS, SET_CURRENT_TRACK, PAUSE_CURRENT_TRACK, UPDATE_ELAPSED_TIME, PLAY_CURRENT_TRACK, HANDLE_REWIND
  } from '../actions/track_actions';
import merge from 'lodash/merge';

const queueReducer = (oldState = { currentTrack: null, queue: [] }, action) => {
  Object.freeze(oldState);
  let currentTrackDefault = { elapsedTime: 0, paused: false };
  let queue;
  let newState;

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
    case(PAUSE_CURRENT_TRACK):
      newState = merge({}, oldState);
      newState.currentTrack.paused = true;
      return newState;
    case(PLAY_CURRENT_TRACK):
      newState = merge({}, oldState);
      newState.currentTrack.paused = false;
      return newState;
    case(UPDATE_ELAPSED_TIME):
      newState = merge({}, oldState);
      newState.currentTrack.elapsedTime += 1;
      return newState;
    case(HANDLE_REWIND):
      newState = merge({}, oldState);
      newState.currentTrack.elapsedTime = 0;
      return newState;
    default:
      return oldState;
  }
};

export default queueReducer;
