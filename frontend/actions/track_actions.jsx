import React from 'react';
import * as TrackApiUtil from '../util/track_api_util';

export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";

export const fetchTrack = (id) => dispatch => {
  return TrackApiUtil.fetchTrack(id).then(
    (track) => dispatch(receiveTrack(track))
  );
};

export const fetchTracks = (filter) => dispatch => {
  return TrackApiUtil.fetchTracks(filter).then(
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

export const receiveTracks = tracks => {
  return {
    type: RECEIVE_TRACKS,
    tracks
  };
};

export const receiveTrack = track => {
  return {
    type: RECEIVE_TRACK,
    track
  };
};
