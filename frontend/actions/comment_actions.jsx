import React from 'react';
import * as CommentApiUtil from '../util/comment_api_util';
import { receiveTrack } from './track_actions';

export const createComment = comment => dispatch => {
  return CommentApiUtil.createComment(comment).then(
    (track) => dispatch(receiveTrack(track))
  );
};

export const deleteComment = comment_id => dispatch => {
  return CommentApiUtil.deleteComment(comment_id).then(
    (track) => dispatch(receiveTrack(track))
  );
};
