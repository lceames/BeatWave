import React from 'react';
import { Link } from 'react-router';

export default class StreamIndexItem extends React.Component {
  constructor(props) {
    super();
    this.setCurrentTrack = this.setCurrentTrack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    let queueIndex;
    // if (this.props.currentTrack && this.props.currentTrack.id === this.props.track.id) {
    //   queueIndex = this.props.queue.findIndex(this.props.track);
    //   setCurrentTrack(queueIndex)
    // }
    this.props.deleteTrack(this.props.track.id);
  }

  handlePause() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    clearInterval(this.state.intervalId);
    this.props.pauseCurrentTrack();
    audioTag.pause();
  }

  setCurrentTrack(e) {
    let lastTrackId;
    let lastTrackAudio;
    if (this.props.currentTrack) {
      lastTrackId = (this.props.currentTrack.track.id).toString();
      lastTrackAudio = document.getElementById(lastTrackId);
      lastTrackAudio.pause();
      lastTrackAudio.currentTime = 0;
    }
    let queueIndex = this.props.queue.findIndex((el) => el === this.props.track);
    let track = this.props.track;
    let currentTrackItem = { queueIndex, track };
    this.props.setCurrentTrack(currentTrackItem);
  }

  render () {
    const { track, queue, currentTrack } = this.props;
    let playPause;
    let deleteTrack = <div></div>;

    if (!currentTrack || track.id !== currentTrack.track.id || currentTrack.paused === true) {
      playPause = <i className="fa fa-play-circle fa-3x" aria-hidden="true" onClick={this.setCurrentTrack}></i>
    }
    else {
      playPause = <i className="fa fa-pause-circle fa-3x" aria-hidden="true" onClick={this.handlePause}></i>
    }

    if (window.currentUser && window.currentUser.id === track.user_id) {
      deleteTrack = <button onClick={this.handleDelete}>Delete Track</button>
    }

    return (
      <li className="stream-index-item">
        <p className="stream-item-author"><Link to={`/${track.user_id}`} className="author-link">{track.author} </Link>
          posted <Link className="author-link" to={`/${track.user_id}/${track.id}`}>a track</Link></p>
        <div className="stream-item-content">
          <img src={track.image} className="track-image"/>
          {playPause}
          <Link className="track-title" to={`/${track.user_id}/${track.id}`}>{track.title}</Link>
          {deleteTrack}
        </div>
      </li>
    )
  }
}
