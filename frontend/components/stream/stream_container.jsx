import React from 'react';
import Stream from './stream';
import { fetchTracks } from '../../actions/track_actions';
import { connect } from 'react-redux';

export const mapStateToProps = state => {
  let queue = state.trackQueue;
  if (queue.length === 0) {
    queue = null;
  }

  return {
    tracks: queue
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchTracks: (filter) => dispatch(fetchTracks(filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
