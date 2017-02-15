import React from 'react';
import merge  from 'lodash/merge';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, RESET_ERRORS } from '../actions/session_actions';


const sessionReducer = (oldState = { currentUser: null, errors: [] }, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case(RECEIVE_CURRENT_USER):
      return merge({}, oldState, {currentUser: action.currentUser} );
    case(RECEIVE_ERRORS):
      return merge({}, oldState, {errors: action.errors});
    case(RESET_ERRORS):
      let errors = { currentUser: null, errors: [] };
      return errors;
    default:
      return oldState;
  }
};

export default sessionReducer;
