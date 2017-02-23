import React from 'react';
import TrackShow from './track_show';
import { connect } from 'react-redux';
import { playCurrentTrack, fetchTrackShow, resetTracks, setCurrentTrack, pauseCurrentTrack } from '../actions/track_actions';
import { fetchUser } from '../actions/user_actions';

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    track: state.trackQueue.queue,
    currentTrack: state.trackQueue.currentTrack
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrackShow: (id) => dispatch(fetchTrackShow(id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    resetTracks: () => dispatch(resetTracks()),
    setCurrentTrack: (item) => dispatch(setCurrentTrack(item)),
    pauseCurrentTrack: () => dispatch(pauseCurrentTrack()),
    playCurrentTrack: () => dispatch(playCurrentTrack())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackShow);
