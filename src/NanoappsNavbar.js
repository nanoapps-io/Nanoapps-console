import React, { Component } from 'react';
import $ from "jquery";
import './App.css';
import { Grid, Row, Col} from 'react-flexbox-grid';
import Dropzone from 'react-dropzone';
import { Form, FormGroup, Button, Panel, ProgressBar, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import * as configs from "./config"

class NanoappsNavbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (<Navbar inverse collapseOnSelect>
      <Navbar.Header>
      <Navbar.Brand>
        <a href="#">nanoapps v0.1</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullLeft>
        <NavItem eventKey={1} href="#">Create new</NavItem>
        <NavItem eventKey={2} href="#">Show published</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={2} href="#"><b>Dineshswamy Paranthaman</b></NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)
  }
}
export default NanoappsNavbar;
