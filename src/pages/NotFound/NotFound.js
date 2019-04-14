import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

NotFound.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFound;
