import React from 'react';
import {
  REMOVE_TRACK, RECEIVE_TRACK, RECEIVE_TRACKS, SET_CURRENT_TRACK, PAUSE_CURRENT_TRACK, UPDATE_ELAPSED_TIME, PLAY_CURRENT_TRACK, HANDLE_REWIND
  } from '../actions/track_actions';
import merge from 'lodash/merge';

const queueReducer = (oldState = { currentTrack: null, queue: [] }, action) => {
  Object.freeze(oldState);
  let currentTrackDefault = { elapsedTime: 0, paused: false };
  let queue;
  let newState;
  let currentUser;
  let queueIndex;

  switch(action.type) {
    case(RECEIVE_TRACK):
      queue = [...oldState.queue];
      queue = queue.map( (track) => {
        if (track.id === action.track.id) {
          return action.track;
        }
        else {
          return track;
        }
      });

      return {
        currentTrack: oldState.currentTrack,
        queue
      };
    case(REMOVE_TRACK): {
      queue = [...oldState.queue];
      queueIndex = queue.findIndex( (track) => track.id === action.track.id);
      if (queueIndex) { delete queue[queueIndex]; }
      if (currentTrack) { currentTrack = merge({}, oldState.currentTrack); }

      return {
        currentTrack,
        queue
      };
    }
    case(RECEIVE_TRACKS):
      queue = action.tracks;
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
      newState.currentTrack.elapsedTime = action.time;
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
