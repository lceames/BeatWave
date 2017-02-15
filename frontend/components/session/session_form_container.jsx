import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { createUser, login, resetErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.session.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) => dispatch(createUser(user)),
    login: (user) => dispatch(login(user)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
