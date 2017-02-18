import React from 'react';

export default class StreamIndexItem extends React.Component {
  constructor(props) {
    super();
    this.setCurrentTrack = this.setCurrentTrack.bind(this);
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
    let audio = document.getElementById(this.props.track.id);
    let duration = Math.floor(audio.duration);
    let queueIndex = this.props.queue.findIndex((el) => el === this.props.track);
    let track = this.props.track;
    let currentTrackItem = { queueIndex, duration, track };
    this.props.setCurrentTrack(currentTrackItem);
    audio.play();
  }

  render () {
    return (
      <li>
        <h2>{this.props.track.title}</h2>
        <h3>{this.props.track.id}</h3>
        <audio id={this.props.track.id} >
            <source src={this.props.track.url} type="audio/mpeg"></source>
        </audio>
        <button onClick={ this.setCurrentTrack }>Play</button>
      </li>
    )
  }
}
