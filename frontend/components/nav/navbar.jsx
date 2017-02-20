import React from 'react';
import UserNavSectionContainer from './user_nav_section_container';
import { hashHistory, Link } from 'react-router';
import { fetchTrack } from '../../actions/track_actions';

export default (props) => {
  window.fetchTrack = fetchTrack;
  let className = props.location === "/" ? "nav-bar nav-splash" : "nav-bar" ;
  let home = window.currentUser ? "/stream" : "/";
  let homeLink = props.location === "/" ? "" : <Link to={home} className="home">Home</Link>;
  let uploadButton = props.location === "/" ? "" : <button onClick={() => hashHistory.push("/upload")} id="upload">Upload</button>
  return (
    <nav className={className}>
      <div className="left-header-section">
        <button className="logo-background">
          <img id="logo" src={window.images.beatWaveLogo}/>
        </button>
        {homeLink}
      </div>
      <div className="right-header-section">
        {uploadButton}
        <UserNavSectionContainer />
      </div>
    </nav>
  )
};
