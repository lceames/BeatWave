import React from 'react';
import UserNavSectionContainer from './user_nav_section_container';
import { hashHistory, Link } from 'react-router';
import { fetchTrack } from '../../actions/track_actions';

export default (props) => {
  window.fetchTrack = fetchTrack;
  let className = props.location === "/" ? "nav-bar nav-splash" : "nav-bar" ;
  let home = window.currentUser ? "/stream" : "/";
  return (
    <nav className={className}>
      <div className="left-header-section">
        <button className="logo-background">
          <img id="logo" src={window.images.beatWaveLogo}/>
        </button>
        <Link to={home} className="home">Home</Link>
      </div>
      <div className="right-header-section">
        <button onClick={() => hashHistory.push("/upload")} id="upload">Upload</button>
        <UserNavSectionContainer />
      </div>
    </nav>
  )
};
