import React from 'react';
import { connect } from 'react-redux';
import { updateElapsedTime, setCurrentTrack } from '../../actions/track_actions';

class Waveform extends React.Component {

    componentWillReceiveProps(nextProps) {
      this.paintWaveform.apply(this);
    }

    componentDidMount() {
      this.paintWaveform.apply(this);
    }

    paintWaveform() {
      const { track, currentTrack } = this.props;
      let peaks = this.props.track.peaks;
      let width = 2;
      let canvas = document.getElementById(`waveform-stream-${this.props.track.id}`);
      let ctx = canvas.getContext('2d');
      let x = 0;
      let y = 0;
      let trackPlaying = currentTrack && (currentTrack.track.id === track.id);
      let elapsedTime = this.props.elapsedTime;
      peaks.map( (peak, idx) => {
        let trackProgress = Math.floor(((idx)/peaks.length) * track.duration);
        if (elapsedTime > trackProgress) {
          ctx.fillStyle = "#f50";
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


    render () {
      if (this.props.type == "stream") {
        return <canvas onClick={this.handleClick.bind(this)} id={`waveform-stream-${this.props.track.id}`} width="600" height="90"></canvas>;
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
