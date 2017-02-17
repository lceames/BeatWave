import React from 'react';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
    this.state = {
      
    };
  }

  componentWillReceiveProps(nextProps) {
    debugger
    if (nextProps.currentTrack) {
      setInterval(this.updateElapsedTime.bind(this), 1000);
    }
  }

  updateElapsedTime() {
    debugger
    let time = this.state.elapsedTime;
    if (time < this.props.currentTrack.duration) {
      this.setState({elapsedTime: time + 1});
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
    return (
      <div className="progress-bar">
        <button className="rewind"></button>
        <button className={playPause}></button>
        <button className="fast-forward"></button>
        <p>{this.state.currentTrack.elapsedTime}</p>
        <p>{this.state.currentTrack.duration}</p>
        <p>{this.state.currentTrack.track.title}</p>
      </div>
    );
  }

}
