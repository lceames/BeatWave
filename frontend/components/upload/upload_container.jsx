import React from 'react';
import { fetchTrack } from '../../actions/track_actions';
import Upload from './upload';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    track: state.trackQueue[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrack: (id) => dispatch(fetchTrack(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
