import Header from './Header'
import React, {Component} from 'react'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import {Switch, Route} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import DevTools from 'mobx-react-devtools'


export default class App extends Component {
  render() {
    var selfprops = this.props
    return <main>
      <div style={{
        flexGrow: 1
      }}>
        <Grid container spacing={24}>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => ( <Dashboard userState={this.props.userState}/> )}
              />
            <Route exact path="/login" render={(props) => ( <Login userState={this.props.userState}/> )} />
            <Route
              exact
              path='/register'
              render={(props) => ( <Register userState={this.props.userState}/> )} />
          </Switch>
        </Grid>
      </div>

    </main>

  }
}
