import React, { Component } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBDataTable,
  MDBRow,
  MDBCol,
  MDBLink,
} from "mdbreact";

const columns = [
  {
    label: "Id",
    field: "roleId",
    sort: "asc",
    width: 100,
  },
  {
    label: "Role",
    field: "roleName",
    sort: "asc",
    width: 150,
  },
  {
    label: "Created Date",
    field: "createdDate",
    sort: "asc",
    width: 150,
  },
  {
    label: "Created By",
    field: "createdBy",
    sort: "asc",
    width: 150,
  },
  {
    label: "Status",
    field: "status",
    sort: "asc",
    width: 150,
  },
  {
    label: "",
    field: "edit",
    sort: "asc",
    width: 100,
  },
];
const rows = [];

class Role extends Component {
  state = {
    data: {
      columns,
      rows,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      roleName: "",
      roleError: "",
      modal: false,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    this.getRoles();
  }

  handleRoleChange = (event) => {
    this.setState({
      roleName: event.target.value,
    });
  };

  validate = () => {
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.createRole();
      // clear form
      this.setState({
        role: "",
        roleError: "",
      });
    }
  };

  async createRole() {
    const url = "dalrada/user/roleResource/roles/create";

    const request = {
      roleName: this.state.roleName,
      status: 1,
      createdDate: new Date(),
      createdBy: "ADMIN",
    };
    console.log(request);
    axios
      .post(url, request)
      .then((response) => {
        console.log(response);
        const role = response.data.respBody;
        role.edit = (
          <MDBBtn
            color="danger"
            size="sm"
            className="text-center"
            onClick={this.toggle}
          >
            Edit
          </MDBBtn>
        );
        if (response.data.respBody.status === 1)
          role.status = (
            <MDBBtn color="warning" size="sm" className="text-center">
              Active
            </MDBBtn>
          );
        if (response.data.respBody.status === 0)
          role.status = (
            <MDBBtn color="info" size="sm" className="text-center">
              Inactive
            </MDBBtn>
          );
        this.state.data.rows.push(role);
        this.getRoles();
        this.setState({
          modal: !this.state.modal,
        });
      })
      .catch((error) => console.log(error));
  }

  async getRoles() {
    axios
      .get("/dalrada/user/roleResource/roles")
      .then((response) => {
        let rows = response.data.map((item) => {
          const role = item.respBody;
          role.edit = (
            <MDBBtn
              color="danger"
              size="sm"
              className="text-center"
              onClick={this.toggle}
            >
              Edit
            </MDBBtn>
          );
          if (item.respBody.status === 1)
            role.status = (
              <MDBBtn color="warning" size="sm" className="text-center">
                Active
              </MDBBtn>
            );
          if (item.respBody.status === 0)
            role.status = (
              <MDBBtn color="info" size="sm" className="text-center">
                Inactive
              </MDBBtn>
            );
          return role;
        });
        this.setState({
          data: { columns, rows },
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <MDBContainer>
        <div>
          <div>
            <MDBCard>
              <MDBCardHeader
                titleClass="d-inline title"
                color="cyan darken-3"
                type="text"
                className="text-center  darken-3 white-text"
              >
                Create Role
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <MDBInput
                    label="Role Name:"
                    className="text-center"
                    type="text"
                    value={this.state.roleName}
                    onChange={this.handleRoleChange}
                  />
                  <div className="text-center red-text">
                    {this.state.roleError}
                  </div>
                  <div className="text-center mt-1-half">
                    <MDBBtn
                      color="danger"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      type="submit"
                    >
                      Create
                      <MDBIcon icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                    >
                      Reset
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
          <div className="mt-5">
            <MDBCard>
              <MDBCardHeader
                titleClass="d-inline title"
                color="cyan darken-3"
                className="text-center darken-3 white-text"
              >
                Manage Role
              </MDBCardHeader>
              <MDBCardBody>
                <MDBDataTable
                  striped
                  bordered
                  responsive
                  paging={true}
                  searching={true}
                  data={this.state.data}
                />
              </MDBCardBody>
            </MDBCard>
          </div>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalBody>
              <MDBCard>
                <MDBCardHeader
                  titleClass="d-inline title"
                  color="cyan darken-3"
                  type="text"
                  className="text-center  darken-3 white-text"
                >
                  Edit Role
                </MDBCardHeader>
                <MDBCardBody>
                  <form onSubmit={this.handleSubmit}>
                    <MDBInput
                      label="Role Name:"
                      className="text-center"
                      type="text"
                      value={this.state.roleName}
                      onChange={this.handleRoleChange}
                    />
                    <div className="text-center red-text">
                      {this.state.roleError}
                    </div>
                    <div className="text-center mt-1-half">
                      <MDBBtn
                        color="danger"
                        className="mb-2 mt-3 rounded-pill"
                        outline
                        type="submit"
                      >
                        SUBMIT
                        <MDBIcon icon="paper-plane" className="ml-1" />
                      </MDBBtn>
                      <MDBBtn
                        color="primary"
                        className="mb-2 mt-3 rounded-pill"
                        outline
                      >
                        RESET
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBLink color="secondary" onClick={this.toggle}>
                <MDBIcon icon="check" />
              </MDBLink>
            </MDBModalFooter>
          </MDBModal>
        </div>
      </MDBContainer>
    );
  }
}

export default Role;
