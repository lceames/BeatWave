import React from 'react';

export const OPEN_PLAYLIST_MODAL = "OPEN_PLAYLIST_MODAL";
export const CLOSE_PLAYLIST_MODAL = "CLOSE_PLAYLIST_MODAL";

export const openPlaylistModal = (trackId) => {
  return {
    type: OPEN_PLAYLIST_MODAL,
    trackId
  };
};

export const closePlaylistModal = () => {
  return {
    type: CLOSE_PLAYLIST_MODAL
  };
};
