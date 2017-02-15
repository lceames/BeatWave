import React from 'react';
import Modal from 'react-modal';
import SessionFormContainer from './session/session_form_container';
import UserNavSectionContainer from './nav/user_nav_section_container';

export default class App extends React.Component {
  // constructor () {
  //   super();
  //   this.state = {
  //     modalIsOpen: false,
  //     formType: ""
  //   };
  //
  //   this.openModal = this.openModal.bind(this);
  //   this.closeModal = this.closeModal.bind(this);
  // }
  //
  // openModal (formType) {
  //   this.setState({
  //     modalIsOpen: true,
  //     formType: formType
  //   });
  // }
  //
  // closeModal () {
  //   this.setState({modalIsOpen: false});
  // }

  render () {

    return (
      <div>
        <h1>Welcome To BeatWave!!!!</h1>
        <UserNavSectionContainer />
      </div>

    )
  }
};
