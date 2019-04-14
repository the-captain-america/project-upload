import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class AppContainer extends Component {
  componentDidMount() {
    const { loggedIn, history } = this.props;
    if (loggedIn) {
      history.push('/form');
    } else {
      history.push('/login');
      console.log('props', this.props.loggedIn);
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.loggedIn,
});

const AppWithRouter = withRouter(connect(mapStateToProps,
  null)(AppContainer));

export default AppWithRouter;

