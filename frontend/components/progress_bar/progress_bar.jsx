import React from 'react';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
    this.handleRewind = this.handleRewind.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.state = { intervalId: null };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentTrack) {
      let id = setInterval(this.updateElapsedTime.bind(this), 1000);
      console.log(id);
      this.setState({intervalId: id});
      console.log("new interval");
      console.log(this.state.id);
      return;
    }
    if (this.props.currentTrack.track.id !== nextProps.currentTrack.track.id) {
      clearInterval(this.state.intervalId);
      console.log("change interval");
      this.setState({intervalId: setInterval(this.updateElapsedTime.bind(this), 1000)});
    }
  }

  handlePlay() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    let id = setInterval(this.updateElapsedTime.bind(this), 1000);
    this.setState({ intervalId: id });
    this.props.playCurrentTrack();
    audioTag.play();
  }

  handlePause() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    clearInterval(this.state.intervalId);
    this.props.pauseCurrentTrack();
    audioTag.pause();
  }

  handleRewind() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    audioTag.currentTime = 0;
    this.props.handleRewind();
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
    if (this.props.currentTrack.elapsedTime < this.props.currentTrack.duration) {
      this.props.updateElapsedTime();
    }
    else {
      this.handleNext();
    }
  }

  renderElapsedTime () {
    let audio = document.getElementById(this.props.currentTrack.track.id);
    let seconds = (this.props.currentTrack.elapsedTime % 60).toString();
    let minutes = Math.floor(this.props.currentTrack.elapsedTime / 60).toString();
    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  render () {
    const { currentTrack, queue } = this.props;
    if (!currentTrack) {return <div></div> }
    let playPause;
    if (currentTrack.paused) {
      playPause = <i className="fa fa-play fa-lg" aria-hidden="true" onClick={this.handlePlay}></i>
    }
    else {
      playPause = <i className="fa fa-pause fa-lg" aria-hidden="true" onClick={this.handlePause}></i>
    }

    let seconds = (currentTrack.duration % 60).toString();
    if (seconds.length === 1) { seconds = `0${seconds}`}
    let minutes = Math.floor(currentTrack.duration / 60)

    return (
      <div className="progress-bar">
        <nav className="control-buttons">
          <i className="fa fa-step-backward fa-lg" aria-hidden="true" onClick={this.handleRewind}></i>
          {playPause}
          <i className="fa fa-step-forward fa-lg" aria-hidden="true" onClick={this.handleNext}></i>
        </nav>
        <div className="bar-section">
          <span className="elapsed-time">{this.renderElapsedTime.apply(this)}</span>
          <progress className="bar" value={currentTrack.elapsedTime/currentTrack.duration}></progress>
          <span className="duration">{minutes}:{seconds}</span>
          </div>
        <span className="title">{currentTrack.track.title}</span>
      </div>
    );
  }

}
