import React from 'react';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
    this.handleRewind = this.handleRewind.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTrack) {
      setInterval(this.updateElapsedTime.bind(this), 1000);
      this.state = nextProps.currentTrack;
    }
  }

  handleRewind() {
  }
  //
  // playPause() {
  //   let trackEl = document.getElementById(this.state.currentTrack.track);
  //   trackEl.pause();
  // }

  updateElapsedTime() {
    if (!this.state) {
      return;
    }

    if (this.state.elapsedTime < this.props.currentTrack.duration) {
      this.setState({elapsedTime: this.state.elapsedTime + 1});
    }
    else {
      let queueIndex = this.props.currentTrack.queueIndex + 1;
      let track = this.props.queue[queueIndex];
      let audio = document.getElementById(track.id);
      let duration = Math.floor(audio.duration);
      let currentTrackItem = { queueIndex, duration, track };
      this.props.setCurrentTrack(currentTrackItem);
      audio.play();
    }
  }

  render () {
    let playPause;
    if (this.props.currentTrack) {
      let playPause = this.props.currentTrack.paused === false ? "play" : "pause";
    }
    else {
      return <div></div>
    }
    console.log(this.state.duration)
    let seconds = this.state.duration % 60;
    let minutes = Math.floor(this.state.duration / 60);

    return (
      <div className="progress-bar">
        <nav className="control-buttons">
          <i className="fa fa-step-backward fa-lg" aria-hidden="true"></i>
          <i className="fa fa-play fa-lg" aria-hidden="true"></i>
          <i className="fa fa-step-forward fa-lg" aria-hidden="true"></i>
        </nav>
        <span className="elapsed-time">{this.state.elapsedTime}</span>
        <span className="duration">{minutes}:{seconds}</span>
        <span className="title">{this.state.track.title}</span>
      </div>
    );
  }

}
