import React from 'react';

export const START_LOADING_TRACK = "START_LOADING_TRACK";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const startLoadingTrack = () => {
  return {
    type: START_LOADING_TRACK
  };
};
