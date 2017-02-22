import React from 'react';
import Stream from './stream';
import { fetchTracks, resetTracks } from '../../actions/track_actions';
import { connect } from 'react-redux';
import { receiveUserProfile } from '../../actions/user_actions';

export const mapStateToProps = state => {
  return {
    tracks: state.trackQueue.queue,
    userProfile: state.userProfile
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchTracks: (filter) => dispatch(fetchTracks(filter)),
    receiveUserProfile: user => dispatch(receiveUserProfile(user)),
    resetTracks: () => dispatch(resetTracks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
