import React, { Component } from "react";
import styles from "../role.module.css";

class ManageUser extends Component {
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
                <label for="inputsm">UserName:</label>
                <input
                  className="form-control input-sm"
                  id="inputsm"
                  type="text"
                  placeholder="E.g.,Executive,Manager"
                />
              </div>
              <div className="form-group">
                <label for="inputsm">Password:</label>
                <input
                  className="form-control input-sm"
                  id="inputsm"
                  type="text"
                  placeholder="E.g.,Executive,Manager"
                />
              </div>
              <div className="container">
                <div className="dropdown dropright">
                  <h6>Select Role Name:</h6>
                  <button
                    className="btn btn-info dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                  >
                    Role
                    <span className="m-1 caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Manager</a>
                    </li>
                    <li>
                      <a href="#">Executive</a>
                    </li>
                    <li>
                      <a href="#">Admin</a>
                    </li>
                    <li className="divider"></li>
                  </ul>
                </div>
              </div>
              <br />
              <div className="btn-group">
                <a
                  href="#"
                  className="btn btn-success active"
                  role="button"
                  aria-pressed="true"
                >
                  Create
                </a>
                <a
                  href="#"
                  className="btn btn-danger active"
                  role="button"
                  aria-pressed="true"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageUser;
