import React, { Component } from "react";
import styles from "../role.module.css";

class ManageWarehouse extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id={styles.content}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button type="button" id="sidebarCollapse" class="btn btn-info">
                <i className="fa fa-align-left"></i>
              </button>
            </div>
          </nav>
        </div>
        <div className={styles.formRole}>
          <div className="col-sm-12">
            <form>
              <div className="form-group">
                <label for="inputsm">Warehouse Name:</label>
                <input
                  className="form-control input-sm"
                  id="inputsm"
                  type="text"
                  placeholder="Warehouse Name"
                />
              </div>
              <div className="form-group">
                <label for="inputsm">Warehouse code:</label>
                <input
                  className="form-control input-sm"
                  id="inputsm"
                  type="text"
                  placeholder="Warehouse Code"
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <h5>Warehouse file:</h5>
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                  </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label className="custom-file-label" for="inputGroupFile01">
                    Choose file
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label for="inputsm">Warehouse Address:</label>
                <input
                  className="form-control input-sm"
                  id="inputsm"
                  type="text"
                  placeholder="Warehouse Address"
                />
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

export default ManageWarehouse;
