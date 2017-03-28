import React from 'react';
import { connect } from 'react-redux';
import { updateElapsedTime, setCurrentTrack, setCommentTime } from '../../actions/track_actions';
import { formatTime } from '../../util/helper_functions';
import NewComment from '../stream/new_comment';
import Comment from '../stream/comment';

class Waveform extends React.Component {

    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleHover = this.handleHover.bind(this);
      this.resetHover = this.resetHover.bind(this);
      this.displayElapsedTime = this.displayElapsedTime.bind(this);
      this.queueComment = this.queueComment.bind(this);
      this.state = {
        hoverPoint: null,
        hoverTime: null,
        commentActive: false
      };
    }

    componentWillReceiveProps(nextProps) {
      this.paintWaveform.apply(this);
      if (this.props.track.comments.length !== nextProps.track.comments.length) {
        this.setState({ commentActive: false });
        this.props.setCommentTime(this.props.track.id, null);
      }
    }

    componentDidMount() {
      this.paintWaveform.apply(this);
    }

    paintWaveform() {
      const { track, currentTrack } = this.props;
      const hoverPoint = this.state.hoverPoint;
      let peaks = this.props.track.peaks;
      let mainCanvas = document.getElementById(`waveform-stream-${this.props.track.id}`);
      let mainCtx = mainCanvas.getContext('2d');
      let shadowCanvas = document.getElementById(`shadow-stream-${this.props.track.id}`);
      let shadowCtx = shadowCanvas.getContext('2d');
      let columnSize = this.props.type === "stream" ? 2 : 3;
      shadowCtx.fillStyle = "#d8d8d8";
      let x = 0;
      let y = 0;
      let trackPlaying = currentTrack && (currentTrack.track.id === track.id);
      let elapsedTime = track.elapsedTime;
      peaks.map( (peak, idx) => {
        let trackProgress = Math.floor(((idx)/peaks.length) * track.duration);
        if (elapsedTime > trackProgress) {
          mainCtx.fillStyle = "#f50";
          mainCtx.fillRect(x, 90, columnSize, peak * -600);
          shadowCtx.fillRect(x, 0, columnSize, peak * 250);
        }
        else if (hoverPoint && hoverPoint > trackProgress) {
          mainCtx.fillStyle = "#af5103";
          mainCtx.fillRect(x, 90, columnSize, peak * -600);
          shadowCtx.fillRect(x, 0, columnSize, peak * 250);
        }
        else {
          mainCtx.fillStyle = "#A6A4A4";
          mainCtx.fillRect(x, 90, columnSize, peak * -600);
          shadowCtx.fillRect(x, 0, columnSize, peak * 250);
        }
        x += (columnSize + 1);
      });
    }

    handleClick(e) {
      let track = this.props.track;
      if (track.active) {
        let canvasWidth = e.currentTarget.width;
        let diffX = (e.clientX - e.currentTarget.getBoundingClientRect().left);
        let trackPercentage = diffX/canvasWidth;
        let trackProgress = Math.round(trackPercentage * track.duration);
        this.props.updateElapsedTime(trackProgress);
      }
      else {
        let currentTrackItem = { track, elapsedTime: 0 };
        this.props.setCurrentTrack(currentTrackItem);
      }
    }

    handleHover(e) {
      let track = this.props.track;
      if (track.active) {
        let canvasWidth = e.currentTarget.width;
        let diffX = (e.clientX - e.currentTarget.getBoundingClientRect().left);
        let trackPercentage = diffX/canvasWidth;
        let trackProgress = Math.round(trackPercentage * track.duration);
        this.setState({
          hoverPoint: trackProgress,
          hoverTime: trackProgress
        });
      }
    }

    queueComment(e) {
      if (this.props.currentUser) {
        let track = this.props.track;
        let canvasWidth = e.currentTarget.width;
        let diffX = (e.clientX - e.currentTarget.getBoundingClientRect().left);
        let trackPercentage = diffX/canvasWidth;
        let trackProgress = Math.round(trackPercentage * track.duration);
        this.setState({ commentActive: true });
        this.props.setCommentTime(track.id, trackProgress);
      }
    }

    displayElapsedTime() {
      let time;
      if (this.state.hoverTime) {
        time = this.state.hoverTime;
      }
      else {
        time = this.props.track.elapsedTime;
      }
      return <p className="elapsed-time">{formatTime(time)}</p>
    }

    resetHover(e) {
      this.setState({hoverPoint: null, hoverTime: null});
    }

    render () {
      const { track, currentUser, type } = this.props
      let elapsedTime = track.active? this.displayElapsedTime() : <div></div>
      let duration = <p className="duration">{formatTime(track.duration)}</p>
      let newComment = this.state.commentActive && type == "stream" ? <NewComment track={track} time={track.commentTime}/> : ""
      let commentThumb = <div></div>
      let wavelength = this.props.type === "stream" ? 600 : 800;
      if (this.state.commentActive) {
        let proportion = track.commentTime/track.duration;
        commentThumb = (
          <div className="comment-thumb" style={{left: proportion * wavelength}} >
            <img src={currentUser.image} id={this.state.commentTime} />
          </div>
          )
      }

      let comments = track.comments.map( (comment) => {
        return <Comment comment={comment} type={this.props.type} key={comment.id}/>
      })
      if (document.getElementById(`waveform-stream-${this.props.track.id}`)) {
        this.paintWaveform.apply(this);
      }

      return (
        <div className="waveform">
          <canvas onClick={this.handleClick} id={`waveform-stream-${this.props.track.id}`}
            onMouseOver={this.handleHover} width={wavelength} height="90" onMouseMove={this.handleHover}
            onMouseLeave={this.resetHover}>
          </canvas>
          <canvas width={wavelength} height="50" id={`shadow-stream-${this.props.track.id}`}
            onClick={this.queueComment}>
          </canvas>
          {elapsedTime}
          {duration}
          {comments}
          {commentThumb}
          {newComment}
        </div>
      )
    }
};


const mapStateToProps = state => {
  return {
    currentTrack: state.trackQueue.currentTrack,
    queue: state.trackQueue.queue,
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateElapsedTime: (time) => dispatch(updateElapsedTime(time)),
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem)),
    setCommentTime: (trackId, time) => dispatch(setCommentTime(trackId, time))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waveform);
