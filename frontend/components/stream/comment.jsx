import React from 'react';
import Modal from 'react-modal';
import { formatTime } from '../../util/helper_functions';
import { Link } from 'react-router';

export default class Comment extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    const comment = this.props.comment;
    const proportion = comment.elapsedTime/comment.duration;
    const wavelength = this.props.type === "track-show" ? 800 : 600;
    const timestamp = this.props.type === "track-profile" ? <span className="timestamp">at {formatTime(comment.elapsedTime)} </span> : "";

    return (
      <div className="comment" style={{left: proportion * wavelength}}>
        <img src={comment.thumb} className="comment-thumb" />
          <div className="comment-body">
            <div className="user-comment-section">
              <p className="author">{comment.author}</p>
              {timestamp}
            </div>
            <p className="body">{comment.body}</p>
          </div>
      </div>
    )
  }
};
