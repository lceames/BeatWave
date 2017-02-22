import React from 'react';
import { fetchTracks, resetTracks } from '../actions/track_actions';
import UserShow from './user_show';
import { connect } from 'react-redux';
import { fetchUser, updateUserImage } from '../actions/user_actions';

const mapStateToProps = state => {
  return {
    tracks: state.trackQueue.queue,
    userProfile: state.userProfile,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTracks: (type, id) => dispatch(fetchTracks(type, id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateUserImage: (user, id) => dispatch(updateUserImage(user, id)),
    resetTracks: () => dispatch(resetTracks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
