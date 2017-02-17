import React from 'react';
import

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
    this.state = this.props.currentTrack;
  }

  componentDidMount() {
    setInterval(this.updateElapsedTime, 1000);
  }

  updateElapsedTime() {
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
    let playPause = this.props.currentTrack.paused ? "play" : "pause";
    return (
      <div className="progress-bar">
        <button className="rewind"></button>
        <button></button>
        <button></button>
      </div>
    );
  }

}
