import React, { Component } from "react";

class ForgotPassword extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>DALRADA</h2>
            <p>Reset password</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <h3>Reset Password</h3>
              <form>
                <div className="form-group">
                  <label>UserName</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="UserName"
                  />
                </div>
                <a
                  href="index.html"
                  className="btn btn-black active"
                  role="button"
                  aria-pressed="true"
                >
                  Reset Password
                </a>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPassword;
