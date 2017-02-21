import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTrack, deleteTrack } from '../../actions/track_actions';
import StreamIndexItem from './stream_index_item';
import { createComment } from '../../actions/comment_actions';

const mapStateToProps = state => {
  return {
    queue: state.trackQueue.queue,
    currentTrack: state.trackQueue.currentTrack,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem)),
    deleteTrack: (id) => dispatch(deleteTrack(id)),
    createComment: (comment) => dispatch(createComment(comment))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamIndexItem);
