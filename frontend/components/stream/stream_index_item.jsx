import React from 'react';

export default class StreamIndexItem extends React.Component {
  constructor(props) {
    super();
  }

  render () {
    debugger
    return (
      <li key={this.props.track.id}>
        <h2>{this.props.track.title}</h2>
        <audio controls>
            <source src={this.props.track.url} type="audio/mpeg"></source>
        </audio>
      </li>
    )
  }
}
