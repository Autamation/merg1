import React, { Component } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBDataTable,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const columns = [
  {
    label: "No",
    field: "srNo",
    sort: "asc",
    width: 600,
  },
  {
    label: "Ext NetUnit",
    field: "extNetUnit",
    sort: "asc",
    width: 600,
  },
  {
    label: "Order Date",
    field: "orderDate",
    sort: "asc",
    width: 600,
  },
  {
    label: "Store OrderId",
    field: "storeOrderId",
    sort: "asc",
    width: 600,
  },
  {
    label: "Order Number",
    field: "orderNumber",
    sort: "asc",
    width: 600,
  },
  {
    label: "Po Number",
    field: "poNumber",
    sort: "asc",
    width: 600,
  },
  {
    label: "Reference Number",
    field: "referenceNumber",
    sort: "asc",
    width: 600,
  },
  {
    label: "Channel Name",
    field: "channelName",
    sort: "asc",
    width: 600,
  },
  {
    label: "Order Status",
    field: "orderStatus",
    sort: "asc",
    width: 600,
  },
  {
    label: "SKU",
    field: "sku",
    sort: "asc",
    width: 600,
  },
  {
    label: "Product Name",
    field: "productName",
    sort: "asc",
    width: 1000,
  },
  {
    label: "Quantity",
    field: "quantity",
    sort: "asc",
    width: 600,
  },
  {
    label: "Supplier Cost Per SKU",
    field: "supplierCostPerSKU",
    sort: "asc",
    width: 600,
  },
  {
    label: "Sale Price",
    field: "salePrice",
    sort: "asc",
    width: 600,
  },
  {
    label: "Amazon Amount",
    field: "amazonAmount",
    sort: "asc",
    width: 600,
  },
  {
    label: "Profit",
    field: "profit",
    sort: "asc",
    width: 600,
  },
  {
    label: "Average Profit",
    field: "avgProfit",
    sort: "asc",
    width: 600,
  },
  {
    label: "ROI",
    field: "roi",
    sort: "asc",
    width: 600,
  },
  {
    label: "Supplier Cost Total",
    field: "supplierCostTotal",
    sort: "asc",
    width: 600,
  },
  {
    label: "Order Total",
    field: "orderTotal",
    sort: "asc",
    width: 600,
  },
  {
    label: "Supplier Name",
    field: "supplierName",
    sort: "asc",
    width: 600,
  },
  {
    label: "Store Shipping Method",
    field: "storeShippingMethod",
    sort: "asc",
    width: 600,
  },
  {
    label: "Shipping Carrier",
    field: "shippingCarrier",
    sort: "asc",
    width: 600,
  },
  {
    label: "Shipping Method",
    field: "shippingMethod",
    sort: "asc",
    width: 600,
  },
  {
    label: "Tracking Numbers",
    field: "trackingNumbers",
    sort: "asc",
    width: 600,
  },
  {
    label: "Customer Name",
    field: "customerName",
    sort: "asc",
    width: 250,
  },
  {
    label: "Customer Email",
    field: "customerEmail",
    sort: "asc",
    width: 600,
  },
  {
    label: "Customer Phone",
    field: "customerPhone",
    sort: "asc",
    width: 600,
  },
  {
    label: "Address Line 1",
    field: "addressLine1",
    sort: "asc",
    width: 600,
  },
  {
    label: "Address Line 2",
    field: "addressLine2",
    sort: "asc",
    width: 600,
  },
  {
    label: "City",
    field: "city",
    sort: "asc",
    width: 600,
  },
  {
    label: "State",
    field: "state",
    sort: "asc",
    width: 600,
  },
  {
    label: "Zip",
    field: "zip",
    sort: "asc",
    width: 250,
  },
  {
    label: "Country",
    field: "company",
    sort: "asc",
    width: 600,
  },
];
const rows = [];

class Reconcile extends Component {
  state = {
    startDate: "",
    endDate: "",
    dateError: "",
    modal: false,
    userData: { columns, rows },
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleStartDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
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

  resetDates = (event) => {
    event.preventDefault();
    this.setState({
      orderFile: "",
      startDate: "",
      endDate: "",
      dateError: "",
    });
  };

  handleOrderSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateOrders();
    if (isValid) {
      const startDate = this.state.startDate.toISOString().split("T")[0];
      const endDate = this.state.endDate.toISOString().split("T")[0];
      const url = "/dalrada/reconcile/orders/" + startDate + "/" + endDate;
      this.getData(url);
      this.setState({
        startDate: new Date(),
        endDate: new Date(),
        dateError: "",
      });
      this.toggle();
    }
  };

  async getData(url) {
    let token = JSON.parse(localStorage.getItem("token"));
    const headers = { Authorization: "Bearer " + token.uuid };
    console.log(`${headers.Authorization}`);
    axios
      .get(url, { headers })
      .then((response) => {
        let rows = response.data.map((order) => order.respBody);
        this.setState({
          userData: {
            columns,
            rows,
          },
        });
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const today = new Date();
    return (
      <MDBContainer>
        <div className="row">
          <div className="col-xl-8 offset-1 col-sm-12">
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
                  <div className="row mt-3">
                    <span className="col-3">Start Date</span>
                    <DatePicker
                      className="mr-5 col-8"
                      selected={this.state.startDate}
                      value={this.state.startDate}
                      type="date"
                      required={true}
                      maxDate={today}
                      dateFormat="MM-dd-yyyy"
                      onChange={this.handleStartDateChange}
                    />
                  </div>
                  <div className="row mt-3">
                    <span className="col-3">End Date</span>
                    <DatePicker
                      className="mr-5 col-8"
                      selected={this.state.endDate}
                      value={this.state.endDate}
                      type="date"
                      required={true}
                      maxDate={today}
                      dateFormat="MM-dd-yyyy"
                      onChange={this.handleEndDateChange}
                    />
                  </div>
                  <div className="text-center red-text">
                    {this.state.dateError}
                  </div>
                  <div className="text-center mt-1-half">
                    <MDBBtn
                      color="danger"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      type="submit"
                    >
                      Order Details
                      <MDBIcon icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      className="mb-2 mt-3 rounded-pill"
                      outline
                      onClick={this.resetDates.bind(this)}
                    >
                      Reset
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
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
                order={["srNo", "asc"]}
                data={this.state.userData}
              />
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    );
  }
}

export default Reconcile;
