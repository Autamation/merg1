import React, { Component } from "react";
import styles from "../role.module.css";

class ManageRole extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id={styles.content}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info"
              >
                <i className="fa fa-align-left"></i>
              </button>
            </div>
          </nav>
        </div>
        <div className={styles.formRole}>
          <div className="col-sm-12">
            <form>
              <div className="form-group">
                <label for="inputsm">Role-Name:</label>
                <input
                  className="form-control input-sm"
                  id="inputsm"
                  type="text"
                  placeholder="E.g.,Executive,Manager"
                />
              </div>
              <div>
                <a
                  href="create.html"
                  className="btn btn-success active mr-1"
                  role="button"
                  aria-pressed="true"
                >
                  Create
                </a>
                <a
                  href="/"
                  className="btn btn-danger active ml-1"
                  role="button"
                  aria-pressed="true"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </React.Fragment>
    );
  }
}

export default ManageRole;
