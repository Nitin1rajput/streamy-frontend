import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";

class Auth extends React.Component {
  componentDidMount() {
    console.log(this.props);
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "425061086198-lhfqa70p4t5e3nppm0smjfdst2ucrjen.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log(this.auth.isSignedIn.get());
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };
  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };
  renderAuthBtn = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon"></i>
          Sign In With Google
        </button>
      );
    }
  };
  render() {
    return <div>{this.renderAuthBtn()}</div>;
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(Auth);
