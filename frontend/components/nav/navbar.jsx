import React from 'react';
import UserNavSectionContainer from './user_nav_section_container';

export default (props) => {
  let className = props.location === "/" ? "nav-bar splash" : "nav-bar" ;
  debugger
  return (
    <nav className={className}>
      <img id="logo" src={window.images.beatWaveLogo}/>
      <UserNavSectionContainer />
    </nav>
  )
};
