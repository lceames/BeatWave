import React from 'react';
import StreamIndexItemContainer from './stream/stream_index_item_container';
import Comment from './stream/comment';
import NewComment from './stream/new_comment';
import PlayPause from './stream/play_pause';

export default class TrackShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };

    this.setCurrentTrack = this.setCurrentTrack.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrackShow(this.props.params.trackId);
    this.props.fetchUser(this.props.params.userId);
  }

  // componentWillUnmount() {
  //   this.props.resetTracks();
  // }

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

  handleSubmit(e) {
    e.preventDefault();
    let elapsedTime = this.props.currentTrack ? this.props.currentTrack.elapsedTime : 0;
    let comment = Object.assign({}, this.state);
    comment["track_id"] = this.props.track.id;
    comment["elapsed_time"] = elapsedTime;
    this.props.createComment(comment).then( () => this.setState({body: ""}));
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

  handleChange(e) {
    this.setState({body: e.target.value});
  }

  render() {
    const currentTrack = this.props.currentTrack;
    const track = this.props.track[0];

    if (this.props.track.length === 0) {
      return <div></div>
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
        </div>
        <div className="track-content">
          <NewComment />
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
