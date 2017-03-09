import React from 'react';
import { connect } from 'react-redux';

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
      let peakInterval = Math.floor(peaks.length/170);
      let columnHeights = [];
      let sum = 0;
      for (let i = 0; i < peaks.length; i++) {
        sum += peaks[i];
        if (i % peakInterval === 0) {
          columnHeights.push(sum/peakInterval);
          sum = 0;
        }
      }

      let width = 2;
      let canvas = document.getElementById(`waveform-stream-${this.props.track.id}`);
      let ctx = canvas.getContext('2d');
      let x = 5;
      let y = 0;
      let trackPlaying = currentTrack && (currentTrack.track.id === track.id);
      let elapsedTime = this.props.elapsedTime;
      columnHeights.map( (columnHeight, idx) => {
        let trackProgress = Math.floor(((idx)/columnHeights.length) * track.duration);
        if (elapsedTime > trackProgress) {
          ctx.fillStyle = "#f50";
          ctx.fillRect(x, 90, 2, columnHeight * -60);
        }
        else {
          ctx.fillStyle = "#A6A4A4";
          ctx.fillRect(x, 90, 2, columnHeight * -60);
        }
        x += 3;
      });
    }


    render () {
      if (this.props.type == "stream") {
        return <canvas id={`waveform-stream-${this.props.track.id}`} width="700" height="90"></canvas>;
      }
      else {
        return <canvas className="canvas" width="2000" height="600" id="canvas"></canvas>;
      }

    }
};


const mapStateToProps = state => {
  return {
    currentTrack: state.trackQueue.currentTrack
  }
}


export default connect(
  mapStateToProps, null
)(Waveform);
