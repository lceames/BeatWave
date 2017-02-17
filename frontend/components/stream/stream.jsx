import React from 'react';
import {hashHistory} from 'react-router';
import StreamIndexItem from './stream_index_item';

export default class Stream extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTracks("stream");
  }

  render () {
    if (!this.props.tracks) {
      return (<div></div>)
    }

    let tracks = this.props.tracks.map( (track) => {
      return <StreamIndexItem track={track} key={track.id} />
    })
    debugger

    return (
      <div className="stream content">
        {tracks}
      </div>
    )
  }
};
