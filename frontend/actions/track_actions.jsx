import React from 'react';
import * as TrackApiUtil from '../util/track_api_util';

export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const PAUSE_CURRENT_TRACK = "PAUSE_CURRENT_TRACK";
export const UPDATE_ELAPSED_TIME = "UPDATE_ELAPSED_TIME";
export const PLAY_CURRENT_TRACK = "PLAY_CURRENT_TRACK";
export const HANDLE_REWIND = "HANDLE_REWIND";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RESET_ELAPSED_TIME = "RESET_ELAPSED_TIME";
export const RESET_TRACKS = "RESET_TRACKS";
export const RECEIVE_TRACK_SHOW = "RECEIVE_TRACK_SHOW";

export const fetchTrack = (id) => dispatch => {
  return TrackApiUtil.fetchTrack(id).then(
    (track) => dispatch(receiveTrack(track))
  );
};

export const fetchTrackShow = (id) => dispatch => {
  return TrackApiUtil.fetchTrack(id).then(
    (track) => dispatch(receiveTrackShow(track))
  );
};

export const fetchTracks = (type, id) => dispatch => {
  return TrackApiUtil.fetchTracks(type, id).then(
    (tracks) => {
      dispatch(receiveTracks(tracks));
    }
  );
};

export const createTrack = (track) => dispatch => {
  return TrackApiUtil.createTrack(track).then(
    (track) => dispatch(receiveTrack(track))
  );
};

export const deleteTrack = (id) => dispatch => {
  return TrackApiUtil.deleteTrack(id).then(
    (track) => dispatch(removeTrack(track))
  );
};

export const receiveTracks = tracks => {
  return {
    type: RECEIVE_TRACKS,
    tracks
  };
};

export const resetTracks = () => {
  return {
    type: RESET_TRACKS
  };
};

export const receiveTrack = track => {
  return {
    type: RECEIVE_TRACK,
    track
  };
};

export const receiveTrackShow = track => {
  return {
    type: RECEIVE_TRACK_SHOW,
    track
  };
};

export const removeTrack = track => {
  return {
    type: REMOVE_TRACK,
    track
  };
};

export const setCurrentTrack = currentTrackItem => {
  return {
    type: SET_CURRENT_TRACK,
    currentTrackItem
  };
};

export const pauseCurrentTrack = () => {
  return {
    type: PAUSE_CURRENT_TRACK
  };
};

export const playCurrentTrack = () => {
  return {
    type: PLAY_CURRENT_TRACK
  };
};

export const updateElapsedTime = (time) => {
  return {
    type: UPDATE_ELAPSED_TIME,
    time
  };
};

export const handleRewind = () => {
  return {
    type: HANDLE_REWIND
  };
};
