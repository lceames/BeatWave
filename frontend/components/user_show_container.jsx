import React from 'react';
import { fetchTracks } from '../actions/track_actions';
import UserShow from './user_show';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/user_actions';

const mapStateToProps = state => {
  return {
    tracks: state.trackQueue.queue,
    user: state.userProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTracks: (type, id) => dispatch(fetchTracks(type, id)),
    fetchUser: (id) => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
