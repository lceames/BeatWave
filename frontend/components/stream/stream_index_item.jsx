import React from 'react';
import { Link, hashHistory } from 'react-router';
import Comment from './comment';

export default class StreamIndexItem extends React.Component {
  constructor(props) {
    super();
    this.setCurrentTrack = this.setCurrentTrack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.state = { body: "" };
  }

  handleDelete() {
    this.props.deleteTrack(this.props.track.id);
  }

  handlePause() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    this.props.pauseCurrentTrack();
    audioTag.pause();
  }

  setCurrentTrack(e) {
    if (this.props.currentTrack && this.props.currentTrack.paused) {
      let audioTag = document.getElementById(this.props.currentTrack.track.id);
      this.props.playCurrentTrack();
      audioTag.play();
    }
    else {
      let lastTrackId;
      let lastTrackAudio;
      let queueIndex = this.props.queue.findIndex((el) => el === this.props.track);
      let track = this.props.track;
      let currentTrackItem = { queueIndex, track };
      this.props.setCurrentTrack(currentTrackItem);
    }
  }

  handleChange(e) {
    let elapsedTime = this.props.currentTrack ? this.props.currentTrack.elapsedTime : 0;
    let comment;
    if (e.keyCode === 13) {
      comment = Object.assign({}, this.state);
      comment["track_id"] = this.props.track.id;
      comment["elapsed_time"] = elapsedTime;
      this.props.createComment(comment);
      this.setState({body: ""})
    }
    else if (e.keyCode === 8) {
      let body = this.state.body;
      this.setState({body: body.slice(0, body.length - 1)});
    }
    else {
      this.setState({body: e.currentTarget.value + e.key});
    }
  }

  render () {
    const { track, queue, currentTrack } = this.props;
    let playPause;
    let deleteTrack = <div></div>;
    let poster = "";

    if (!currentTrack || track.id !== currentTrack.track.id || currentTrack.paused === true) {
      playPause = <i className="fa fa-play-circle fa-3x" aria-hidden="true" onClick={this.setCurrentTrack}></i>
    }
    else {
      playPause = <i className="fa fa-pause-circle fa-3x" aria-hidden="true" onClick={this.handlePause}></i>
    }

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
    return (
      <li className="stream-index-item">
        {poster}
        <div className="stream-item-content">
          <img src={track.image} className="track-image" onClick={ () => hashHistory.push(`/${track.user_id}/${track.id}`)}/>
          {playPause}
          <div className="right-track-section">
            <Link className="track-title" to={`/${track.user_id}/${track.id}`}>{track.title}</Link>
            <div className="comments">
              {comments}
            </div>
            {deleteTrack}
            <div className="new-comment">
            {/*  <img src={window.currentUser.image}/> */}
              <form>
                <input type="text" placeholder="Write a comment" className="comment-text"
                onKeyUp={this.handleChange} value={this.state.body}
                />
              </form>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
