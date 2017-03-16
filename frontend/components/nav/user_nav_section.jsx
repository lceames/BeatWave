import React from 'react';
import Modal from 'react-modal';
import SessionFormContainer from '../session/session_form_container';
import { hashHistory } from 'react-router';

export default class UserNavSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      formType: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loginGuest = this.loginGuest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentUser || !this.props.userProfile) { return; }
    if (this.props.currentUser.id === nextProps.userProfile.id) {
      if (nextProps.userProfile.image !== this.props.userProfile.image) {
        this.props.currentUser.image = nextProps.userProfile.image;
      }
    }
  }

  openModal (formType) {
    this.setState({
      modalIsOpen: true,
      formType: formType
    });
  }

  handleLogout () {
    this.props.logout().then( () => hashHistory.push('/'));
  }

  loginGuest () {
    this.props.loginGuest().then( (user) => {
      window.currentUser = user;
      hashHistory.push('/stream');
    });
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }
  render () {
    if (this.props.loggedIn) {
      const currentUser = this.props.currentUser;
      return (
        <div className="nav-user-logged-in">
          <img src={this.props.currentUser.image} className="user-nav-thumb"/>
          <button className="user-show" onClick={() => hashHistory.push(`/${currentUser.id}`)}>{currentUser.username}</button>
          <button className="log-out" onClick={this.handleLogout}>Log Out</button>
        </div>
      )
    }

    return (
      <div className="nav-user-section">
        <button id="guest-account" onClick={this.loginGuest}>Guest account</button>
        <p>or</p>
        <button id="sign-in" onClick={() => this.openModal("login")}>Sign in</button>
        <p>or</p>
        <button id="create-account" onClick={() => this.openModal("sign up")}>Create account</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="auth modal"
          style={customStyles}
        >
          <SessionFormContainer closeModal={this.closeModal} formType={this.state.formType}/>

        </Modal>
      </div>
    )
  }
}


const customStyles = {
  content : {
    position: "static",
    border: "1px solid rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
    overflow: "auto",
    outline: "none",
    padding: "20px",
    width: "450px",
    height: "550px",
    margin: "80px auto",

    }
};
