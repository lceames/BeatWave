import React from 'react';
import Modal from 'react-modal';


export default class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: "",
      description: "",
      modalIsOpen: false
    };

    this.handleFile = this.handleFile.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrack(1);
  }

  handleFile (e) {
    let file = e.currentTarget.files[0];
    if (file) {
      this.openModal();
    }
  }

  handleSubmit () {
  }

  openModal () {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }

  render () {
    return (
      <div className="upload content">
        <nav id="upload-form">
          <h3>Upload to BeatWave</h3>
          <label>Choose a file to upload
            <input type='file' onChange={this.handleFile}></input>
          </label>
        </nav>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="upload-modal"
          style={customStyles}
        >
        <h1>Upload Track</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.title} placeholder="Title"/>
          <input type='text' value={this.state.title}placeholder="Description"/>
          <input type='submit' />
        </form>
        </Modal>
      </div>
    )
  }
};

const customStyles = {
  content : {
    position: "static",
    border: "1px solid rgb(204, 204, 204)",
    background: "rgb(255, 255, 255)",
    overflow: "auto",
    outline: "none",
    padding: "20px",
    width: "450px",
    height: "550px",
    margin: "80px auto",

    }
};
