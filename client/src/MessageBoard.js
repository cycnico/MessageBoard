import React, { Component } from 'react';
import Comment from './Comment';
import './css/MessageBoard.css';

// eslint-disable-next-line react/prefer-stateless-function
class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comments: [],
      Username: '',
      NewCommentInput: '',
    };

    this.ReadUser = this.ReadUser.bind(this);
    this.ReadInput = this.ReadInput.bind(this);
    this.AddComment = this.AddComment.bind(this);
    this.SetComments = this.SetComments.bind(this);
    this.ReadReplyInput = this.ReadReplyInput.bind(this);
    this.ReadReplyUser = this.ReadReplyUser.bind(this);
    this.DefaultReplyUser = this.DefaultReplyUser.bind(this);
    this.AddReply = this.AddReply.bind(this);
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(comments => this.SetComments(comments));
  }

  SetComments(comments) {
    return this.setState({ Comments: comments });
  }

  ReadUser(e) {
    this.setState({ Username: e.target.value });
  }

  ReadInput(e) {
    this.setState({ NewCommentInput: e.target.value });
  }

  AddComment(e) {
    if (e.keyCode === 13) {
      if (this.state.Input !== '') {
        e.preventDefault();
        let user = '';
        if (this.state.Username !== '') {
          user = this.state.Username;
        } else {
          user = 'Anonymous';
        }

        fetch('/api/comments', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            Username: user,
            Content: this.state.NewCommentInput,
          }),
        })
        .catch(err => console.error(err));

        fetch('/api')
          .then(res => res.json())
          .then(comments => this.SetComments(comments));

        this.setState({
          Username: '',
        });

        this.setState({
          NewCommentInput: '',
        });
      }
    }
  }

  ReadReplyUser(CommentId, user) {
    const temp = this.state.Comments;
    temp[CommentId].ReplyUser = user;
    this.setState({
      Comments: temp,
    });
  }

  DefaultReplyUser(CommentId) {
    const temp = this.state.Comments;
    temp[CommentId].ReplyUser = 'Anonymous';
    this.setState({
      Comments: temp,
    });
  }

  ReadReplyInput(CommentId, newReply) {
    const temp = this.state.Comments;
    temp[CommentId].ReplyInput = newReply;
    this.setState({
      Comments: temp,
    });
  }

  AddReply(Commentid) {
    const temp = this.state.Comments;

    fetch('/api/comments', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        CommentId: Commentid,
        Username: temp[Commentid].ReplyUser,
        Content: temp[Commentid].ReplyInput,
      }),
    })
    .catch(err => console.error(err));

    fetch('/api')
      .then(res => res.json())
      .then(comments => this.SetComments(comments));
  }

  render() {
    const Comments = this.state.Comments.map(comment =>
      <Comment
        key={comment.Id} Id={comment.Id} Content={comment.Content}
        Replys={comment.Replys} ReplyUser={comment.ReplyUser}
        ReplyInput={comment.ReplyInput}
        Username={comment.Username} Time={comment.Time}
        ReadReplyUser={this.ReadReplyUser}
        ReadReplyInput={this.ReadReplyInput}
        DefaultUser={this.DefaultReplyUser}
        AddReply={this.AddReply}
      />,
    );

    return (
      <div className="MessageBoard">
        <div className="Header">
          <h2>Message Board</h2>
        </div>
        <input
          className="UserInput" placeholder="Username"
          value={this.state.Username}
          onChange={this.ReadUser}
        />
        <textarea
          className="CommentInput" placeholder="add new comment here"
          value={this.state.NewCommentInput}
          onChange={this.ReadInput}
          onKeyDown={this.AddComment}
        />
        <div className="Comments">
          {Comments}
        </div>
      </div>
    );
  }
}

export default MessageBoard;
