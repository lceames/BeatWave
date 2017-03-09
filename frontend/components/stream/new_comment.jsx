import React from 'react';
import { createComment } from '../../actions/comment_actions';
import { connect } from 'react-redux';

class NewComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let elapsedTime = this.props.currentTrack ? this.props.currentTrack.elapsedTime : 0;
    let comment = Object.assign({}, this.state);
    comment["track_id"] = this.props.track.id;
    comment["elapsed_time"] = elapsedTime;
    this.props.createComment(comment).then( () => {
      this.setState({body: ""});
    });
  }

  handleChange(e) {
    this.setState({body: e.target.value});
  }

  render () {
    if (!this.props.currentUser) {
      return <div></div>;
    }

    return (
      <div className="new-comment">
        <img className="new-comment-thumb" src={this.props.currentUser.image}/>
        <form onSubmit={this.handleSubmit} className="new-comment-form">
          <input type="text" placeholder="Write a comment" className="comment-text"
          onChange={this.handleChange} value={this.state.body}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (comment) => dispatch(createComment(comment))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)
