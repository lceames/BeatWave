import React from 'react';
import { connect } from 'react-redux';
import UserNavSection from './user_nav_section';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  let loggedIn = state.session.currentUser ? true : false;
  let currentUser = state.session.currentUser;
  return { loggedIn, currentUser };
};

const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch(logout()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserNavSection);
