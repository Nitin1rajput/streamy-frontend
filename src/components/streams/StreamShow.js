import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }
  buildPlayer() {
    const { id } = this.props.match.params;
    if (this.flvPlayer || !this.props.stream) {
      return;
    }
    this.flvPlayer = flv.createPlayer({
      type: "flv",
      url: `rtmp://rtmp-live.herokuapp.com/live/${id}.flv`,
    });
    this.flvPlayer.attachMediaElement(this.videoRef.current);
    this.flvPlayer.load();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }
  componentDidUpdate() {
    this.buildPlayer();
  }
  componentWillUnmount() {
    this.flvPlayer.destroy();
  }
  render() {
    const { title, desc } = this.props.stream;
    return this.props.stream ? (
      <div>
        <video ref={this.videoRef} width="100%" controls />
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
