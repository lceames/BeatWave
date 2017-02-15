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
      return <button onClick={this.props.logout}>Log Out</button>
    }

    return (
      <nav>
        <button onClick={() => this.openModal("login")}>Sign In</button>
        <button onClick={() => this.openModal("sign up")}>Sign Up</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <SessionFormContainer formType={this.state.formType}/>

        </Modal>
      </nav>
    )
  }
}
