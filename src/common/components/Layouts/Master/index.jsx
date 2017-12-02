import React from 'react';
import PropTypes from 'prop-types';

import './Master.css';

const Master = ({ children }) => (
  <div styleName="wrapper">
    <p styleName="title">Universal Redux</p>
    <div styleName="content">
      { children }
    </div>
  </div>
);

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;
