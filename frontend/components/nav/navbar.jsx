import React from 'react';
import UserNavSectionContainer from './user_nav_section_container';

export default () => {
  return (
    <nav className="nav-bar">
      <img id="logo" src={window.images.beatWaveLogo}/>
      <UserNavSectionContainer />
    </nav>
  )
};
