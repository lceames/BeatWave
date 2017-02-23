import React from 'react';
import { hashHistory } from 'react-router';

class SessionForm extends React.Component {

  constructor (props) {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      profilePicture: null
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.formType !== this.props.formType) {
      this.props.resetErrors();
    }
  }

  componentWillUnmount () {
    this.props.resetErrors();
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user[username]", this.state.username);
    formData.append("user[email]", this.state.email);
    formData.append("user[password]", this.state.email);
    if (this.state.profilePicture) {
      formData.append("user[image]", this.state.profilePicture);
    }
    let action = this.props.formType === "login" ? this.props.login : this.props.signup;
    let user = Object.assign({}, this.state);
    if (this.props.formType === "login") {
      action(user).then((currentUser) => this.redirectToStream(currentUser));
    }
    else {
      action(formData).then((currentUser) => this.redirectToStream(currentUser));
    }
  }

  redirectToStream (user) {
    this.props.closeModal();
    hashHistory.push('/stream');
  }

  handleFile (e) {
    let file = e.currentTarget.files[0];
    this.setState({profilePicture: file});
  }

  render () {
    let emailInput = <input type="text" placeholder="Email" onChange={this.update('email')}></input>
    let fileInput = <input className="upload-profile-picture" type='file' onChange={this.handleFile}></input>
    let errors = ""

    if (this.props.errors) {
      errors = this.props.errors.map( (error, idx) => {
        return <li key={idx}>{error}</li>
      })
    }
    if (this.props.formType === "login") {
      emailInput = "";
      fileInput = ""
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="user-form">
          {emailInput}
          <input type="text" placeholder="Username" onChange={this.update('username')}></input>
          <input type="password" placeholder="Password" onChange={this.update('password')}></input>
          {fileInput}
          <ul className="errors">{errors}</ul>
          <label>
            <input type="submit"></input>
          </label>
        </form>
      </div>
    );
  }
}

export default SessionForm;
