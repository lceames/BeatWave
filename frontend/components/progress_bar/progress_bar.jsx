import React from 'react';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
    this.handleRewind = this.handleRewind.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.state.intervalId);
    if (nextProps.currentTrack) {
      this.setState({intervalId: setInterval(this.updateElapsedTime.bind(this), 1000)});
      this.state = nextProps.currentTrack;
      this.state.intervalId = null;
    }
  }

  handlePlay() {
    debugger
    let audioTag = document.getElementById(this.state.track.id);
    this.setState({
      intervalId: setInterval(this.updateElapsedTime.bind(this), 1000),
      paused: false
    });
    audioTag.play();
  }

  handlePause() {
    let audioTag = document.getElementById(this.state.track.id);
    clearInterval(this.state.intervalId);
    this.setState({paused: true});
    audioTag.pause();
  }

  handleRewind() {
    let audioTag = document.getElementById(this.state.track.id);
    audioTag.currentTime = 0;
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
    let duration = Math.floor(audio.duration);
    let currentTrackItem = { queueIndex, duration, track };
    this.props.setCurrentTrack(currentTrackItem);
    audio.play();
  }

  updateElapsedTime() {
    if (!this.state) {
      return;
    }

    if (this.state.elapsedTime < this.props.currentTrack.duration) {
      this.setState({elapsedTime: this.state.elapsedTime + 1});
    }
    else {
      this.handleNext();
    }
  }

  renderElapsedTime () {
    let seconds = (this.state.elapsedTime % 60).toString();
    let minutes = Math.floor(this.state.elapsedTime / 60).toString();
    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  render () {
    if (!this.props.currentTrack) {return <div></div> }
    let playPause;

    if (this.state.paused) {
      playPause = <i className="fa fa-play fa-lg" aria-hidden="true" onClick={this.handlePlay}></i>
    }
    else {
      playPause = <i className="fa fa-pause fa-lg" aria-hidden="true" onClick={this.handlePause}></i>
    }

    let seconds = (this.state.duration % 60).toString();
    if (seconds.length === 1) { seconds = `0${seconds}`}
    let minutes = Math.floor(this.state.duration / 60)

    return (
      <div className="progress-bar">
        <nav className="control-buttons">
          <i className="fa fa-step-backward fa-lg" aria-hidden="true" onClick={this.handleRewind}></i>
          {playPause}
          <i className="fa fa-step-forward fa-lg" aria-hidden="true" onClick={this.handleNext}></i>
        </nav>
        <div className="bar-section">
          <span className="elapsed-time">{this.renderElapsedTime.apply(this)}</span>
          <progress className="bar" value={this.state.elapsedTime/this.state.duration}></progress>
          <span className="duration">{minutes}:{seconds}</span>
          </div>
        <span className="title">{this.state.track.title}</span>
      </div>
    );
  }

}
