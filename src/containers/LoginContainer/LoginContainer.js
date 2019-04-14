import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { authActions } from 'actions';
import { connect } from 'react-redux';
import { Spinner } from 'components';

import TextField from 'material-ui/TextField';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      open: false,
      message: '',
    };
    this.onLogin = this.onLogin.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  onEmailBlur() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      this.setState({ email: '' });
      this.setState({
        open: true,
        message: 'Invalid Email! Please correct the email entered',
      });
    }
  }

  onLogin() {
    const { email, password } = this.state;
    if (!(this.state.email || this.state.password)) {
      this.setState({
        open: true,
        message: 'There was a problem logging in, please try again',
      });
    } else {
      this.props.history.push('/form');
      this.setState({ error: '' });
    }
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  renderLoader() {
    return this.props.loading ? <Spinner /> : null;
  }

  renderMessage() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message || this.props.error }
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    );
  }

  render() {
    return (
      <div className="login col-md-6">
        <ul className="input__list">
          <li>
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              onBlur={() => this.onEmailBlur()}
            />
          </li>
          <li>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </li>
          <li>
            <RaisedButton
              style={{ marginTop: '20px' }}
              label="Submit"
              primary={true}
              onClick={this.onLogin}
            />
          </li>
        </ul>
        {this.renderMessage()}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(authActions.loginUser(data)),
});

LoginContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

const LoginWithRouter = withRouter(connect(mapStateToProps,
  mapDispatchToProps)(LoginContainer));

export default LoginWithRouter;
