import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTrack } from '../../actions/track_actions';
import ProgressBar from './progress_bar';

const mapStateToProps = state => {
  if (state.trackQueue.currentTrack) {
    let active = true;
    let currentTrack = state.trackQueue.currentTrack;
    let queue = state.trackQueue.queue;
    return { active, currentTrack, queue };
  }
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgressBar);
