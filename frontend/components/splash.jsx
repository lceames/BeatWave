import React from 'react';
import { hashHistory } from 'react-router';
import NavBar from './nav/navbar';
import StreamContainer from './stream/stream_container';

export default (props) => {
  return (
    <div className="splash">
      <div className="header-section">
        <NavBar location={props.location.pathname}/>
        <img id="splash-header" src={window.images.splashHeader}/>
      </div>
      <StreamContainer />
    </div>
  )
};
