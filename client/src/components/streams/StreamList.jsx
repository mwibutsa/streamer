import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = (stream) => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link
            className="ui button basic primary small"
            to={`/streams/edit/${stream.id}`}
          >
            Edit
          </Link>
          <Link
            className="ui button basic negative small"
            to={`/streams/delete/${stream.id}`}
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    return this.props.streams.map((stream) => (
      <div className="item" key={stream.id}>
        <i className="large middle aligned icon camera"></i>
        <div className="content">
          <Link className="header" to={`/streams/${stream.id}`}>
            {stream.title}
          </Link>
          <div className="description">{stream.description}</div>
        </div>
        {this.renderAdmin(stream)}
      </div>
    ));
  };

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <h2>Streams</h2>
        {this.renderCreate()}
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  streams: Object.values(state.streams),
  currentUserId: state.auth.userId,
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);
