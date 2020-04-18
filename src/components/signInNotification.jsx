import React, { Component } from "react";
import { MDBNotification } from "mdbreact";

class SignInNotification extends Component {
  render() {
    return (
      <MDBNotification
        show
        fade
        iconClassName="text-primary"
        title="Bootstrap"
        message="Hello, world! This is a toast message."
        text="11 mins ago"
      />
    );
  }
}

export default SignInNotification;
