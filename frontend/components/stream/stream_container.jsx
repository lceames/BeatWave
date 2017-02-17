import React from 'react';
import Stream from 'stream';

export const mapStateToProps = state => {
  return {
    tracks: state.trackQueue
  };
};

export const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
