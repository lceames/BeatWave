import React from 'react';
import { connect } from 'react-redux';

class Waveform extends React.Component {

    componentDidMount() {
      const { track, currentTrack } = this.props;
      if (this.props.type === "stream") {
        let peaks = this.props.track.peaks;
        let peakInterval = Math.floor(peaks.length/140);
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
        ctx.fillStyle = "#A6A4A4";
        let x = 5;
        let y = 0;
        columnHeights.map( (columnHeight) => {
          if (currentTrack && currentTrack.track.id)
          ctx.fillRect(x, 90, 3, columnHeight * -80);
          x += 4;
        });
      }
      // else {
      //   let peaks = catchingFeelings.left;
      //   let peakInterval = Math.floor(peaks.length/130);
      //   let averageHeights = [];
      //   let sum = 0;
      //   for (let i = 0; i < peaks.length; i++) {
      //     sum += peaks[i];
      //     if (i % peakInterval === 0) {
      //       averageHeights.push(sum/peakInterval);
      //       sum = 0;
      //     }
      //   }
      //
      //   let width = 2;
      //   let canvas = document.getElementById('canvas');
      //   canvas.fillStyle = "red";
      //   let ctx = canvas.getContext('2d');
      //   let x = 0;
      //   let y = 300;
      //   averageHeights.map( (averageHeight) => {
      //     ctx.fillRect(x, 200, 3, averageHeight * -100);
      //     x += 4;
      //   });
      // }
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
  debugger
  return {
    currentTrack: state.currentTrack
  }
}


export default connect(
  mapStateToProps, null
)(Waveform);
