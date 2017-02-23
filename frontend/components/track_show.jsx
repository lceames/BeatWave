import React from 'react';
import StreamIndexItemContainer from './stream/stream_index_item_container';

export default class TrackShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null
    };
  }

  componentDidMount() {
    this.props.fetchTrackShow(this.props.params.trackId);
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillUnmount() {
    this.props.resetTracks();
  }

  handlePause() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    this.props.pauseCurrentTrack();
    audioTag.pause();
  }

  handlePlay() {
    let audioTag = document.getElementById(this.props.currentTrack.track.id);
    this.props.playCurrentTrack();
    audioTag.play();
  }

  render() {
    const currentTrack = this.props.currentTrack;
    const track = this.props.track;

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
          <h2>{this.props.track.author}</h2>
          <h1>{this.props.track.title}</h1>
            <div className="right-track-section">
              <div className="comments">
                {comments}
              </div>
              {deleteTrack}
              <div className="new-comment">
              {/*  <img src={window.currentUser.image}/> */}
                <form>
                  <input type="text" placeholder="Write a comment" className="comment-text"
                  onKeyUp={this.handleChange} value={this.state.body}
                  />
                </form>
              </div>
            </div>
        </div>
      </div>
    )
  }

}
