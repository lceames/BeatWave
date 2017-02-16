import React from 'react';
import Modal from 'react-modal';
import SessionFormContainer from './session/session_form_container';
import UserNavSectionContainer from './nav/user_nav_section_container';
import NavBar from './nav/navbar.jsx';

export default ({children}) => {
  return (
    <div>
      <NavBar />
      { children }
    </div>
  )
}
