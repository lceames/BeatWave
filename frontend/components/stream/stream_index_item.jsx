import React from 'react';
import { Link, hashHistory } from 'react-router';
import Comment from './comment';
import PlayPause from './play_pause';
import NewComment from './new_comment';
import Waveform from '../waveform/waveform';
import { formatTime } from '../../util/helper_functions';

export default class StreamIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteTrack(this.props.track.id);
  }

  render () {
    const { track, queue, currentTrack, currentUser } = this.props;
    let deleteTrack = <div></div>;
    let poster = "";

    if (currentUser && currentUser.id === track.userId) {
      deleteTrack = <i onClick={this.handleDelete} className="fa fa-trash-o" aria-hidden="true"></i>
    }

    if (!this.props.type) {
      poster = (
        <p className="stream-item-author"><Link to={`/${track.userId}`} className="author-link">{track.author} </Link>
        posted <Link className="author-link" to={`/${track.userId}/${track.id}`}>a track</Link></p>
      )
    }

    return (
      <li className="stream-index-item">
        <div className="poster-info">
          <Link to={`/${track.userId}`} className="author-link"><img src={track.authorImage} className="user-nav-thumb"/></Link>
          {poster}
        </div>
        <div className="stream-item-content">
          <img src={track.image} className="track-image" onClick={ () => hashHistory.push(`/${track.userId}/${track.id}`)}/>
          <PlayPause track={track} currentTrack={currentTrack} queue={queue}/>
          <div className="right-track-section">
            <Link className="track-title" to={`/${track.userId}/${track.id}`}>{track.title}</Link>
              <Waveform track={track} type="stream"/>
            {deleteTrack}
          </div>
        </div>
      </li>
    )
  }
}
