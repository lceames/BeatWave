import React from 'react';
import SessionFormContainer from './session/session_form_container';
import UserNavSectionContainer from './nav/user_nav_section_container';
import NavBar from './nav/navbar.jsx';
import ProgressBarContainer from './progress_bar/progress_bar_container';

export default (props) => {
  let navBar = props.location.pathname === "/" ? "" : <NavBar location={props.location.pathname}/>
  return (
    <div className="app">
      {navBar}
      <ProgressBarContainer />
      { props.children }
    </div>
  )
}
