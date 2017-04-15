import React, { Component } from 'react';
import $ from "jquery";
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col} from 'react-flexbox-grid';
import Dropzone from 'react-dropzone';
import { Form, FormGroup, Button, Panel} from 'react-bootstrap';
import * as configs from "./config"


class App extends Component {

  constructor(props) {
		super(props);
		this.state = {
			loading: false,
			type: null,
			message: null,
      app_file: [],
      app_name: "",
      app_description: "",
      main_component_name: "",
      app_file_location: ""
		};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
	}

  onDrop(acceptedFiles, rejectedFiles) {
    console.log("On dropped");
    var form_data = new FormData();
    form_data.append('view_component_file', acceptedFiles[0], acceptedFiles[0].name);
    $.ajax({
      url: configs.API_URL+"/nanoapps/upload",
      method: 'POST',
      cache: false,
      contentType: false,
      processData: false,
      data:form_data,
      success: function(data) {
        this.setState({ type: 'info', message: 'Successfully added the app' })
        console.log(data.file_path);
        this.setState({app_file_location: data.file_path})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({ type: 'danger', message: xhr.response.status});
      }.bind(this)
    });
  }

  onOpenClick() {
      this.dropzone.open();
  }

  handleChange(event) {
    var states = {}
    states[event.target.id] = event.target.value;
    this.setState(states);
  }

  handleSubmit(event) {
    var data = {
      app_file_location: this.state.app_file_location,
      app_name: this.state.app_name,
      app_description: this.state.app_description,
      main_component_name: this.state.main_component_name,
      thumbnail_location: '/images/default.jpg'
    }
    $.ajax({
      url: configs.API_URL+"/nanoapps/add_app_details",
      method: 'POST',
      cache: false,
      contentType: 'application/json',
      data: JSON.stringify({data}),
      success: function(data) {
        this.setState({ type: 'info', message: 'Successfully added the app' })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.setState({ type: 'danger', message: xhr.response.status});
      }.bind(this)
    });
		event.preventDefault();
  }

  render() {
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">
                {this.state.message}
             </div>;
    }
    var panel_class = "hide";
    if (this.state.app_file_location && this.state.app_file_location!=null) {
      var panel_class = "reveal";
    }

    return (
      <div className="App">
        <div className="App-header">
          nanoapps
        </div>
        <p className="App-intro">
          <Grid fluid>
            <Row>
              <Col xs={8} md={4} >
                <Panel bsStyle="info" header="Drag and drop the file">
                  <div className="split-box">
                      <Dropzone ref={(node) => { this.dropzone = node; }}  onDrop={this.onDrop}>
                        <p>(or) </p>
                          <button type="button" onClick={this.onOpenClick}>
                            Open file
                        </button>
                      </Dropzone>
                </div>
                </Panel>
              </Col>

              <Col xs={8} md={4} className="col-sm-offset-1 col-xs-8 col-md-6">
                <div className="overlay">
                </div>
                <Panel header="Fill in app details"  bsStyle="info">
                  <Form horizontal onSubmit={this.handleSubmit} className="split-box" className="app-details-form">
                    <FormGroup>
                      <label for="app_name" className="col-sm-2 control-label">Name</label>
                          <div className="col-sm-6 col-sm-offset-2 ">
                            <input type="text" className="form-control" id="app_name" placeholder="App name" onChange={this.handleChange} />
                          </div>
                    </FormGroup>

                    <FormGroup>
                      <label for="app_description" className="control-label col-sm-2">Description</label>
                          <div className="col-sm-6 col-sm-offset-2 ">
                            <textarea type="text" className="form-control" id="app_description" placeholder="App Description" onChange={this.handleChange} >
                            </textarea>
                          </div>
                    </FormGroup>

                    <FormGroup>
                      <label for="main_component_name" className="col-sm-2 control-label">Index component</label>
                          <div className="col-sm-6 col-sm-offset-2 ">
                            <input type="text" className="form-control" id="main_component_name" placeholder="Main component name" onChange={this.handleChange}  />
                          </div>
                    </FormGroup>

                    <FormGroup>
                        <label for="submit btn" className="col-sm-2  control-label"></label>
                          <div className="col-sm-6 col-sm-offset-2 ">
                            <Button className="btn btn-default btn-lg btn-block" type="submit">Publish</Button>
                          </div>
                    </FormGroup>

                  </Form>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </p>
      </div>
    );
  }
}

export default App;
