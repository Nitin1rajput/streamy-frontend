import React, { useEffect } from "react";
import { connect } from "react-redux";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./SreamForm";
const StreamEdit = ({ editStream, fetchStream, match, stream }) => {
  useEffect(() => fetchStream(match.params.id), [fetchStream, match.params.id]);
  const onSubmit = (formValues) => {
    editStream(match.params.id, formValues);
  };

  return stream ? (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={{ title: stream.title, desc: stream.desc }}
        onSubmit={onSubmit}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { editStream, fetchStream })(
  StreamEdit
);
