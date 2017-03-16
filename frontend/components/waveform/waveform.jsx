import React from 'react';
import { connect } from 'react-redux';
import { updateElapsedTime, setCurrentTrack } from '../../actions/track_actions';
import { formatTime } from '../../util/helper_functions';

class Waveform extends React.Component {

    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleHover = this.handleHover.bind(this);
      this.resetHover = this.resetHover.bind(this);
      this.displayElapsedTime = this.displayElapsedTime.bind(this);
      this.state = {
        hoverPoint: null,
        hoverTime: null
      };
    }

    componentWillReceiveProps(nextProps) {
      this.paintWaveform.apply(this);
    }

    componentDidMount() {
      this.paintWaveform.apply(this);
    }

    paintWaveform() {
      const { track, currentTrack } = this.props;
      const hoverPoint = this.state.hoverPoint;
      let peaks = this.props.track.peaks;
      let canvas = document.getElementById(`waveform-stream-${this.props.track.id}`);
      let ctx = canvas.getContext('2d');
      let x = 0;
      let y = 0;
      let trackPlaying = currentTrack && (currentTrack.track.id === track.id);
      let elapsedTime = track.elapsedTime;
      peaks.map( (peak, idx) => {
        let trackProgress = Math.floor(((idx)/peaks.length) * track.duration);
        if (elapsedTime > trackProgress) {
          ctx.fillStyle = "#f50";
          ctx.fillRect(x, 90, 2, peak * -600);
        }
        else if (hoverPoint && hoverPoint > trackProgress) {
          ctx.fillStyle = "#af5103";
          ctx.fillRect(x, 90, 2, peak * -600);
        }
        else {
          ctx.fillStyle = "#A6A4A4";
          ctx.fillRect(x, 90, 2, peak * -600);
        }
        x += 3;
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

    displayElapsedTime() {
      let time;
      if (this.state.hoverTime) {
        debugger
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
      if (this.props.type == "stream") {
        let elapsedTime = this.props.track.active? this.displayElapsedTime() : <div></div>
        let duration = <p className="duration">{formatTime(this.props.track.duration)}</p>
        return (
          <div className="waveform">
            <canvas onClick={this.handleClick} id={`waveform-stream-${this.props.track.id}`}
              onMouseOver={this.handleHover} width="600" height="90" onMouseMove={this.handleHover}
              onMouseLeave={this.resetHover}>
            </canvas>;
            {elapsedTime}
            {duration}
          </div>
        )
      }
      else {
        return <canvas className="canvas" width="2000" height="600" id="canvas"></canvas>;
      }

    }
};


const mapStateToProps = state => {
  return {
    currentTrack: state.trackQueue.currentTrack,
    queue: state.trackQueue.queue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateElapsedTime: (time) => dispatch(updateElapsedTime(time)),
    setCurrentTrack: (currentTrackItem) => dispatch(setCurrentTrack(currentTrackItem))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waveform);
