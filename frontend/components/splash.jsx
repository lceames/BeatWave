import React from 'react';
import { hashHistory } from 'react-router';

export default (props) => {
  return (
    <div className="splash">
      <nav className="splash-nav">
        <button className="logo-background">
          <img id="logo" src={window.images.beatWaveLogo}/>
        </button>
      </nav>
      <img id="splash-header" src={window.images.splashHeader}/>
      <h1>Splash</h1>
    </div>
  )
};
