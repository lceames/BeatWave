import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closePlaylistModal } from '../../actions/modal_actions';
import { createPlaylist, addToPlaylist } from '../../actions/playlist_actions';

class PlaylistModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "existing",
      title: ""
    };
  }

  playlistContent() {
    return this.state.type === "existing" ? this.existingContent() : this.newContent();
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("playlist[title]", this.state.title);
    this.props.createPlaylist(formData);
  }

  existingContent() {
    let userPlaylists = this.props.currentUser.playlists;
    if (userPlaylists.length === 0) {
      return <p>No playlists to add to yet :(</p>;
    }
    else {
      debugger
    }
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }


  newContent() {
    let playlists = this.props.playlists
    if (playlists instanceof Object && !(playlists instanceof Array)) {
      <div className="created-playlist">
        <img src={playlists.image} />
        <span></span>
      </div>
    }
    else if (playlists instance of Object && playlists instanceof Array) {
      return (<form className="new-playlist" onSubmit={this.handleSubmit.bind(this)}>
        <div className="title">
          <label>Playlist title</label>
          <input type="text" value={this.state.title} onChange={this.update('title')}/>
        </div>
        <input type="submit" value="Save"/>
      </form>)
    }
  }

  render() {
    let existingSelected = this.state.type == "existing" ? "selected" : "existing";
    let newSelected = this.state.type == "new" ? "selected" : "new";
    return (
      <Modal
        isOpen={!!this.props.open}
        onRequestClose={this.props.closePlaylistModal}
        contentLabel="playlist-modal"
        style={customStyles}
      >
      <div className="playlist-modal">
        <div className="headers">
          <h2 className={existingSelected} onClick={() => this.setState({type: "existing"})}>Add to playlist</h2>
          <h2 className={newSelected} onClick={() => this.setState({type: "new"})}>Create new playlist</h2>
        </div>
        <div className="content">
          {this.playlistContent()}
        </div>
      </div>
      </Modal>
    )
  }

}


const mapStateToProps = state => {
  return {
    open: state.modal.playlist,
    currentUser: state.session.currentUser,
    playlists: state.playlist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closePlaylistModal: () => dispatch(closePlaylistModal()),
    createPlaylist: playlist => dispatch(createPlaylist(playlist)),
    addToPlaylist: trackPlaylist => dispatch(addToPlaylist(trackPlaylist))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistModal)


const customStyles = {
  content : {
    position: "static",
    border: "1px solid rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
    overflow: "auto",
    outline: "none",
    padding: "0px",
    width: "550px",
    height: "200px",
    margin: "80px auto",

    }
};
