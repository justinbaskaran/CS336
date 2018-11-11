var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = comments.length + 1;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>List of People</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});


var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={"First Name: "+comment.firstname + " "  + "Last Name: "+comment.lastname} key={comment.id}>
          {comment.start}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    console.log(this.props.author);
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {firstname: '', lastname: '', start: ''};
  },
  handlefirstNameChange: function(e) {
    this.setState({firstname: e.target.value});
  },
  handlelastNameChange: function(e) {
    this.setState({lastname: e.target.value});
  },
  handleStartChange: function(e) {
    this.setState({start: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var firstname = this.state.firstname.trim();
    var lastname = this.state.lastname.trim();
    var startDate = this.state.start.trim();

    if (!firstname || !lastname || !startDate) {
      return;
    }
    this.props.onCommentSubmit({firstname: firstname, lastname: lastname, start: startDate});
    this.setState({firstname: '', lastname: '', start: ''});
  },
  render: function() {
    return (

      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="FirstName"
          value={this.state.firstname}
          onChange={this.handlefirstNameChange}
        />
        <input
          type="text"
          placeholder="LastName"
          value={this.state.lastname}
          onChange={this.handlelastNameChange}
        />
         <input
          type="text"
          placeholder="StartDate"
          value={this.state.start}
          onChange={this.handleStartChange}
        />

        <input type="submit" value="Post" />
      </form>

    );
  }
});




ReactDOM.render(
  <CommentBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);