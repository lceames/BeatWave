import React from 'react';
import UserNavSectionContainer from './user_nav_section_container';
import { hashHistory } from 'react-router';
import { fetchTrack } from '../../actions/track_actions';

export default (props) => {
  window.fetchTrack = fetchTrack;
  let className = props.location === "/" ? "nav-bar nav-splash" : "nav-bar" ;
  return (
    <nav className={className}>
      <img id="logo" src={window.images.beatWaveLogo}/>

      <button onClick={() => hashHistory.push("/upload")} id="upload">Upload</button>
      <UserNavSectionContainer />
    </nav>
  )
};
