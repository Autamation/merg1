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
    label: "Warehouse Id",
    field: "warehouseId",
    sort: "asc",
    width: 100,
  },
  {
    label: "Name",
    field: "warehouseName",
    sort: "asc",
    width: 150,
  },
  {
    label: "Address",
    field: "warehouseAddress",
    sort: "asc",
    width: 150,
  },
  {
    label: "Code",
    field: "warehouseCode",
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
    label: "Edit",
    field: "edit",
    sort: "asc",
    width: 100,
  },
];
const rows = [];

class Warehouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warehouseId:"",
      warehouseCode: 0,
      warehouseName: "",
      warehouseAddress: "",
      warehouseCodeError: "",
      nameError: "",
      codeError: "",
      addressError: "",
      modal: false,
      data: { columns, rows },
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  componentDidMount() {
    this.getWarehouses();
  }

  handleNameChange = (event) => {
    this.setState({
      warehouseName: event.target.value,
    });
  };
  handleAddressChange = (event) => {
    this.setState({
      warehouseAddress: event.target.value,
    });
  };
  handleWarehouseCodeChange = (event) => {
    this.setState({
      warehouseCode: event.target.value,
    });
  };
  handleReset = (event) => {
    this.setState({
      warehouseCode: 0,
      warehouseName: "",
      warehouseAddress: "",
      warehouseCodeError: "",
      nameError: "",
      codeError: "",
      addressError: "",
    });
  };
  validate = () => {
    if ((this.state.warehouseName.length < 3) || (this.state.warehouseName === "")) {
      console.log("inside name if");
      this.setState({
        nameError: "Warehouse name should contain morethan 3 letters",
      });
      return false;
    }
    console.log("warehouseCode:", this.state.warehouseCode.length);
    if ((this.state.warehouseCode.length<5) || (this.state.warehouseCode === "")) {
      console.log("inside code if");
      this.setState({
        warehouseCodeError: "Warehouse Code should be 5 digits",
      });
      return false;
    }
    console.log("warehouseAddress:", this.state.warehouseAddress);
    if (this.state.warehouseAddress === "") {
      console.log("inside address if");
      this.setState({
        addressError: "Warehouse Address should not be empty",
      });
      return false;
    }
    return true;
  };


  handleWarehouseSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      event.preventDefault();
      this.createWarehouse();
      // clear form
      this.setState({
        warehouseCode: 0,
        warehouseId: "",
        warehouseName: "",
        warehouseAddress: "",
        warehouseCodeError: "",
        nameError: "",
        codeError: "",
        addressError: "",
      });
    }
  };

  handleWarehouseEditSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      event.preventDefault();
      this.editWarehouse();
      // clear form
      this.setState({
        warehouseCode: "",
        warehouseId: "",
        warehouseName: "",
        warehouseAddress: "",
        warehouseCodeError: "",
        nameError: "",
        codeError: "",
        addressError: "",
      });
    }
  };
  async createWarehouse() {
    const url = "dalrada/warehouse/warehouses/create";
    let token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: "Bearer " + token.uuid };
    const request = {
      warehouseName: this.state.warehouseName,
      warehouseAddress: this.state.warehouseAddress,
      warehouseCode: this.state.warehouseCode,
      status: 1,
      createdDate: new Date(),
      createdBy: "ADMIN",
    };
    axios
      .post(url, request, { headers })
      .then((response) => {
        console.log(response);
        const warehouse = response.data.respBody;
        warehouse.edit = (
          <MDBBtn
            color="danger"
            size="sm"
            className="text-center"
            //onClick={this.editForm(response.data.respBody)}
           // onClick={()=>{alert(warehouse.warehouseAddress)}}
           //onClick={this.toggle}
           onClick={() => {
            this.editForm(response.data.respBody);
          }}
          >
            Edit
          </MDBBtn>
        );
        if (response.data.respBody.status === 1)
          warehouse.status = (
            <MDBBtn color="warning" size="sm" className="text-center">
              Active
            </MDBBtn>
          );
        if (response.data.respBody.status === 0)
          warehouse.status = (
            <MDBBtn color="info" size="sm" className="text-center">
              Inactive
            </MDBBtn>
          );
        this.state.data.rows.push(warehouse);
        this.getWarehouses();
      })
      .catch((error) => console.log(error));
  }

  async editForm(warehouse) {
    this.setState({
      warehouseName: warehouse.warehouseName,
      warehouseCode: warehouse.warehouseCode,
      warehouseAddress: warehouse.warehouseAddress,
      warehouseId: warehouse.warehouseId,
    });
    this.toggle();
  }

  async getWarehouses() {
    const url = "dalrada/warehouse/warehouses";
    let token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: "Bearer " + token.uuid };
    axios
      .get(url, { headers })
      .then((response) => {
        let rows = response.data.map((item) => {
          const warehouse = item.respBody;
          warehouse.edit = (
            <MDBBtn
              color="danger"
              size="sm"
              className="text-center"
             //onClick={this.editForm(item.respBody)}
            // onClick={()=>{alert(warehouse.warehouseAddress)}}
             // onClick={this.toggle}
             onClick={() => {
              this.editForm(item.respBody);
            }}
            >
              Edit
            </MDBBtn>
          );
          if (item.respBody.status === 1)
            warehouse.status = (
              <MDBBtn color="warning" size="sm" className="text-center">
                Active
              </MDBBtn>
            );
          if (item.respBody.status === 0)
            warehouse.status = (
              <MDBBtn color="info" size="sm" className="text-center">
                Inactive
              </MDBBtn>
            );
          return warehouse;
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
                Create Warehouse
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleWarehouseSubmit}>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          label="Warehouse Name:"
                          className="text-center"
                          type="text"
                          value={this.state.warehouseName}
                          onChange={this.handleNameChange}
                        />
                        <div className="text-center red-text">
                          {this.state.nameError}
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          label="Warehouse Code:"
                          type="number"
                          value={this.state.warehouseCode}
                          onChange={this.handleWarehouseCodeChange}
                          className="text-center"
                        />
                        <div className="text-center red-text">
                          {this.state.warehouseCodeError}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>

                  <MDBInput
                    label="Address:"
                    type="text"
                    value={this.state.warehouseAddress}
                    onChange={this.handleAddressChange}
                    className="text-center"
                    iconClass="dark-grey"
                  />
                  <div className="text-center red-text">
                    {this.state.addressError}
                  </div>

                  <div className="text-center mt-1-half">
                    <MDBBtn
                      color="danger"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      size="sm"
                      type="submit"
                    >
                      Create
                      <MDBIcon icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      size="sm"
                      type="reset"
                      onClick={this.handleReset}
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
                Manage Warehouse
              </MDBCardHeader>
              <MDBCardBody>
                <MDBDataTable
                  striped
                  bordered
                  responsive
                  paging={true}
                  searching={true}
                  small
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
                  Edit Warehouse
                </MDBCardHeader>
                <MDBCardBody>
                  <form onSubmit={this.handleWarehouseEditSubmit}>
                    <MDBContainer>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            label="Warehouse Name:"
                            className="text-center"
                            type="text"
                            value={this.state.warehouseName}
                            onChange={this.handleNameChange}
                          />
                          <div className="text-center red-text">
                            {this.state.nameError}
                          </div>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput
                            label="Warehouse Code:"
                            type="number"
                            value={this.state.warehouseCode}
                            onChange={this.handleWarehouseCodeChange}
                            className="text-center"
                          />
                          <div className="text-center red-text">
                            {this.state.warehouseCodeError}
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>

                    <MDBInput
                      label="Address:"
                      type="text"
                      value={this.state.warehouseAddress}
                      onChange={this.handleAddressChange}
                      className="text-center"
                      iconClass="dark-grey"
                    />
                    <div className="text-center red-text">
                      {this.state.addressError}
                    </div>

                    <div className="text-center mt-1-half">
                      <MDBBtn
                        color="danger"
                        className="mb-2 mt-3 rounded-pill"
                        outline
                        type="submit"
                        size="sm"
                      >
                        EDIT
                        <MDBIcon icon="paper-plane" className="ml-1" />
                      </MDBBtn>
                      <MDBBtn
                        color="primary"
                        className="mb-2 mt-3 rounded-pill"
                        outline
                        size="sm"
                        type="reset"
                        onClick={this.handleReset}
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

export default Warehouse;
