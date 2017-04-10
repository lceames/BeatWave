import React from 'react';
import * as PlaylistApiUtil from '../util/playlist_api_util';
import * as TrackPlaylistApiUtil from '../util/track_playlist_api_util';

export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";

export const createPlaylist = playlist => dispatch => {
  return PlaylistApiUtil.createPlaylist(playlist).then(
    (playlist) => dispatch(receivePlaylist(playlist))
  );
};

export const addToPlaylist = trackPlaylist => dispatch => {
  return TrackPlaylistApiUtil.createTrackPlaylist(trackPlaylist).then(
    playlist => dispatch(receivePlaylist(playlist))
  );
};

export const fetchPlaylists = () => dispatch => {
  return PlaylistApiUtil.fetchPlaylists().then(
    playlists => dispatch(receivePlaylists(playlists))
  );
};
