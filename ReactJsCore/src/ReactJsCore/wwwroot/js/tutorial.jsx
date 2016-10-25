//var Remarkable = require('remarkable');

var data = [
  { id: 1, author: "Daniel Lo Nigro", text: "Hello ReactJS.NET World!" },
  { id: 2, author: "Pete Hunt", text: "This is one comment" },
  { id: 3, author: "Jordan Walke", text: "This is *another* comment" }
];

var CommentBox = React.createClass({

    loadCommentsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },

    handleCommentSubmit: function (comment) {
        // TODO: submit to the server and refresh the list
        var data = new FormData();
        data.append('author', comment.author);
        data.append('text', comment.text)
    },

    getInitialState: function () {
        // initial state
        // getInitialState executes exactly once during the lifecycle of hte component and sets up the initial state of the component
        // state are component self-contains
        return { data: [] };
    },
    componentWillMount: function () {
        this.loadCommentsFromServer();
        //window.setInterval(this.loadCommentsFromServer, this.props.pollInterval); // what?
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
            );
    }
});

var Comment = React.createClass({

    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup }
    },

    render: function () {
        return (
            <div className="comment">

                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
            );
    }
});

var CommentList = React.createClass({
    render: function () {
        // foreach function - map
        var commentNotes = this.props.data.map(function (item) {
            return (
                <Comment author={item.author} key={item.id}>
                    {item.text}
                </Comment>
                );
        });

        return (
            <div className="commentList">
                {commentNotes}
            </div>
            )
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return { author: '', text: '' };
    },
    handleAuthorChange: function (e) {
        this.setState({ author: e.target.value });
    },
    handleTextChange: function (e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }

        // TODO: send request to the server
        this.setState({ author: '', text: '' });
    },
    render: function () {
        return (
            <div className="commentForm" onSubmit={this.handleSubmit}>
                <h3>Add your comments</h3>
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
                <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
                <input type="submit" value="Post" />
            </div>
            )
    }
});

ReactDOM.render(
    //<CommentBox data={data} />,
    <CommentBox url="/comments" pollInterval={2000} />,
    document.getElementById('content')
    );