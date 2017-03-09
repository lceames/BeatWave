import React from 'react';
import { Link, hashHistory } from 'react-router';
import Comment from './comment';
import PlayPause from './play_pause';
import NewComment from './new_comment';
import Waveform from '../waveform/waveform';

export default class StreamIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.track.elapsedTime === nextProps.track.duration) {
    //   nextProps.resetElapsedTime(nextProps.track.id);
    // }
    // if (this.props.currentTrack && (this.props.currentTrack.track.id === this.props.track.id)) {
    //   this.setState({elapsedTime: this.props.currentTrack.elapsedTime});
    //   if (this.state.elapsedTime >= this.props.track.duration) {
    //
    //   }
    // }
  }

  handleDelete() {
    this.props.deleteTrack(this.props.track.id);
  }

  render () {
    const { track, queue, currentTrack, currentUser } = this.props;
    let deleteTrack = <div></div>;
    let poster = "";

    if (window.currentUser && window.currentUser.id === track.user_id) {
      deleteTrack = <i onClick={this.handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
    }

    if (!this.props.type) {
      poster = <p className="stream-item-author"><Link to={`/${track.user_id}`} className="author-link">{track.author} </Link>
        posted <Link className="author-link" to={`/${track.user_id}/${track.id}`}>a track</Link></p>
    }

    let comments = track.comments.map( (comment) => {
      return <Comment comment={comment} key={comment.id}/>
    })
    let newComment = currentUser ? <NewComment track={track}/> : ""

    return (
      <li className="stream-index-item">
        {poster}
        <div className="stream-item-content">
          <img src={track.image} className="track-image" onClick={ () => hashHistory.push(`/${track.user_id}/${track.id}`)}/>
          <PlayPause track={track} currentTrack={currentTrack} queue={queue}/>
          <div className="right-track-section">
            <Link className="track-title" to={`/${track.user_id}/${track.id}`}>{track.title}</Link>
            <div className="waveform">
              <Waveform track={this.props.track} elapsedTime={track.elapsedTime} type="stream"/>
            </div>
            <p>{track.elapsedTime}</p>
            <div className="comments">
              {comments}
            </div>
            {deleteTrack}
            {newComment}
          </div>
        </div>
      </li>
    )
  }
}
