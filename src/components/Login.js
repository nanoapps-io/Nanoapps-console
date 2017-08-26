import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input/Input';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import {withRouter} from 'react-router-dom'
import * as configs from "../config"
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      type: null,
      message: null,
      email: "",
      password: ""
    }
    this.handleSubmit = this
      .handleSubmit
      .bind(this)
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
      password: this.state.password
    }
    var self = this;
    axios.post(configs.API_URL + "/v1/developer/login", data)
    .then(function (response) {
      console.log(self.props)
      if (response['data'].status == "success") {
        self.props.userState.setUserDetails(response['data'])
        self
          .props
          .history
          .push('/')
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
              Login
            </Typography>
            <FormGroup row>
              <TextField
                label="Email"
                onChange={event => this.setState({email: event.target.value})}
                style={textField}/>
              <TextField
                label="Password"
                type="password"
                onChange={event => this.setState({password: event.target.value})}
                margin="normal"
                style={textField}/>
              <Button
                raised
                color="primary"
                type="submit"
                style={buttonStyle}
                onClick={this.handleSubmit}>
                Login
              </Button>
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Login)