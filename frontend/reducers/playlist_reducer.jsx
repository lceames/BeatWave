import React from 'react';
import { RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST } from '../actions/playlist_actions';

const playlistReducer = (oldState = null , action) => {
  switch(action.type) {
    case(RECEIVE_PLAYLIST):
      return action.playlist;
    case(RECEIVE_PLAYLISTS):
      return action.playlists;
    default:
      return oldState;
  }
};

export default playlistReducer;
