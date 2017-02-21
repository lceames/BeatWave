import React from 'react';
import StreamIndexItemContainer from './stream/stream_index_item_container';

export default class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTracks('user-show', this.props.params.userId);
    this.props.fetchUser(this.props.params.userId);
  }

  render() {
    let tracks = this.props.tracks.map( (track) => {
      return <StreamIndexItemContainer track={track} key={track.id} type="show"/>
    });
    return (
      <div className="user-show-content">
        <div className="header">
          <img className="background" src={window.images.userHeader}/>
          <img className="profile-picture" src={this.props.user.image} />
          <h1>{this.props.user.username}</h1>
        </div>
        <div className="type">
          <h2>Tracks</h2>
        </div>
        <div className="tracks">
          {tracks}
        </div>
      </div>
    )
  }
}
