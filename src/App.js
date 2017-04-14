import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dropzone from 'react-dropzone';
import { Form, FormGroup } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
		super(props);
		this.state = {
			loading: false,
			type: null,
			message: null,
      app_file: null,
      app_name: null,
      app_description: null,
      



		};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({app_file: acceptedFiles}, function(){
      console.log("state set");
    });
  }

  handleChange(event) {
    this.setState({
				event.target.id: event.target.value
			});
  }

  handleSubmit(event) {
    var data = {
      : this.state.compound_name,
      label: this.state.compound_label,
      default_min: this.state.default_min,
      default_max: this.state.default_max,
    }
    $.ajax({
			url: configs.API_URL+"//",
			method: 'POST',
			dataType: '',
			cache: false,
			data: data,
			success: function(data) {
				this.setState({ type: 'info', message: 'Saved' });

			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		event.preventDefault();

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          nanoapps
        </div>
        <p className="App-intro">
          <Grid fluid>
            <Row>
              <Col xs={4} md={3}>
                <Dropzone onDrop={this.onDrop}>
                  <div className="center-text">Drag and drop your react native app</div>
                </Dropzone>
              </Col>
              <Col xs={8} md={4} className="app-details-form">
                <Form horizontal onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <label for="app_name" className="col-sm-2">Name</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" id="app_name" placeholder="App name" />
                        </div>
                  </FormGroup>

                  <FormGroup>
                    <label for="app_description" className="control-label col-sm-2">Description</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="app_description" placeholder="App Description" />
                        </div>
                  </FormGroup>

                  <FormGroup>
                    <label for="main_component_name" className="col-sm-2">Main component name</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" id="main_component_name" placeholder="Main component name" />
                        </div>
                  </FormGroup>

                  <FormGroup>
                      <label for="main_component_name" className="col-sm-2"></label>
                        <div className="col-sm-6">
                          <input className="btn btn-default btn-lg btn-block" type="submit" value="Publish" />
                        </div>
                  </FormGroup>

                </Form>
              </Col>
            </Row>
          </Grid>
        </p>
      </div>
    );
  }
}

export default App;
