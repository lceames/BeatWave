import React from 'react';


export default class Upload extends React.Component {

  componentDidMount() {
    this.props.fetchTrack(1);
  }

  render() {
    return (
      <div className="upload content">
        <nav id="upload-form">
          <h3>Upload to BeatWave</h3>
          <button>Choose a file to upload</button>
        </nav>
      </div>
    )
  }
};
