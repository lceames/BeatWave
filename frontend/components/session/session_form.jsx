import React from 'react';
import { hashHistory } from 'react-router';

class SessionForm extends React.Component {

  constructor (props) {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let action = this.props.formType === "login" ? this.props.login : this.props.signup;
    let user = Object.assign({}, this.state);
    action(user).then(() => this.redirectToStream());
  }

  redirectToStream () {
    this.props.closeModal();
    hashHistory.push('/stream');
  }

  render () {
    let emailInput = <input type="text" placeholder="Email" onChange={this.update('email')}></input>
    let errors = ""

    if (this.props.errors) {
      errors = this.props.errors.map( (error, idx) => {
        return <li key={idx}>{error}</li>
      })
    }
    if (this.props.formType === "login") { emailInput = ""}

    return (
      <div>
        {errors}
        <form onSubmit={this.handleSubmit} className="user-form">
          {emailInput}
          <input type="text" placeholder="Username" onChange={this.update('username')}></input>
          <input type="password" placeholder="Password" onChange={this.update('password')}></input>
          <label>
            <input type="submit"></input>
          </label>
        </form>
      </div>
    );
  }
}

export default SessionForm;
