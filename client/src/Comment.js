import React, { Component } from 'react';
import './css/Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.ReadUser = this.ReadUser.bind(this);
    this.ReadInput = this.ReadInput.bind(this);
    this.DefaultUser = this.DefaultUser.bind(this);
    this.AddReply = this.AddReply.bind(this);
  }

  ReadUser(e) {
    this.props.ReadReplyUser(this.props.Id, e.target.value);
  }

  DefaultUser() {
    this.props.DefaultUser(this.props.Id);
  }

  ReadInput(e) {
    this.props.ReadReplyInput(this.props.Id, e.target.value);
  }

  AddReply(e) {
    if (e.keyCode === 13) {
      if (e.target.value !== '') {
        e.preventDefault();
        if (this.props.ReplyUser === '') {
          this.DefaultUser();
        }
        this.props.AddReply(this.props.Id);
      }
    }
  }

  render() {
    const Replys = this.props.Replys.map(reply =>
      <div key={reply.Id} className="Reply">
        <div className="ReplyUsername">
          {reply.Username}
        </div>
        <div className="ReplyTime">
          Time: {reply.Time}
        </div>
        <div className="ReplyContent">
          {reply.Content}
        </div>
      </div>,
    );

    return (
      <div className="Comment">
        <div className="Username">
          {this.props.Username}
        </div>
        <div className="Time">
          Time: {this.props.Time}
        </div>
        <div className="Content">
          {this.props.Content}
        </div>
        <div>
          {Replys}
        </div>
        <input
          className="ReplyUser" placeholder="Name"
          value={this.props.ReplyUser}
          onChange={this.ReadUser}
        />
        <textarea
          className="ReplyInput" placeholder="add new reply here"
          value={this.props.ReplyInput}
          onChange={this.ReadInput}
          onKeyDown={this.AddReply}
        />
      </div>
    );
  }
}

Comment.propTypes = {
  Content: React.PropTypes.string.isRequired,
  Username: React.PropTypes.string.isRequired,
  Time: React.PropTypes.string.isRequired,
  Replys: React.PropTypes.array.isRequired,
};

Comment.defaultProps = {
  Content: '',
  Username: '',
  Time: '',
  Replys: [],
};

export default Comment;
