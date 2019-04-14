import React from 'react';
import PropTypes from 'prop-types';

const ContentContainer = ({ children }) => (
  <div>
    {children}
  </div>
);

ContentContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContentContainer;
