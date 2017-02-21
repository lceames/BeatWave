import React from 'react';
import { RECEIVE_USER_PROFILE } from '../actions/user_actions';

const userProfileReducer = (oldState = {}, action) => {
  switch(action.type) {
    case("RECEIVE_USER_PROFILE"):
      return action.user;
    default:
      return oldState;
  }
};

export default userProfileReducer;
