import React from 'react';

export const START_LOADING = "START_LOADING";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const startLoading = () => {
  return {
    type: START_LOADING
  };
};
