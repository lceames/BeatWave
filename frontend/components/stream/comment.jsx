import React from 'react';
import Modal from 'react-modal';

export default class Comment extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className="comment">
        <img src={comment.thumb} className="comment-thumb" />
          <div className="comment-body">
            <p className="author">{comment.author}</p>
            <p className="body">{comment.body}</p>
          </div>
      </div>
    )
  }
};
