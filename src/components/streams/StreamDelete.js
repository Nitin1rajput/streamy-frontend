import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";
import history from "../../history";
import Modal from "../Modal/Modal";

const StreamDelete = ({ match, fetchStream, stream, deleteStream }) => {
  useEffect(() => fetchStream(match.params.id), [fetchStream, match.params.id]);

  return (
    <Modal
      title="Delete Stream"
      content={`Are you sure you want to delete this stream ${
        stream && stream.title
      }`}
      actions={
        <>
          <button
            onClick={() => deleteStream(match.params.id)}
            className="ui button negative"
          >
            Delete
          </button>
          <button onClick={() => history.push("/")} className="ui button ">
            Cancel
          </button>
        </>
      }
      onDismiss={() => history.push("/")}
    />
  );
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
