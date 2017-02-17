import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTrack } from '../../actions/track_actions';
import ProgressBar from './progress_bar';

const mapStateToProps = state => {
  let active;
  if (state.currentTrack) {
    active = true;
    currentTrack = state.trackQueue.currentTrack;
    queue = state.trackQueue.queue;
    return { active, currentTrack, queue };
  }
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
