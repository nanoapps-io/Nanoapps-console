import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import './index.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <App /></ThemeProvider>,
  document.getElementById('root')
);
