import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBLink,
  MDBFooter,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Register from "./register";
import SignIn from "./signIn";
import User from "./user";
import Upload from "./upload";
import Reconcile from "./reconcile";
import Warehouse from "./warehouse";
import Role from "./role";
class Home extends Component {
  state = {
    isOpen: false,
    modal: false,
    collapseID: "",
  };
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleLinks = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  render() {
    return (
      <Router>
        <MDBNavbar color="stylish-color-dark" dark expand="md">
          <MDBNavbarBrand>
            <MDBIcon icon="dolly" className="mr-2" />
            <strong className="white-text">Dalrada</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink className="white-text m-2" to="/">
                  <MDBIcon icon="home" className="mr-2" />
                  Home
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink className="white-text m-2" to="/signin">
                  <MDBIcon icon="smile" className="mr-2" />
                  Sign In
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink className="white-text m-2" to="/register">
                  <MDBIcon icon="smile" className="mr-2" />
                  Sign Up
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <div className="row w-100 h-100 position-sticky pt-xs-5">
          <div className="col-xl-3 col-xs-12 mt-xs-5  pt-xs-5 mb-5 pb-5 w-70 h-100 ">
            <MDBBtn
              color="orange darken-2"
              onClick={this.toggleLinks("basicCollapse")}
              style={{ marginBottom: "1rem" }}
            >
              Utilities
            </MDBBtn>
            <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
              <MDBLink to="/upload" className="black-text">
                <MDBIcon icon="paper-plane" className="mr-2" />
                Upload
              </MDBLink>
              <MDBLink to="/reconcile" className="black-text">
                <MDBIcon icon="cloud-download-alt" className="mr-2" />
                Reconcile
              </MDBLink>
              <MDBLink to="/warehouse" className="black-text">
                <MDBIcon icon="building" className="mr-2" />
                Warehouse
              </MDBLink>
              <MDBLink to="/user" className="black-text">
                <MDBIcon icon="user-tie" className="mr-2" />
                User
              </MDBLink>
              <MDBLink to="/role" className="black-text">
                <MDBIcon icon="smile" className="mr-2" />
                Role
              </MDBLink>
            </MDBCollapse>
          </div>
          <div className="mt-xl-3 mt-sm-1 pt-xl-3 pt-sm-1 pr-xl-5 col-xl-9 col-sm-12 mb-5 pb-5">
            <Switch>
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/reconcile" component={Reconcile} />
              <Route exact path="/warehouse" component={Warehouse} />
              <Route exact path="/user" component={User} />
              <Route exact path="/role" component={Role} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Home;
