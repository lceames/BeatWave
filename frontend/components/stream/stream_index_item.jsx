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
    const { track, queue, currentTrack } = this.props;
    let playPause;
    if (!currentTrack || track.id !== currentTrack.track.id || currentTrack.paused === true) {
      playPause = <i className="fa fa-play-circle fa-3x" aria-hidden="true" onClick={this.setCurrentTrack}></i>
    }
    else {
      playPause = <i className="fa fa-pause-circle fa-3x" aria-hidden="true" onClick={this.setCurrentTrack}></i>
    }
    return (
      <li className="stream-index-item">
        <img src={track.image} className="track-image"/>
        {playPause}
        <h2 className="track-title">{track.title}</h2>
        <audio id={track.id} >
            <source src={track.url} type="audio/mpeg"></source>
        </audio>
      </li>
    )
  }
}
