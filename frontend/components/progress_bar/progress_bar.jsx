import React from 'react';

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
      debugger
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
    this.audioTag.currentTime = 0;
    this.props.handleRewind();
    this.setState({elapsedTime: 0});
  }

  handleNext() {
    let lastTrackId = (this.props.currentTrack.track.id).toString();
    let lastTrackAudio = document.getElementById(lastTrackId);
    lastTrackAudio.pause();
    lastTrackAudio.currentTime = 0;

    let queueIndex = this.props.currentTrack.queueIndex + 1;
    let track = this.props.queue[queueIndex];
    let audio = document.getElementById(track.id);
    let currentTrackItem = { queueIndex, track };
    this.props.setCurrentTrack(currentTrackItem);
  }

  updateElapsedTime() {
    let elapsedTime;
    if (this.audioTag.currentTime < this.audioTag.duration) {
      elapsedTime = Math.floor(this.audioTag.currentTime);
      this.props.updateElapsedTime(elapsedTime);
      this.setState({elapsedTime: elapsedTime});
    }
    else {
      this.handleNext();
    }
  }

  renderElapsedTime () {
    if (!this.audioTag) { return "0:00"; }
    let seconds = (this.state.elapsedTime % 60).toString();
    let minutes = Math.floor(this.state.elapsedTime / 60).toString();
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
        <span className="title">{currentTrack.track.title}</span>
        <audio onTimeUpdate={this.updateElapsedTime} id={currentTrack.track.id} ref={(tag) => this.audioTag = tag}>
            <source src={currentTrack.track.url} type="audio/mpeg"></source>
        </audio>
      </div>
    );
  }

}
