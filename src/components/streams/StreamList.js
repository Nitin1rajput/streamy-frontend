import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
  useEffect(() => fetchStreams(), [fetchStreams]);

  const renderAdmin = (stream) =>
    stream.userId === currentUserId && (
      <div className="right floated content">
        <Link to={`/stream/edit/${stream.id}`} className="ui button primary">
          Edit
        </Link>
        <Link to={`/stream/delete/${stream.id}`} className="ui button negative">
          Delete
        </Link>
      </div>
    );
  const renderList = () => {
    return streams.map((stream) => (
      <div className="item" key={stream.id}>
        {renderAdmin(stream)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link className="header" to={`/stream/${stream.id}`}>
            {stream.title}
          </Link>
          <div className="description">{stream.desc}</div>
        </div>
      </div>
    ));
  };

  const renderCreate = () =>
    isSignedIn && (
      <div style={{ textAlign: "right" }}>
        <Link to="/stream/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    );
  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
