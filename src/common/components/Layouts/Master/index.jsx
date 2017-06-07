import React from 'react';
import PropTypes from 'prop-types';

import './Master.css';

const Master = ({ children }) =>
  <div styleName="wrapper">
    <div styleName="content">
      <p styleName="title">Universal Redux</p>
      { children }
    </div>
  </div>;

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;
