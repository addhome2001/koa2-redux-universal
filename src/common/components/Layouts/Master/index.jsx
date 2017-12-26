import React from 'react';
import PropTypes from 'prop-types';

import './Master.css';

const Master = ({ children }) => (
  <div styleName="wrapper">
    <h2 styleName="title">Universal Redux</h2>
    <div styleName="content">
      { children }
    </div>
  </div>
);

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;
