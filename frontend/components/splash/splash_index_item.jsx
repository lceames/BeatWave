import React from 'react';
import PlayPause from '../stream/play_pause';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const SplashIndexItem = props => {
  return (
    <div className="splash-index-item">
      <img src={props.track.image} className="track-image" onClick={ () => hashHistory.push(`/${props.track.userId}/${props.track.id}`)}/>
      <PlayPause track={props.track} type="splash" currentTrack={props.currentTrack} queue={props.queue}/>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    tracks: state.trackQueue.queue,
    currentTrack: state.trackQueue.currentTrack
  }
}
export default connect(
  mapStateToProps,
  null
)(SplashIndexItem);
