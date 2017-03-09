import React from 'react';
import {
  REMOVE_TRACK, RECEIVE_TRACK, RECEIVE_TRACK_SHOW, RECEIVE_TRACKS, SET_CURRENT_TRACK, RESET_TRACKS,
  PAUSE_CURRENT_TRACK, UPDATE_ELAPSED_TIME, PLAY_CURRENT_TRACK, HANDLE_REWIND, RESET_ELAPSED_TIME
  } from '../actions/track_actions';
import merge from 'lodash/merge';

const queueReducer = (oldState = { currentTrack: null, queue: [] }, action) => {
  Object.freeze(oldState);
  let currentTrackDefault = { paused: false };
  let queue;
  let newState;
  let currentUser;
  let queueIndex;
  let currentTrack;
  let nextTrack;

  switch(action.type) {
    case(RECEIVE_TRACK):
      queue = [...oldState.queue];
      queue = queue.map( (track) => {
        if (track.id === action.track.id) {
          action.track.active = track.active;
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
    case(RECEIVE_TRACK_SHOW):
      queue = [action.track];
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
      newState = merge({}, oldState);
      if (newState.currentTrack) {
        let lastTrackIndex = newState.queue.findIndex( (track) => track.id === newState.currentTrack.track.id);
        if (lastTrackIndex !== -1) {
          newState.queue[lastTrackIndex].active = false;
        }
      }
      nextTrack = merge(currentTrackDefault, action.currentTrackItem);
      nextTrack.elapsedTime = action.currentTrackItem.elapsedTime;
      newState.currentTrack = nextTrack;
      queueIndex = newState.queue.findIndex( (track) => track.id === newState.currentTrack.track.id);
      newState.queue[queueIndex].active = true;
      return newState;
    case(RESET_TRACKS):
      return { currentTrack: null, queue: [] };
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
      queueIndex = newState.queue.findIndex( (track) => track.id === newState.currentTrack.track.id);
      if (queueIndex >= 0) {
        newState.queue[queueIndex].elapsedTime = action.time;
      }
      newState.currentTrack.elapsedTime = action.time;
      return newState;
    case(HANDLE_REWIND):
      newState = merge({}, oldState);
      newState.currentTrack.elapsedTime = 0;
      return newState;
    case(RESET_ELAPSED_TIME):
      newState = merge({}, oldState);
      queueIndex = newState.queue.findIndex( (track) => track.id === newState.currentTrack.track.id);
      newState.queue[queueIndex].elapsedTime = 0;
      return newState;
    default:
      return oldState;
  }
};

export default queueReducer;
