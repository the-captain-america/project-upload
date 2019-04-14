import React from 'react';
import { BrowserRouter as Router, Switch, Route, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  AppContainer,
  UploadContainer,
  FormContainer,
  WrapContainer,
  LoginContainer,
} from 'containers';
import { NotFound, About } from 'pages';
import store from './store';

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <WrapContainer>
        <Switch>
          <Route path="/" exact={true} component={AppContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/form" component={FormContainer} />
          <Route path="/upload" component={UploadContainer} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </WrapContainer>
    </Router>
  </Provider>
);

export default Root;
