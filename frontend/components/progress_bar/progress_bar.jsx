import React from 'react';
import { Link } from 'react-router';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
    this.handleRewind = this.handleRewind.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.state = { elapsedTime: 0, loaded: false };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentTrack) {
      return;
    }
    if (this.props.currentTrack.track.id !== nextProps.currentTrack.track.id) {
      this.setState({loaded: false});
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (!this.state.loaded) {
      this.audioTag.play();
      this.setState({loaded: true});
    }
  }

  handlePlay() {
    this.props.playCurrentTrack();
    this.audioTag.play();
  }

  handlePause() {
    this.props.pauseCurrentTrack();
    this.audioTag.pause();
  }

  handleRewind() {
    if (Math.floor(this.audioTag.currentTime) === 0) {
      let queueIndex = this.props.currentTrack.queueIndex - 1;
      let track = this.props.queue[queueIndex];
      let currentTrackItem = { queueIndex, track };
      this.props.setCurrentTrack(currentTrackItem);
    }
    else {
      this.audioTag.currentTime = 0;
      this.props.handleRewind();
      this.setState({elapsedTime: 0});
    }
  }

  handleNext() {
    let lastTrackId = (this.props.currentTrack.track.id).toString();
    let lastTrackAudio = document.getElementById(lastTrackId);
    // lastTrackAudio.pause();
    lastTrackAudio.currentTime = 0;

    let queueIndex = this.props.currentTrack.queueIndex + 1;
    if (this.props.queue.length === queueIndex || !queueIndex ) {
      queueIndex = 0;
    }
    let track = this.props.queue[queueIndex];
    let currentTrackItem = { queueIndex, track };
    this.props.setCurrentTrack(currentTrackItem);
  }

  updateElapsedTime() {
    if (!this.audioTag.duration) {
      return;
    }

    const elapsedTime = Math.floor(this.audioTag.currentTime);
    if (elapsedTime < Math.floor(this.audioTag.duration)) {
      this.props.updateElapsedTime(elapsedTime);
    }
    else {
      this.handleNext();
    }
  }

  renderElapsedTime () {
    if (!this.audioTag) { return "0:00"; }
    let seconds = (this.props.currentTrack.elapsedTime % 60).toString();
    let minutes = Math.floor(this.props.currentTrack.elapsedTime / 60).toString();
    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  handleProgress() {
    if (this.audioTag) {
      return this.audioTag.currentTime/this.audioTag.duration;
    }
    else {
      return 0;
    }
  }

  handleDuration() {
    let duration;
    if (!this.audioTag || !this.audioTag.duration) {
      return "";
    }
    else {
      duration = Math.floor(this.audioTag.duration);
      let seconds = (duration % 60).toString();
      let minutes = Math.floor(duration / 60).toString();
      if (seconds.length < 2) {
        seconds = "0" + seconds;
      }
      return `${minutes}:${seconds}`;
    }
  }

  render () {
    const { currentTrack, queue } = this.props;
    if (!currentTrack) {return <div></div>; }
    let playPause;
    if (currentTrack.paused) {
      playPause = <i className="fa fa-play fa-lg" aria-hidden="true" onClick={this.handlePlay}></i>
    }
    else {
      playPause = <i className="fa fa-pause fa-lg" aria-hidden="true" onClick={this.handlePause}></i>
    }

    return (
      <div className="progress-bar">
        <nav className="control-buttons">
          <i className="fa fa-step-backward fa-lg" aria-hidden="true" onClick={this.handleRewind}></i>
          {playPause}
          <i className="fa fa-step-forward fa-lg" aria-hidden="true" onClick={this.handleNext}></i>
        </nav>
        <div className="bar-section">
          <span className="elapsed-time">{this.renderElapsedTime.apply(this)}</span>
          <progress className="bar" value={this.handleProgress.apply(this)}></progress>
          <span className="duration">{this.handleDuration.apply(this)}</span>
        </div>
        <div className="track-info">
          <img src={currentTrack.track.image} className="track-image"/>
          <div className="title-author">
            <Link className="author-link" to={`/${currentTrack.track.user_id}/${currentTrack.track.id}`}>Playing track</Link>
            <Link className="title" to={`/${currentTrack.track.user_id}/${currentTrack.track.id}`}>{currentTrack.track.title}</Link>
          </div>
        </div>
        <audio src={currentTrack.track.url} type="audio/mpeg"
          onTimeUpdate={this.updateElapsedTime} id={currentTrack.track.id} ref={(tag) => this.audioTag = tag}>
        </audio>
      </div>
    );
  }

}
