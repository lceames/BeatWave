import React from 'react';
import Modal from 'react-modal';
import SessionFormContainer from '../session/session_form_container';

export default class UserNavSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      formType: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal (formType) {
    this.setState({
      modalIsOpen: true,
      formType: formType
    });
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }
  render () {
    if (this.props.loggedIn) {
      return (
        <div className="nav-user-section">
          <button onClick={this.props.logout}>Log Out</button>
        </div>
      )
    }

    return (
      <div className="nav-user-section">
        <button id="guest-account" onClick={this.props.loginGuest}>Guest Account</button>
        <p>or</p>
        <button id="sign-in" onClick={() => this.openModal("login")}>Sign In</button>
        <p>or</p>
        <button id="create-account" onClick={() => this.openModal("sign up")}>Create Account</button>
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
