import React from 'react';
import { hashHistory } from 'react-router';
import NavBar from './nav/navbar';
import StreamContainer from './stream/stream_container';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions/track_actions';
import SplashIndexItem from './splash_index_item';


class Splash extends React.Component {
  componentDidMount() {
    this.props.fetchTracks("splash");
  }

  render () {
    let tracks;
    if (this.props.tracks.length > 0) {
      tracks = this.props.tracks.map( track => {
        return <SplashIndexItem track={track} key={track.id}/>
      });
    }

    return (
      <div className="splash">
        <div className="header-section">
          <NavBar location={this.props.location.pathname}/>
          <img id="splash-header" src={window.images.splashHeader}/>
          <div className="splash-content">
            <h2>Hear what's trending on BeatWave</h2>
          </div>
        </div>
        <div className="splash-items">
          {tracks}
        </div>
      </div>
    )
  };
}


const mapStateToProps = state => {
  return {
    tracks: state.trackQueue.queue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTracks: (filter) => dispatch(fetchTracks(filter))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash)
