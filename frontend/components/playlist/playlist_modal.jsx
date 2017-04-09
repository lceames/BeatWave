import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closePlaylistModal } from '../../actions/modal_actions';

class PlaylistModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "existing"
    };
  }

  playlistContent() {
    return this.state.type === "existing" ? this.existingContent() : this.newContent();
  }

  existingContent() {
    let userPlaylists = this.props.currentUser.playlists;
    debugger
    if (userPlaylists.length === 0) {
      return <p>No playlists to add to yet :(</p>;
    }
    else {
      debugger
    }
  }

  newContent() {

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
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closePlaylistModal: () => dispatch(closePlaylistModal())
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
