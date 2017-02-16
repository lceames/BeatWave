import React from 'react';
import { hashHistory } from 'react-router';

export default (props) => {
  return (
    <div className="splash">
      <img id="splash-header" src={window.images.splashHeader}/>
      <h1>Splash</h1>
    </div>
  )
};
