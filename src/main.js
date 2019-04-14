import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { amber500, orange500, fullBlack, grey400, grey100, grey300, white, grey500, darkBlack } from 'material-ui/styles/colors';
import Root from './routes';

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
  },
  palette: {
    primary1Color: amber500,
    primary2Color: orange500,
    primary3Color: grey400,
    accent1Color: amber500,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: amber500,
    shadowColor: fullBlack,
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Root />
  </MuiThemeProvider>,
  document.getElementById('app'),
);
