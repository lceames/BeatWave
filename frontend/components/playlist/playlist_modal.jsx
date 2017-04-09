import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closePlaylistModal } from '../../actions/modal_actions';

class PlaylistModal extends React.Component {

  render() {
    return (
      <Modal
        isOpen={!!this.props.open}
        onRequestClose={this.props.closePlaylistModal}
        contentLabel="auth modal"
        style={customStyles}
      >
      </Modal>
    )
  }

}


const mapStateToProps = state => {
  return {
    open: state.modal.playlist
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
