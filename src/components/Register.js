import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import * as configs from "../config"
import Router from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      type: null,
      message: null,
      email: "",
      password: "",
      name: "",
      phone: ""
    }
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone
    }
    var self = this;    
    axios.post(configs.API_URL + "/v1/developer/register", data)
    .then(function (response) {
      console.log(response['data']['status'])
      if (response['data'].status == "success") {
        self
          .props
          .history
          .push('/login');
        }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    var paper = {
      width: 300,
      padding: 50,
      margin: 10
    }
    var textField = {
      width: 300,
      marginTop: 10,
      marginBottom: 10
    }
    var buttonStyle = {
      width: 250,
      align: 'center',
      margin: 15
    }
    return (
      <Grid item xs={12}>
        <Grid container align='center' direction='row' justify='center'>
          <Paper style={paper}>
            <Typography type="title" gutterBottom>
              Register
            </Typography>
            <FormGroup row>
              <TextField
                style={textField}
                required
                value={this.state.name}
                label="Name"
                name="name"
                onChange={event => this.setState({name: event.target.value})}/>
              <TextField
                style={textField}
                type="phone"
                required
                value={this.state.phone}
                label="Phone"
                name="phone"
                onChange={event => this.setState({phone: event.target.value})}/>
              <TextField
                style={textField}
                type="email"
                required
                value={this.state.email}
                label="Email"
                name="email"
                onChange={event => this.setState({email: event.target.value})}/>
              <TextField
                style={textField}
                type="password"
                required
                value={this.state.password}
                label="Password"
                name="password"
                onChange={event => this.setState({password: event.target.value})}/>
              <TextField
                style={textField}
                type="password"
                required
                value={this.state.confirm_password}
                label="Confirm password"
                name="confirm password"
                onChange={event => this.setState({confirm_password: event.target.value})}/>
              <Button
                raised
                color="primary"
                type="submit"
                style={buttonStyle}
                onClick={this.handleSubmit}>
                Register
              </Button>
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>

    );
  }
}

export default withRouter(Register)