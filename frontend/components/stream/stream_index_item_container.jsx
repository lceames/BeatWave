import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTrack } from '../../actions/track_actions';
import StreamIndexItem from './stream_index_item';

const mapStateToProps = state => {
  return {
    queue: state.trackQueue.queue,
    currentTrack: state.trackQueue.currentTrack
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamIndexItem);
