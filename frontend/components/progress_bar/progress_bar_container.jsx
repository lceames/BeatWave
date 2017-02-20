import React from 'react';
import { connect } from 'react-redux';
import { handleRewind, setCurrentTrack, pauseCurrentTrack, updateElapsedTime, playCurrentTrack } from '../../actions/track_actions';
import ProgressBar from './progress_bar';

const mapStateToProps = state => {
  if (state.trackQueue.currentTrack) {
    let currentTrack = state.trackQueue.currentTrack;
    let queue = state.trackQueue.queue;
    return { currentTrack, queue };
  }
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem)),
    pauseCurrentTrack: () => dispatch(pauseCurrentTrack()),
    updateElapsedTime: () => dispatch(updateElapsedTime()),
    playCurrentTrack: () => dispatch(playCurrentTrack()),
    handleRewind: () => dispatch(handleRewind())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgressBar);
