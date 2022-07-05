
import React from "react";
import  { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// core components

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { Provider } from 'react-redux';

import { Store } from './redux/store/index';

import Auth from './auth/index';
import App from './container/App';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  typography:{
    fontFamily:'BYekan',
  },
  direction: 'rtl',
});
Auth()
render(
    <Provider store={Store}>
  <BrowserRouter>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider>
      </StylesProvider>
  </BrowserRouter>
    </Provider>
  ,
  document.getElementById("root")
);
