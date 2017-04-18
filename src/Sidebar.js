import React, { Component } from 'react';
import $ from "jquery";
import './App.css';
import { Grid, Row, Col} from 'react-flexbox-grid';
import { Form, FormGroup, Button, Panel, ProgressBar} from 'react-bootstrap';

class Sidebar extends Component {

  constructor(props) {
		super(props);
  }
  render() {
    return (<Col xs={4} md={4} className="sidebar">

    </Col>)
  }
}

export default Sidebar;
