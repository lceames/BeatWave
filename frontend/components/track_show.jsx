import React from 'react';
import StreamIndexItemContainer from './stream/stream_index_item_container';
import Comment from './stream/comment';
import NewComment from './stream/new_comment';
import PlayPause from './stream/play_pause';
import Waveform from './waveform/waveform';

export default class TrackShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      trackLoaded: false,
      userLoaded: false
    };

    this.setCurrentTrack = this.setCurrentTrack.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrackShow(this.props.params.trackId).then( () => {
      this.setState({trackLoaded: true});
    });
    this.props.fetchUser(this.props.params.userId).then( () => {
      this.setState({userLoaded: true});
    });
  }

  handlePause() {
    let audioTag = document.getElementById(this.props.track[0].id);
    this.props.pauseCurrentTrack();
    audioTag.pause();
  }

  handlePlay() {
    let audioTag = document.getElementById(this.props.track[0].id);
    this.props.playCurrentTrack();
    audioTag.play();
  }

  setCurrentTrack(e) {
    if (this.props.currentTrack && this.props.currentTrack.id === this.props.track.id && this.props.currentTrack.paused) {
      this.handlePlay();
    }
    else {
      let track = this.props.track[0];
      let currentTrackItem = { queueIndex: 0, track };
      this.props.setCurrentTrack(currentTrackItem);
    }
  }

  render() {
    const currentTrack = this.props.currentTrack;
    const track = this.props.track[0];

    if (this.props.track.length === 0 || !this.state.trackLoaded || !this.state.userLoaded) {
      return <div className="loader"></div>
    }

    if (this.props.track.length === 0) {
      return <canvas id='canvas' width="645" height="40" ></canvas>
    }

    let comments = track.comments.map( (comment) => {
      return <Comment comment={comment} key={comment.id}/>
    })

    return (
      <div className="track-show-content">
        <div className="header">
          <img className="background" src={window.images.userHeader}/>
          <img className="track-thumb" src={this.props.track[0].image} />
          <PlayPause type="track-show" track={track}/>
          <div className="track-info">
            <h2>{track.title}</h2>
            <h1>{track.author}</h1>
          </div>
          <Waveform track={track} type="stream"/>
        </div>
        <div className="track-content">
          <NewComment track={track} time={0}/>
          <div className="track-details">
            <div className="user-info">
              <img src={this.props.userProfile.image} className="user-thumb" />
              <h3 className="username">{this.props.userProfile.username}</h3>
            </div>
            <div className="vertical-box">
              <p className="description">{track.description}</p>
              <div className="comments">
                {comments}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
