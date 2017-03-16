import React from 'react';
import { createTrack } from '../../actions/track_actions';
import { startLoading } from '../../actions/loading_actions';
import Upload from './upload';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    loading: state.loading.state,
    errors: state.loading.errors
   };
};

const mapDispatchToProps = dispatch => {
  return {
    createTrack: (data) => dispatch(createTrack(data)),
    startLoading: () => dispatch(startLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
