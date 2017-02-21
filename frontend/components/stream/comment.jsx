import React from 'react';

const Comment = props => {
  return <img src={props.comment.thumb} className="comment-thumb" />
};

export default Comment;
