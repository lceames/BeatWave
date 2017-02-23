import React from 'react';
import StreamIndexItemContainer from './stream/stream_index_item_container';
import Modal from 'react-modal';

export default class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      modalIsOpen: false
    };
    this.handleProfileImage = this.handleProfileImage.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.params.userId);
    this.props.fetchTracks('user-show', this.props.params.userId);
  }

  // componentWillUnmount() {
  //   this.props.resetTracks();
  // }

  handleProfileImage (e) {
    let file = e.currentTarget.files[0];
    if (file) {
      this.setState({imageFile: file});
    }
    let formData = new FormData();
    formData.append("user[image]", file);
    this.props.updateUserImage(formData, this.props.params.userId);
  }

  render() {
    let tracks = this.props.tracks.map( (track) => {
      return <StreamIndexItemContainer track={track} key={track.id} type="show"/>
    });
    let updateUserImage = "";

    if (this.props.currentUser.id === parseInt(this.props.params.userId)) {
      updateUserImage =
        <label className="update-profile-image">Update image
          <input type="file" className="upload-image" onChange={this.handleProfileImage}></input>
        </label>
    }

    if (!this.props.userProfile || this.props.userProfile.id !== parseInt(this.props.params.userId)) {
      return <div></div>
    }

    return (
      <div className="user-show-content">
        <div className="header">
          <img className="background" src={window.images.userHeader}/>
          <img className="profile-picture" src={this.props.userProfile.image} />
          <h1>{this.props.userProfile.username}</h1>
          {updateUserImage}
        </div>
        <div className="type">
          <h2>Tracks</h2>
        </div>
          <div className="stream-content">
              {tracks}
          </div>
      </div>
    )
  }
}
