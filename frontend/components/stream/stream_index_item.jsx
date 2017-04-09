import React from 'react';
import { Link, hashHistory } from 'react-router';
import Comment from './comment';
import PlayPause from './play_pause';
import NewComment from './new_comment';
import Waveform from '../waveform/waveform';
import { formatTime } from '../../util/helper_functions';
import PlaylistModal from '../playlist/playlist_modal';

export default class StreamIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  openPlaylistModal() {
    this.props.openPlaylistModal(this.props.track.id);
  }

  handleDelete() {
    this.props.deleteTrack(this.props.track.id);
  }

  render () {
    const { track, queue, currentTrack, currentUser } = this.props;
    let deleteTrack = <div></div>;
    let poster = "";
    let posterThumb = "";

    if (currentUser && currentUser.id === track.userId) {
      deleteTrack = <i onClick={this.handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
    }

    if (!this.props.type) {
      poster = (
        <p className="stream-item-author"><Link to={`/${track.userId}`} className="author-link">{track.author} </Link>
        posted <Link className="author-link" to={`/${track.userId}/${track.id}`}>a track</Link></p>
      )
      posterThumb = (
        <Link to={`/${track.userId}`} className="author-link"><img src={track.authorImage} className="user-nav-thumb"/></Link>
      )
    }

    return (
      <li className="stream-index-item">
        <div className="poster-info">
          {posterThumb}
          {poster}
        </div>
        <div className="stream-item-content">
          <img src={track.image} className="track-image" onClick={ () => hashHistory.push(`/${track.userId}/${track.id}`)}/>
          <PlayPause track={track} currentTrack={currentTrack} queue={queue}/>
          <div className="right-track-section">
            <Link className="track-title" to={`/${track.userId}/${track.id}`}>{track.title}</Link>
              <Waveform track={track} type="stream"/>
            <div className="icons">
              {deleteTrack}
              <div onClick={() => this.props.openPlaylistModal(track.id)} className="playlist-dropdown">
                <p>Add to playlist</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
