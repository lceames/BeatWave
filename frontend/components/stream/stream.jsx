import React from 'react';
import {hashHistory} from 'react-router';
import StreamIndexItemContainer from './stream_index_item_container';

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
      return <StreamIndexItemContainer track={track} key={track.id} />
    })

    return (
      <div className="stream content">
        {tracks}
      </div>
    )
  }
};
