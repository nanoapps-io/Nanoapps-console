import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import UserState from './store.js'

const userState = new UserState();

window.userState = userState

ReactDOM.render(
    <BrowserRouter>
    <MuiThemeProvider>
        <App userState={userState}/>
    </MuiThemeProvider>
</BrowserRouter>, document.getElementById('root'));
