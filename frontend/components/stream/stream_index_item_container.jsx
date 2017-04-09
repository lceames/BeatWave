import React from 'react';
import { connect } from 'react-redux';
import { setCurrentTrack, deleteTrack, pauseCurrentTrack, playCurrentTrack } from '../../actions/track_actions';
import StreamIndexItem from './stream_index_item';
import { createComment } from '../../actions/comment_actions';
import { openPlaylistModal } from '../../actions/modal_actions';

const mapStateToProps = state => {
  return {
    queue: state.trackQueue.queue,
    currentTrack: state.trackQueue.currentTrack,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem)),
    deleteTrack: (id) => dispatch(deleteTrack(id)),
    createComment: (comment) => dispatch(createComment(comment)),
    pauseCurrentTrack: () => dispatch(pauseCurrentTrack()),
    playCurrentTrack: () => dispatch(playCurrentTrack()),
    openPlaylistModal: (trackId) => dispatch(openPlaylistModal(trackId))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamIndexItem);
