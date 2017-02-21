import React from 'react';
import Modal from 'react-modal';

export default class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      audioFile: null,
      imageFile: null,
      modalIsOpen: false
    };

    this.handleFile = this.handleFile.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleThumb = this.handleThumb.bind(this);
  }

  handleFile (e) {
    let file = e.currentTarget.files[0];
    if (file) {
      this.setState({audioFile: file});
      this.openModal();
    }
  }

  handleThumb (e) {
    let file = e.currentTarget.files[0];
    if (file) {
      this.setState({imageFile: file});
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    formData.append("track[audio]", this.state.audioFile);
    formData.append("track[image]", this.state.imageFile);
    this.props.createTrack(formData);
  }

  openModal () {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal () {
    this.setState({modalIsOpen: false});
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  render () {
    return (
      <div className="upload-content">
        <nav className="upload-form">
          <h3>Upload to BeatWave</h3>
          <label className="custom-file-input">Choose a file to upload
            <input className="upload-track" type='file' onChange={this.handleFile}></input>
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
          <input type='text' value={this.state.title} placeholder="Title" onChange={this.update('title')}/>
          <input type='text' value={this.state.description}placeholder="Description" onChange={this.update('description')}/>
          <label className="custom-file-input">Choose a thumbnail image
            <input className="upload-thumb" type='file' onChange={this.handleThumb}></input>
          </label>
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
