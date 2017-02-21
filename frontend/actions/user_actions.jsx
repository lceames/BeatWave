import React from 'react';
import * as userApiUtil from '../util/user_api_util';

export const RECEIVE_USER_PROFILE = "RECEIVE_USER_PROFILE";

export const fetchUser = id => dispatch => {
  return userApiUtil.fetchUser(id).then(
    (user) => dispatch(receiveUserProfile(user))
  );
};

export const receiveUserProfile = user => {
  return {
    type: RECEIVE_USER_PROFILE,
    user
  };
};
