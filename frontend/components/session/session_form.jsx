import React from 'react';
import { hashHistory } from 'react-router';

class SessionForm extends React.Component {

  constructor (props) {
    super();
    this.state = {
      username: "",
      email: "",
      password: ""
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
    formData.append("user[password]", this.state.password);

    if (this.state.profilePicture) {
      formData.append("user[image]", this.state.profilePicture);
    }

    let action = this.props.formType === "login" ? this.props.login : this.props.signup;
    let user = Object.assign({}, this.state);

    if (this.props.formType === "login") {
      action(user).then(
        (currentUser) => this.redirectToStream(currentUser),
        () => this.setState({password: ""})
      );
    }
    else {
      action(formData).then(
        (currentUser) => this.redirectToStream(currentUser)
      );
    }
  }

  resetLoginForm() {
    this.setState({
      password: ""
    });
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
    let usernameClass = "username";
    let passwordClass = "password";
    let emailClass = "email";
    let errors = "";
    let emailInput = "";
    let fileInput = "";

    if (this.props.errors) {
      errors = this.props.errors.map( (error, idx) => {
        if (error.includes("Username")) {
          usernameClass = "username error";
        }
        else if (error.includes("Password")) {
          passwordClass = "password error";
        }
        else {
          emailClass = "email error";
        }
        return <li key={idx}>{error}</li>
      })
    }

    if (this.props.formType !== "login") {
      emailInput = <input className={emailClass} type="text" placeholder="Email" onChange={this.update('email')}></input>
      fileInput = <label className="user-thumb-upload">Attach profile picture
          <input className="upload-profile-picture" type='file' onChange={this.handleFile}></input>
        </label>
    }

    return (
      <div className="user-form-container">
        <form onSubmit={this.handleSubmit} className="user-form">
          {emailInput}
          <input className={usernameClass} type="text" placeholder="Username" value={this.state.username} onChange={this.update('username')}></input>
          <input className={passwordClass} type="password" placeholder="Password" value={this.state.password} onChange={this.update('password')}></input>
          {fileInput}
          <ul className="errors">{errors}</ul>
          <input type="submit" value="Continue"></input>
        </form>
      </div>
    );
  }
}

export default SessionForm;
