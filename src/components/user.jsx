import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
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
  MDBModalFooter,
  MDBDataTable,
  MDBRow,
  MDBCol,
  MDBLink,
} from "mdbreact";

const columns = [
  {
    label: "Id",
    field: "userId",
    sort: "asc",
    width: 100,
  },
  {
    label: "Name",
    field: "userName",
    sort: "asc",
    width: 150,
  },
  {
    label: "Email",
    field: "userEmail",
    sort: "asc",
    width: 100,
  },
  {
    label: "Password",
    field: "userPassword",
    sort: "asc",
    width: 100,
  },
  {
    label: "Role",
    field: "roleName",
    sort: "asc",
    width: 100,
  },

  {
    label: "Created Date",
    field: "createdDate",
    sort: "asc",
    width: 100,
  },
  {
    label: "CreatedBy",
    field: "createdBy",
    sort: "asc",
    width: 100,
  },

  {
    label: "Status",
    field: "status",
    sort: "asc",
    width: 100,
  },
  {
    label: "Edit",
    field: "edit",
    sort: "asc",
    width: 100,
  },
];
const rows = [];

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      role: "",
      modal: false,
      roleItems: [],
      usernameError: "",
      passwordError: "",
      roleError: "",
      data: { columns, rows },
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  componentDidMount() {
    this.getRoles();
    this.getUsers();
  }
  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleRoleChange = (event) => {
    this.setState({
      role: event.target.value,
    });
  };

  validate = () => {
    if (!this.state.username.length > 0) {
      this.setState({
        usernameError: "username should be more than 3 characters",
      });
      return false;
    }

    if (!this.state.password.length > 0) {
      this.setState({ passwordError: "weak password" });
      return false;
    }

    if (!this.state.role.length > 0) {
      this.setState({ roleError: "weak password" });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      event.preventDefault();
      this.getUser();
      // clear form
      this.setState({
        username: "",
        email: "",
        password: "",
        role: "",
        usernameError: "",
        passwordError: "",
        roleError: "",
      });
    }
  };
  handleChange = (selectedOption) => {
    this.setState({ role: selectedOption });
    console.log(`Option selected:`, this.state.role);
  };

  async getUsers() {
    const url = "dalrada/user/userResource/users";
    let token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: "Bearer " + token.uuid };
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        let rows = response.data.map((item) => {
          const user = item.respBody;
          user.edit = (
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
            user.status = (
              <MDBBtn color="warning" size="sm" className="text-center">
                Active
              </MDBBtn>
            );
          if (item.respBody.status === 0)
            user.status = (
              <MDBBtn color="info" size="sm" className="text-center">
                Inactive
              </MDBBtn>
            );
          return user;
        });
        this.setState({
          data: { columns, rows },
          modal: !this.state.modal,
        });
        console.log(this.state.data);
      })
      .catch((error) => console.log(error));
  }

  async getRoles() {
    axios
      .get("/dalrada/user/roleResource/roles")
      .then((response) => {
        const roles = response.data.map((resp) => {
          return {
            value: resp.respBody.roleName,
            label: resp.respBody.roleName,
          };
        });

        this.setState({
          roleItems: roles,
          modal: !this.state.modal,
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
                Create User
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          label="Full Name:"
                          className="text-center"
                          type="text"
                          value={this.state.username}
                          onChange={this.handleUsernameChange}
                        />
                        <div className="text-center red-text">
                          {this.state.usernameError}
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Email:"
                          type="text"
                          value={this.state.email}
                          onChange={this.handleEmailChange}
                          className="text-center"
                          iconClass="dark-grey"
                        />
                        <div className="text-center red-text">
                          {this.state.emailError}
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="6">
                        <Select
                          value={this.state.role}
                          onChange={this.handleChange}
                          options={this.state.roleItems}
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Password:"
                          type="password"
                          className="text-center"
                          value={this.state.password}
                          onChange={this.handlePasswordChange}
                          iconClass="dark-grey"
                        />
                        <div className="text-center red-text">
                          {this.state.passwordError}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
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
                Manage User
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
                  Edit User
                </MDBCardHeader>
                <MDBCardBody>
                  <form onSubmit={this.handleSubmit}>
                    <MDBContainer>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            label="Full Name:"
                            className="text-center"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                          />
                          <div className="text-center red-text">
                            {this.state.usernameError}
                          </div>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput
                            label="Email:"
                            type="text"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            className="text-center"
                            iconClass="dark-grey"
                          />
                          <div className="text-center red-text">
                            {this.state.emailError}
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <Select
                            value={this.state.role}
                            onChange={this.handleChange}
                            options={this.state.roleItems}
                          />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput
                            label="Password:"
                            type="password"
                            className="text-center"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            iconClass="dark-grey"
                          />
                          <div className="text-center red-text">
                            {this.state.passwordError}
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
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

export default User;
