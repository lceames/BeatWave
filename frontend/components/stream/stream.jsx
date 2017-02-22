import React from 'react';
import {hashHistory} from 'react-router';
import StreamIndexItemContainer from './stream_index_item_container';

export default class Stream extends React.Component {
  componentDidMount() {
    this.props.fetchTracks("stream");
  }

  componentWillUnmount() {
    this.props.resetTracks();
  }

  render () {
    if (!this.props.tracks || this.props.tracks.length === 0) {
      return (<div></div>)
    }

    let tracks = this.props.tracks.map( (track) => {
      return <StreamIndexItemContainer track={track} key={track.id} />
    })

    return (
      <div className="stream content">
        {tracks}
      </div>
    )
  }
};
