import React from 'react';
import { OPEN_PLAYLIST_MODAL, CLOSE_PLAYLIST_MODAL } from '../actions/modal_actions';

const modalReducer = (oldState = { playlist: null }, action) => {
  switch(action.type) {
    case(OPEN_PLAYLIST_MODAL):
      return { playlist: action.trackId };
    case(CLOSE_PLAYLIST_MODAL):
      return { playlist: null };
    default:
      return oldState;
  }
};

export default modalReducer;
