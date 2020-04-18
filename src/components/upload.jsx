import React, { Component } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdbreact";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const initialState = {
  warehouseId: "",
  warehouseFile: null,
  orderFile: null,
  startDate: new Date(),
  endDate: new Date(),
  warehouseIdError: "",
  warehouseFileError: "",
  orderFileError: "",
  dateError: "",
};
class Upload extends Component {
  getPickerValue = (value) => {
    console.log(value);
  };

  state = initialState;
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleIdChange = (event) => {
    this.setState({
      warehouseId: event.target.value,
    });
  };

  handleWarehouseFileChange = (event) => {
    this.setState({
      warehouseFile: event.target.files[0],
    });
  };
  validateWarehouse = () => {
    if (!this.state.warehouseId.length > 0) {
      this.setState({
        warehouseIdError: "warehouse Id is mandatory",
      });
      return false;
    }

    return true;
  };
  resetWarehouse = (event) => {
    event.preventDefault();
    this.setState({
      warehouseId: "",
      warehouseFile: null,
      warehouseIdError: "",
      warehouseFileError: "",
    });
  };

  handleWarehouseSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateWarehouse();
    if (isValid) {
      // clear form
      this.uploadWarehouseFile();
      this.setState(initialState);
      this.toggle();
    }
  };
  async uploadWarehouseFile() {
    let formData = new FormData();
    formData.append("file", this.state.warehouseFile);
    let url = "http://localhost:8082/warehouse/" + this.state.warehouseId;

    let file = this.state.warehouseFile;
    const warehouseMultipartRequest = {
      file: this.state.warehouseFile,
      id: this.state.warehouseId,
    };
    console.log(file);
    let token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: "Bearer " + token.uuid };
    axios
      .post(url, warehouseMultipartRequest, {})
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
  handleStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDate = (date) => {
    this.setState({
      endDate: date,
    });
  };

  handleOrderFileChange = (event) => {
    this.state({
      orderFile: event.target.files[0],
    });
  };

  validateOrders = () => {
    const from = this.state.startDate;
    const to = this.state.endDate;
    if (
      to.getFullYear() - from.getFullYear() >= 0 &&
      to.getMonth() - from.getMonth() <= 0 &&
      to.getDate() - from.getDate() <= 0
    ) {
      this.setState({
        dateError: "enter correct duration",
      });
      return false;
    }
    return true;
  };
  resetOrder = (event) => {
    event.preventDefault();
    this.setState({
      orderFile: null,
      startDate: '',
      endDate: '',
      orderFileError: "",
      dateError: "",
    });
  };

  handleOrderSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateOrders();
    if (isValid) {
      // clear form
      this.uploadWarehouseFile();
      this.setState({
        orderFile: "",
        startDate: new Date(),
        endDate: new Date(),
        orderFileError: "",
        dateError: "",
      });
      this.toggle();
    }
  };

  async uploadOrderFile() {
    const params = {
      file: this.state.orderFile,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    let token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: "Bearer " + token.uuid };
    axios
      .post("/dalrada/upload/order", { params, headers })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  render() {
    const today = new Date();
    return (
      <MDBContainer>
        <div className="row">
          <div className="col-xl-6 col-sm-12">
            <MDBCard>
              <MDBCardHeader
                titleClass="d-inline title"
                color="cyan darken-3"
                className="text-center darken-3 white-text"
              >
                Warehouse
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleWarehouseSubmit}>
                  <MDBInput
                    label="Warehouse ID"
                    value={this.state.warehouseId}
                    onChange={this.handleIdChange}
                    className="text-center"
                  />
                  <div className="text-center red-text">
                    {this.state.warehouseIdError}
                  </div>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupFileAddon01"
                      >
                        Upload
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        accept=".csv , .CSV"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        onChange={this.handleWarehouseFileChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        Choose warehouse file
                      </label>
                    </div>
                  </div>
                  <div className="text-center red-text">
                    {this.state.orderFileError}
                  </div>
                  <div className="text-center mt-3">
                    <MDBBtn
                      color="danger"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      type="submit"
                      onClick={this.toggle}
                    >
                      Upload
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      onClick={this.resetWarehouse.bind(this)}
                    >
                      Reset
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
          <div className="col-xl-6 col-sm-12 mt-xs-5">
            <MDBCard>
              <MDBCardHeader
                titleClass="d-inline title"
                color="cyan darken-3"
                className="text-center darken-3 white-text"
              >
                Order
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleOrderSubmit}>
                  <div className="input-group mt-1">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupFileAddon01"
                      >
                        Upload
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        accept=".csv , .CSV"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        onChange={this.handleOrderFileChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        Choose order file
                      </label>
                    </div>
                  </div>
                  <div className="text-center red-text">
                    {this.state.orderFileError}
                  </div>
                  <div className="row mt-3">
                    <span className="col-3">Start Date</span>
                    <DatePicker
                      className="mr-4 col-8"
                      selected={this.state.startDate}
                      value={this.state.startDate}
                      type="date"
                      onChange={this.handleStartDate}
                      required={true}
                      maxDate={today}
                      dateFormat="MM-dd-yyyy"
                    />
                  </div>
                  <div className="row mt-3">
                    <span className="col-3">End Date</span>
                    <DatePicker
                      className="mr-4 col-8"
                      selected={this.state.endDate}
                      value={this.state.endDate}
                      type="date"
                      required={true}
                      maxDate={today}
                      dateFormat="MM-dd-yyyy"
                      onChange={this.handleEndDate}
                    />
                  </div>
                  <div className="text-center red-text">
                    {this.state.dateError}
                  </div>
                  <div className="text-center mt-2">
                    <MDBBtn
                      color="danger"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      type="submit"
                    >
                      Upload
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      onClick={this.resetOrder.bind(this)}
                    >
                      Reset
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </MDBContainer>
    );
  }
}

export default Upload;
