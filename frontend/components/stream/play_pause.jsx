import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTrack, pauseCurrentTrack, playCurrentTrack } from '../../actions/track_actions';

class PlayPause extends React.Component {

  constructor(props) {
    super(props);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.setCurrentTrack = this.setCurrentTrack.bind(this);
  }

  handlePause() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    this.props.pauseCurrentTrack();
    audioTag.pause();
  }

  handlePlay() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    this.props.playCurrentTrack();
    audioTag.play();
  }

  setCurrentTrack(e) {
    if (this.props.currentTrack && this.props.currentTrack.id === this.props.track.id && this.props.currentTrack.paused) {
      this.handlePlay();
    }
    else {
      let lastTrackId;
      let lastTrackAudio;
      let queueIndex = this.props.queue.findIndex((el) => el === this.props.track);
      let track = this.props.track;
      let currentTrackItem = { queueIndex, track };
      this.props.setCurrentTrack(currentTrackItem);
    }
  }

  render () {
    const currentTrack = this.props.currentTrack;
    const track = this.props.track;
    const size = this.props.type ? "fa-5x" : "fa-3x";
    debugger

    if (!currentTrack || track.id !== currentTrack.track.id || currentTrack.paused === true) {
      return (
        <div className="play-pause">
          <i className={`fa fa-play-circle ${size}`} aria-hidden="true" onClick={this.setCurrentTrack}></i>
        </div>
      )
    }
    else {
      return (
        <div className="play-pause">
          <i className={`fa fa-pause-circle ${size}`} aria-hidden="true" onClick={this.handlePause}></i>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    queue: state.trackQueue.queue,
    currentTrack: state.trackQueue.currentTrack,
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem)),
    pauseCurrentTrack: () => dispatch(pauseCurrentTrack()),
    playCurrentTrack: () => dispatch(playCurrentTrack())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPause);
