import React from 'react';
import { createTrack } from '../../actions/track_actions';
import Upload from './upload';
import { connect } from 'react-redux';

const mapStateToProps = state => {
};

const mapDispatchToProps = dispatch => {
  return {
    createTrack: (data) => dispatch(createTrack(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Upload);
