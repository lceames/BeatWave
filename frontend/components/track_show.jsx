import React from 'react';
import StreamIndexItemContainer from './stream/stream_index_item_container';
import Comment from './stream/comment';

export default class TrackShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null
    };

    this.setCurrentTrack = this.setCurrentTrack.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrackShow(this.props.params.trackId);
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillUnmount() {
    this.props.resetTracks();
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
      debugger
      this.props.setCurrentTrack(currentTrackItem);
    }
  }


  render() {
    const currentTrack = this.props.currentTrack;
    const track = this.props.track[0];

    if (this.props.track.length === 0) {
      return <div></div>
    }
    let playPause;

    if (!currentTrack || track.id !== currentTrack.track.id || currentTrack.paused === true) {
      playPause =
        <i className="fa fa-play-circle fa-5x" aria-hidden="true" onClick={this.setCurrentTrack}></i>
    }
    else {
      playPause = <i className="fa fa-pause-circle fa-5x" aria-hidden="true" onClick={this.handlePause}></i>
    }

    let comments = track.comments.map( (comment) => {
      return <Comment comment={comment} key={comment.id}/>
    })

    return (
      <div className="track-show-content">
        <div className="header">
          <img className="background" src={window.images.userHeader}/>
          <img className="track-thumb" src={this.props.track[0].image} />
          {playPause}
          <div className="track-info">
            <h2>{track.title}</h2>
            <h1>{track.author}</h1>
          </div>
        </div>
        <div className="track-content">
          <div className="new-comment">
          {/*  <img src={window.currentUser.image}/> */}
            <form>
              <input type="text" placeholder="Write a comment" className="comment-text"
              onKeyUp={this.handleChange} value={this.state.body}
              />
            </form>
          </div>
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
